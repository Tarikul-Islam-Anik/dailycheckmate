import axios from 'axios';
import React from 'react';
import { toast } from 'sonner';
import { useAtom } from 'jotai/react';
import { todoAtom } from '@/lib/atom';
import { Todo } from '@/lib/types';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import AlertDialogParent from './alert-dialog-parent';

function changeStatus(
  status: string,
  setTodo: (arg0: (prev: Todo[]) => Todo[]) => void
) {
  if (status === 'completed') {
    setTodo((prev) =>
      prev.map((todo) => {
        if (todo.status === 'completed') {
          return { ...todo, status: 'trash' };
        }
        return todo;
      })
    );
  } else {
    setTodo((prev) => prev.filter((todo) => todo.status !== 'trash'));
  }
}

const ChangeBulkStatus = ({
  type,
  status,
}: {
  type: 'reminder' | 'todo' | 'habit';
  status: 'completed' | 'trash';
}) => {
  const { data: session } = useSession();
  const [, setTodo] = useAtom(todoAtom);

  function handleClick() {
    if (session) {
      toast.promise(
        status === 'completed'
          ? axios.put('/api/' + type)
          : axios.delete('/api/' + type),
        {
          loading:
            status === 'completed' ? 'Moving to trash' : 'Clearing trash',
          success: () => {
            changeStatus(status, setTodo);
            return status === 'completed' ? 'Moved to trash' : 'Cleared trash';
          },
          error: status === 'completed' ? 'Failed to move to trash' : 'Failed',
        }
      );
    } else {
      changeStatus(status, setTodo);
    }
  }

  return status === 'completed' ? (
    <Button variant='secondary' onClick={handleClick}>
      Move to trash
    </Button>
  ) : (
    <AlertDialogParent
      title='Are you sure?'
      description='This action is irreversible. All the items in the trash will be deleted permanently.'
      action={handleClick}
    >
      <Button variant='secondary'>
        Clear trash
      </Button>
    </AlertDialogParent>
  );
};

export default ChangeBulkStatus;
