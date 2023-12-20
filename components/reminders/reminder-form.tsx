import * as z from 'zod';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Create } from '@/lib/actions';
import { reminderAtom } from '@/lib/atom';
import { Reminder } from '@/lib/types';
import TitleAndDescription from '../shared/title-and-description';
import { Icons } from '../shared/icons';
import DatePicker from '../shared/date-picker';
import UrlFields from './url-fields';
import { sortByNewest } from '@/lib/utils';

const ReminderformSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  links: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
  schedule: z.date(),
});

function setData(
  setReminders: (arg0: (prev: Reminder[]) => Reminder[]) => void,
  data: Reminder
) {
  setReminders((prev: Reminder[]) =>
    [data, ...prev].sort((a: Reminder, b: Reminder) => {
      return sortByNewest(a.schedule, b.schedule);
    })
  );
}

type ReminderformValues = z.infer<typeof ReminderformSchema>;

const ReminderForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const { data: session } = useSession();
  const form = useForm<ReminderformValues>({
    resolver: zodResolver(ReminderformSchema),
    defaultValues: {
      title: '',
      description: '',
      links: [{ value: 'https://example.com/' }],
    },
  });

  const [, setReminders] = useAtom(reminderAtom);

  async function onSubmit(data: ReminderformValues) {
    const links =
      data?.links
        ?.filter((link) => link.value !== 'https://example.com/')
        .map((link) => link.value) || [];

    const reminderData = { ...data, links };

    setOpen(false);
    if (session) {
      toast.promise(
        Create('reminder', reminderData).then((res) => {
          setData(setReminders, res.data);
        }),
        {
          loading: `Creating Reminder "${data.title}"...`,
          success: `Reminder "${data.title}" is created!`,
          error: `Failed to create Reminder "${data.title}". Please try again later.`,
        }
      );
    } else {
      const reminder: Reminder = {
        id: uuidv4(),
        status: 'onGoing',
        title: data.title,
        description: data.description,
        schedule: data.schedule.toISOString(),
        links,
        createdAt: new Date().toISOString(),
        userId: '',
      };
      setData(setReminders, reminder);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <TitleAndDescription form={form} />
        <DatePicker form={form} label='Schedule' name='schedule' />
        <UrlFields form={form} />
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

export default ReminderForm;
