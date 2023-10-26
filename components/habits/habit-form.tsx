import * as z from 'zod';
import { useAtom } from 'jotai';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { habitAtom } from '@/lib/atom';
import { Habit } from '@/lib/types';
import { Create } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Icons } from '../shared/icons';
import { Input } from '../ui/input';

const HabitSchema = z.object({
  title: z.string().min(1).max(50),
});

type HabitFormValues = z.infer<typeof HabitSchema>;

const HabitForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { data: session } = useSession();
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(HabitSchema),
    defaultValues: {
      title: '',
    },
  });

  const [, setHabits] = useAtom(habitAtom);

  async function onSubmit(data: HabitFormValues) {
    setOpen(false);
    if (session) {
      toast.promise(
        Create('habit', data).then((res) => {
          if (res.status === 200)
            setHabits((prev: Habit[]) => [res.data, ...prev]);
        }),
        {
          loading: `Creating habit "${data.title}"...`,
          success: `Habit "${data.title}" is created!`,
          error: `Failed to create habit "${data.title}". Please try again later.`,
        }
      );
    } else {
      const habit: Habit = {
        id: uuidv4(),
        ...data,
        days: [],
        createdAt: new Date().toISOString(),
        userId: '',
      };
      setHabits((prev: Habit[]) => [habit, ...prev]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='Write which habit you want to build'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type='submit'
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Icons.spinner /> : 'Create'}
          </Button>
          <Button variant='secondary' onClick={() => form.reset()}>
            Clear
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default HabitForm;
