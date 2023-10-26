'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { buttonVariants } from '@/components/ui/button';
import {
  PlusIcon,
  CalendarIcon,
  CheckCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TooltipParent from './tooltip-parent';
import TodoForm from '../todos/todo-form';
import ReminderForm from '../reminders/reminder-form';
import { Button } from '@/components/ui/button';
import HabitForm from '../habits/habit-form';

const itemInfo = [
  {
    type: 'todos',
    title: '✏ Create a new task',
    description: 'You can edit and view your tasks later.',
  },
  {
    type: 'reminders',
    title: '📅 Add a reminder',
    description: 'You can edit and view your reminders later.',
  },
  {
    type: 'habits',
    title: '💖 Practice a habit',
    description: 'You can not edit it later.',
  },
];

const CreateNew = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon'>
            <PlusIcon className='h-6 w-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Add a new</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setFormType('todos')}>
              <CheckCircleIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Task</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setFormType('reminders')}>
              <CalendarIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Reminder</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setFormType('habits')}>
              <HeartIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Habit</Text>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text as='span'>
              {itemInfo.find((item) => item.type === formType)?.title}
            </Text>
          </DialogTitle>
          <DialogDescription>
            <Text as='span'>
              {itemInfo.find((item) => item.type === formType)?.description}
            </Text>
          </DialogDescription>
        </DialogHeader>
        {formType === 'todos' ? (
          <TodoForm setOpen={setOpen} />
        ) : formType === 'reminders' ? (
          <ReminderForm setOpen={setOpen} />
        ) : (
          <HabitForm setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;

{
  /* <TooltipParent content="Create new">
      
      </TooltipParent>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text as="span">{title}</Text>
          </DialogTitle>
          <DialogDescription>
            <Text as="span">{description}</Text>
          </DialogDescription>
        </DialogHeader>
        {type === "todos" ? (
          <TodoForm setOpen={setOpen} />
        ) : (
          <ReminderForm setOpen={setOpen} />
        )}
      </DialogContent> */
}
