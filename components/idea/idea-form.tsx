import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { ideaAtom } from '@/lib/atom';
import { Create } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Idea, ideaSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { DialogFooter } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import TitleAndDescription from '@/components/shared/title-and-description';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const IdeaForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { data: session } = useSession();
  const form = useForm<Idea>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  });

  const [, setIdeas] = useAtom(ideaAtom);

  async function onSubmit(data: Idea) {
    setOpen(false);
    if (session) {
      toast.promise(
        Create('idea', data).then((res) => {
          setIdeas((prev: Idea[]) => [res.data, ...prev]);
        }),
        {
          loading: `Creating task "${data.title}"...`,
          success: `Task "${data.title}" is created!`,
          error: `Failed to create task "${data.title}". Please try again later.`,
        }
      );
    } else {
      const idea: Idea = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        tags: data.tags,
        createdAt: new Date().toISOString(),
        updatedAt: '',
        userId: '',
      };
      setIdeas((prev: Idea[]) => [idea, ...prev]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <TitleAndDescription form={form} />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder='Set multiple tags separated by commas'
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

export default IdeaForm;
