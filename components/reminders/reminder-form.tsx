import * as z from "zod";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Create } from "@/lib/actions";
import { reminderAtom } from "@/atom";
import { Reminder } from "@/lib/types";
import TitleAndDescription from "../shared/title-and-description";
import { Icons } from "../shared/icons";
import DatePicker from "../shared/date-picker";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const ReminderformSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  links: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  deadline: z.date(),
  reminderTime: z.date(),
});

type ReminderformValues = z.infer<typeof ReminderformSchema>;

const ReminderForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const form = useForm<ReminderformValues>({
    resolver: zodResolver(ReminderformSchema),
    defaultValues: {
      title: "",
      description: "",
      links: [{ value: "https://example.com/" }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const [reminders, setReminders] = useAtom(reminderAtom);

  async function onSubmit(data: ReminderformValues) {
    const links = data?.links
      ?.map((link) => link.value !== "https://example.com/" && link.value)
      .join("\n");
    delete data.links;
    const reminderData = { ...data, links };
    toast.message(JSON.stringify(reminderData, null, 2));
    setOpen(false);
    toast.promise(
      Create("reminders", reminderData).then((res) => {
        setReminders((prev: Reminder[]) => [res.data, ...prev]);
      }),
      {
        loading: `Creating Reminder "${data.title}"...`,
        success: `Reminder "${data.title}" is created!`,
        error: `Failed to create Reminder "${data.title}". Please try again later.`,
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleAndDescription form={form} />
        <div className="flex space-x-4">
          <DatePicker form={form} label="Deadline" name="deadline" />
          <DatePicker form={form} label="Reminder Time" name="reminderTime" />
        </div>
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`links.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add relevant URLs for this reminder.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
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

export default ReminderForm;
