'use client';

import { useAtom } from 'jotai';
import TodoItem from './todo-item';
import { Todo } from '@/lib/types';
import { todoAtom } from '@/lib/atom';
import Message from '../shared/message';

type TodoStatus = 'onGoing' | 'completed' | 'trash';

const GetTodos = ({ todoStatus }: { todoStatus: TodoStatus }) => {
  const [todos] = useAtom(todoAtom);

  const filteredTodos = todos?.filter(
    (todo: Todo) => todo.status === todoStatus
  );

  console.log(filteredTodos);

  return filteredTodos?.length !== 0 ? (
    filteredTodos?.map((todo: Todo) => {
      return <TodoItem key={todo.id} id={todo.id} />;
    })
  ) : (
    <Message message='No todos found.' className='h-[calc(100vh-16rem)]' />
  );
};

export default GetTodos;
