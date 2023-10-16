import * as z from "zod";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Create } from "@/lib/actions";
import { todoAtom } from "@/atom";
import { Todo } from "@/lib/types";
import TitleAndDescription from "../shared/title-and-description";
import { Icons } from "../shared/icons";

const TodoformSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
});

type TodoformValues = z.infer<typeof TodoformSchema>;

const TodoForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const form = useForm<TodoformValues>({
    resolver: zodResolver(TodoformSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [todos, setTodos] = useAtom(todoAtom);

  async function onSubmit(data: TodoformValues) {
    setOpen(false);
    toast.promise(
      Create("todos", data).then((res) => {
        setTodos((prev: Todo[]) => [res.data, ...prev]);
      }),
      {
        loading: `Creating task "${data.title}"...`,
        success: `Task "${data.title}" is created!`,
        error: `Failed to create task "${data.title}". Please try again later.`,
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleAndDescription form={form} />
        <DialogFooter>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Icons.spinner /> : "Create"}
          </Button>
          <Button variant="secondary" onClick={() => form.reset()}>
            Clear
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TodoForm;
