'use client';

import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { Todo } from '@/lib/types';
import GetTodos from './get-todos';
import { ScrollArea } from '../ui/scroll-area';
import FilterOptions from '../shared/filter-options';

const TodoList = () => {
  const [todoStatus, setTodoStatus] = useState<Todo['status']>('todo');

  return (
    <>
      <Flex justify='end' align='center'>
        <FilterOptions
          type='todo'
          className='text-slate-500'
          filter={todoStatus}
          setFilter={setTodoStatus as any}
        />
      </Flex>
      <ScrollArea
        className='h-[calc(100vh-14rem)] rounded-xl rounded-br-none rounded-tr-none pr-4'
        scrollHideDelay={0}
      >
        <GetTodos todoStatus={todoStatus} />
      </ScrollArea>
    </>
  );
};

export default TodoList;
