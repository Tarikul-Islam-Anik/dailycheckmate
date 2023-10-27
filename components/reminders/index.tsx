'use client';

import { useState } from 'react';
import { Flex, Heading, Box } from '@radix-ui/themes';
import { Reminder } from '@/lib/types';
import FilterOptions from '../shared/filter-options';
import { ScrollArea } from '../ui/scroll-area';
import GetReminders from './get-reminders';

const ReminderList = () => {
  const [reminderStatus, setReminderStatus] =
    useState<Reminder['status']>('reminder');
  return (
    <Box>
      <Flex justify='between' align='center'>
        <Heading as='h3' size='5'>
          Reminders
        </Heading>
        <FilterOptions
          type='reminder'
          filter={reminderStatus}
          setFilter={setReminderStatus as any}
        />
      </Flex>
      <ScrollArea
        className='flex h-[370px] flex-col overflow-y-scroll rounded-xl'
        scrollHideDelay={0}
      >
        <GetReminders reminderStatus={reminderStatus} />
      </ScrollArea>
    </Box>
  );
};

export default ReminderList;
