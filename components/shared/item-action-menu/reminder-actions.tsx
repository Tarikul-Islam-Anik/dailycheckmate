import { Text } from '@radix-ui/themes';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { BellIcon } from '@heroicons/react/24/outline';
import { Reminder } from '@/lib/types';

const notifyIn = [
  'In 5 minutes',
  'In 10 minutes',
  'In 15 minutes',
  'In 30 minutes',
  'In 1 hour',
  'Before a day',
];

const ReminderActionMenu = ({ id }: { id: Reminder['id'] }) => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <BellIcon className='mr-2 h-5 w-5' />
        <Text as='span'>Notify</Text>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>Feature unavailable</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifyIn.map((item, index) => (
            <DropdownMenuItem key={index} disabled>
              <Text as='span'>{item}</Text>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default ReminderActionMenu;
