import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo, Reminder, Habit } from './types';

const todoAtom = atomWithStorage<Todo[]>('todo', []);
const reminderAtom = atomWithStorage<Reminder[]>('reminder', []);
const habitAtom = atomWithStorage<Habit[]>('habit', []);
const showHabitProgressAtom = atom<Habit | {}>({});

export { todoAtom, reminderAtom, habitAtom, showHabitProgressAtom };
