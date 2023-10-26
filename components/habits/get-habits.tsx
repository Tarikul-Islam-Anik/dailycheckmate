'use client';

import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { stagger, useAnimate } from 'framer-motion';
import { toast } from 'sonner';
import { Flex } from '@radix-ui/themes';
import { Habits } from '@/lib/types';
import { habitAtom } from '@/lib/atom';
import HabitItem from './habit-item';
import Message from '../shared/message';

function isChecked(id: string, habits: Habits[]) {
  const lastTimeChecked =
    habits.find((habit) => habit.id === id)?.days?.slice(-1)[0] ?? '';
  const today = new Date().toISOString().split('T')[0];
  if (lastTimeChecked === '') return false;
  return new Date(lastTimeChecked).toISOString().split('T')[0] === today;
}

const GetHabits = () => {
  const [habits, setHabits] = useAtom(habitAtom);
  const [items, setItems] = useState<
    { id: string; text: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    setItems(
      habits.map((habit) => ({
        id: habit.id,
        text: habit.title,
        checked: isChecked(habit.id, habits),
      }))
    );
  }, [habits]);

  let [ref, animate] = useAnimate();

  function handleChange(id: string) {
    let newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);

    if (newItems.every((item) => item.checked)) {
      let lastCompletedItem = items.findIndex((item) => !item.checked);
      let random = Math.random();

      if (random < 1 / 3) {
        animate(
          'button',
          { scale: [1, 1.25, 1] },
          {
            duration: 0.35,
            delay: stagger(0.075, { from: lastCompletedItem }),
          }
        );
      } else if (random < 2 / 3) {
        animate(
          'button',
          { x: [0, 2, -2, 0] },
          {
            duration: 0.4,
            delay: stagger(0.1, { from: lastCompletedItem }),
          }
        );
      } else {
        animate(
          'button',
          { rotate: [0, 10, -10, 0] },
          {
            duration: 0.5,
            delay: stagger(0.1, { from: lastCompletedItem }),
          }
        );
      }
    }
    toast.promise(axios.put('/api/habits/' + id), {
      loading: 'Marking as completed...',
      success: () => {
        setHabits((habits) =>
          habits.map((habit) =>
            habit.id === id
              ? {
                  ...habit,
                  days: [...(habit.days ?? []), new Date()],
                }
              : habit
          )
        );
        return 'Marked as completed! Keep it up!';
      },
      error: 'Error marking as completed',
    });
  }

  return items.length !== 0 ? (
    <Flex ref={ref} direction='column' gap='4' ml='1' mt='1'>
      {items.map((item) => (
        <HabitItem
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          handleChange={handleChange}
        />
      ))}
    </Flex>
  ) : (
    <Message
      message="No habits yet. /newline/ Add one to get started! /newline/ Let's build some good habits!"
      className='h-[300px] text-sm'
    />
  );
};

export default GetHabits;
