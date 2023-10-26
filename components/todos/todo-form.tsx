import * as z from 'zod';
import { useAtom } from 'jotai';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { todoAtom } from '@/lib/atom';
import { Todo } from '@/lib/types';
import { Create } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Icons } from '@/components/shared/icons';
import TitleAndDescription from '@/components/shared/title-and-description';

const TodoformSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
});

type TodoformValues = z.infer<typeof TodoformSchema>;

const TodoForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { data: session } = useSession();
  const form = useForm<TodoformValues>({
    resolver: zodResolver(TodoformSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [, setTodos] = useAtom(todoAtom);

  async function onSubmit(data: TodoformValues) {
    setOpen(false);
    if (session) {
      toast.promise(
        Create('todo', data).then((res) => {
          setTodos((prev: Todo[]) => [res.data, ...prev]);
        }),
        {
          loading: `Creating task "${data.title}"...`,
          success: `Task "${data.title}" is created!`,
          error: `Failed to create task "${data.title}". Please try again later.`,
        }
      );
    } else {
      const todo: Todo = {
        id: uuidv4(),
        status: 'todo',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: '',
        userId: '',
      };
      setTodos((prev: Todo[]) => [todo, ...prev]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <TitleAndDescription form={form} />
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

export default TodoForm;
