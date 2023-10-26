import { useAtom } from 'jotai';
import { reminderAtom } from '@/lib/atom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Text } from '@radix-ui/themes';
import { Reminder } from '@/lib/types';
import { format } from 'date-fns';
import ReminderActionMenu from './reminder-action-menu';

const RerminderItem = ({ id }: { id: Reminder['id'] }) => {
  const [reminders] = useAtom(reminderAtom);
  const { title, description, schedule } = reminders.find(
    (reminder) => reminder.id === id
  )!;

  return (
    <Card className='my-3 border-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='line-clamp-1'>{title}</CardTitle>
        <CardDescription>
          <ReminderActionMenu id={id} />
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col space-y-4'>
        <Text size='2' as='p' className='line-clamp-3'>
          {description?.length !== 0 ? (
            description
          ) : (
            <Text as='span' className='text-muted-foreground'>
              No description provided.
            </Text>
          )}
        </Text>
        <Text size='2' as='p' className='line-clamp-3'>
          <Text as='span' className='font-bold text-muted-foreground'>
            Schedule:{' '}
          </Text>
          {format(new Date(schedule), 'eeee dd, LLL yyyy')}
        </Text>
      </CardContent>
    </Card>
  );
};

export default RerminderItem;
