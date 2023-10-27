// @ts-nocheck
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { todoAtom, reminderAtom } from '@/lib/atom';
import { Todo, Reminder } from '@/lib/types';
import { ToggleStatus } from '@/lib/actions';
import { Text } from '@radix-ui/themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  EyeIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import ItemInfo from '../../shared/items-info';
import ReminderActionMenu from './reminder-actions';

interface ItemActionMenuProps {
  type: 'todo' | 'reminder';
  id: Todo['id'] | Reminder['id'];
}

const ItemActionMenu = ({ type, id }: ItemActionMenuProps) => {
  const { data: session } = useSession();
  const [items, setItems] = useAtom(type === 'todo' ? todoAtom : reminderAtom);
  const { title, status } = items.find(
    (item: Todo | Reminder) => item.id === id
  )!;

  function handleStatusChange(status: Todo['status'] | Reminder['status']) {
    session && ToggleStatus(type, id, title, status);

    setItems((prev: (typeof items)[]) =>
      prev.map((item: Todo | Reminder) =>
        item.id === id
          ? {
              ...item,
              status: status,
            }
          : item
      )
    );
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <EllipsisHorizontalIcon className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <EyeIcon className='mr-2 h-5 w-5' />
              <Text as='span'>View</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          {type === 'reminder' && <ReminderActionMenu id={id} />}
          {status !== 'todo' && status !== 'reminder' && (
            <DropdownMenuItem onClick={() => handleStatusChange(type)}>
              <ArrowUturnLeftIcon className='mr-2 h-5 w-5' />
              <Text as='span'>{status === 'trash' ? 'Restore' : 'Undo'}</Text>
            </DropdownMenuItem>
          )}
          {status !== 'trash' && (
            <DropdownMenuItem onClick={() => handleStatusChange('trash')}>
              <TrashIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Move to Trash</Text>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ItemInfo id={id} type={type} />
    </Dialog>
  );
};

export default ItemActionMenu;
