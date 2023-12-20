'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import {
  PlusIcon,
  CalendarIcon,
  CheckCircleIcon,
  HeartIcon,
  LightBulbIcon,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import IdeaForm from '../idea/idea-form';
import TodoForm from '../todos/todo-form';
import TooltipParent from './tooltip-parent';
import HabitForm from '../habits/habit-form';
import { Button } from '@/components/ui/button';
import ReminderForm from '../reminders/reminder-form';

const itemInfo = [
  {
    type: 'todos',
    title: '✏ Create a new task',
    description: 'You can edit and view your tasks later.',
    icon: CheckCircleIcon,
  },
  {
    type: 'ideas',
    title: '💡 Write down an idea',
    description: 'You can edit and view your ideas later.',
    icon: LightBulbIcon,
  },
  {
    type: 'reminders',
    title: '📅 Add a reminder',
    description: 'You can edit and view your reminders later.',
    icon: CalendarIcon,
  },
  {
    type: 'habits',
    title: '💖 Practice a habit',
    description: 'You can not edit it later.',
    icon: HeartIcon,
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
        <DropdownMenuContent className='mt-2'>
          <DropdownMenuLabel>Add a new</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {itemInfo.map((item) => (
            <DialogTrigger asChild key={item.type}>
              <DropdownMenuItem onSelect={() => setFormType(item.type)}>
                <TooltipParent content={item.description}>
                  <item.icon className='mr-2 h-5 w-5' />
                </TooltipParent>
                <Text as='span' className='capitalize'>
                  {item.type.split('s')[0]}
                </Text>
              </DropdownMenuItem>
            </DialogTrigger>
          ))}
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
        ) : formType === 'ideas' ? (
          <IdeaForm setOpen={setOpen} />
        ) : formType === 'habits' ? (
          <HabitForm setOpen={setOpen} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
