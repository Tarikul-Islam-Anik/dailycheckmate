'use client';

import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { Box, Flex } from '@radix-ui/themes';
import { todoAtom } from '@/lib/atom';
import { Todo } from '@/lib/types';
import { ToggleStatus } from '@/lib/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ItemActionMenu from '@/components/shared/item-action-menu';

const TodoItem = ({ id }: { id: Todo['id'] }) => {
  const { data: session } = useSession();
  const [todos, setTodos] = useAtom(todoAtom);
  const { title, status } = todos.find((todo: Todo) => todo.id === id)!;

  function handleComplete() {
    session && ToggleStatus('todo', id, title, 'completed');
    setTodos((prev) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, status: 'completed' } : todo
      )
    );
  }

  return (
    <Box className='h-[70px] rounded-xl border hover:border-primary transition' p='4' my='3'>
      <Flex justify='between' align='center'>
        <Flex gap='3' align='center' className='w-[90%]'>
          {status === 'onGoing' && (
            <Checkbox id={id} onCheckedChange={handleComplete} />
          )}
          <Label htmlFor={id} className='truncate'>
            {title}
          </Label>
        </Flex>
        <ItemActionMenu type='todo' id={id} />
      </Flex>
    </Box>
  );
};

export default TodoItem;
