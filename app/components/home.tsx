'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Grid, Box } from '@radix-ui/themes';
import { todoAtom, reminderAtom, habitAtom } from '@/lib/atom';
import { sortByNewest } from '@/lib/utils';
import { Todo, Reminder } from '@/lib/types';
import useMediaQuery from '@/lib/hooks/use-media-query';
import Message from '@/components/shared/message';
import LeftColumn from './left-column';
import RightColumn from './right-column';
import MiddleColumn from './middle-column';
import { toast } from 'sonner';

export default function HomePage() {
  const [offlineTodos, setTodos] = useAtom(todoAtom);
  const [offlineReminders, setReminders] = useAtom(reminderAtom);
  const [offlineHabits, setHabits] = useAtom(habitAtom);
  const { isDesktop, width } = useMediaQuery();

  useEffect(() => {
    try {
      axios
        .get('/api/get-data')
        .then((res) => {
          if (res.status !== 401) {
            const { todos, reminders, habits } = res.data;
            setTodos(
              [...offlineTodos, ...todos].sort((a: Todo, b: Todo) =>
                sortByNewest(a.createdAt, b.createdAt)
              )
            );
            setReminders(
              [...offlineReminders, ...reminders].sort(
                (a: Reminder, b: Reminder) =>
                  sortByNewest(b.schedule, a.schedule)
              )
            );
            setHabits([...offlineHabits, ...habits]);
          }
        })
        .catch((err) => {});
    } catch (err) {
      toast.error('Something went wrong.');
    }
  }, []);

  return isDesktop && width! > 1280 ? (
    <Grid columns='4' height='100%'>
      <LeftColumn />
      <Box className='col-span-2'>
        <MiddleColumn />
      </Box>
      <RightColumn />
    </Grid>
  ) : (
    <Message
      message='Hey 👋 there! DailyCheckmate is only optimized for desktop. Support for mobile is coming soon!'
      className='h-screen'
    />
  );
}
