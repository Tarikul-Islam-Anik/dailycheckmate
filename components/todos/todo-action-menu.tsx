import { useAtom } from 'jotai';
import { todoAtom } from '@/lib/atom';
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
import { buttonVariants } from '@/components/ui/button';
import { Text } from '@radix-ui/themes';
import { ToggleStatus } from '@/lib/actions';
import ItemInfo from '../shared/items-info';
import { Todo } from '@/lib/types';

const actions = [
  {
    label: 'Undo',
    value: 'todo',
    icon: ArrowUturnLeftIcon,
  },
  {
    label: 'Move to trash',
    value: 'trash',
    icon: TrashIcon,
  },
];

const TodoActionMenu = ({ id }: { id: Todo['id'] }) => {
  const [todos, setTodos] = useAtom(todoAtom);
  const { title, status } = todos.find((todo: Todo) => todo.id === id)!;

  function handleDelete(action: (typeof actions)[number]) {
    ToggleStatus('todos', id, title, action.value as 'trash' | 'todo');
    setTodos((prev) =>
      prev.map((todo: Todo) =>
        todo.id === id
          ? {
              ...todo,
              status: action.value as 'trash' | 'todo',
            }
          : todo
      )
    );
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })}
        >
          <EllipsisHorizontalIcon className='h-5 w-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <EyeIcon className='mr-2 h-5 w-5' />
              <Text as='span'>View</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          {actions.map((action) => {
            return (
              action.value !== status && (
                <DropdownMenuItem
                  key={action.value}
                  className='flex items-center'
                  onClick={() => handleDelete(action)}
                >
                  <action.icon className='mr-2 h-5 w-5' />
                  <Text as='span'>{action.label}</Text>
                </DropdownMenuItem>
              )
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <ItemInfo id={id} type='todos' />
    </Dialog>
  );
};

export default TodoActionMenu;
