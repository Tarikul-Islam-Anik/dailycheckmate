import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo, Reminder, Habits } from './types';

const todoAtom = atomWithStorage<Todo[]>('todo', []);
const reminderAtom = atomWithStorage<Reminder[]>('reminder', []);
const habitAtom = atomWithStorage<Habits[]>('habit', []);
const showHabitProgressAtom = atom<Habits | {}>({});

export { todoAtom, reminderAtom, habitAtom, showHabitProgressAtom };
