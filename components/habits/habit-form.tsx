import * as z from 'zod';
import { Flex } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Create } from '@/lib/actions';
import { habitAtom } from '@/lib/atom';
import { Habits } from '@/lib/types';
import { Icons } from '../shared/icons';
import { Input } from '../ui/input';

const HabitSchema = z.object({
  title: z.string().min(1).max(50),
});

type HabitFormValues = z.infer<typeof HabitSchema>;

const HabitForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(HabitSchema),
    defaultValues: {
      title: '',
    },
  });

  const [, setHabits] = useAtom(habitAtom);

  async function onSubmit(data: HabitFormValues) {
    setOpen(false);
    toast.promise(
      Create('habits', data).then((res) => {
        setHabits((prev: Habits[]) => [res.data, ...prev]);
      }),
      {
        loading: `Creating habit "${data.title}"...`,
        success: `Habit "${data.title}" is created!`,
        error: `Failed to create habit "${data.title}". Please try again later.`,
      }
    );
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
