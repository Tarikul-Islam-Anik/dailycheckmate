import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo, Idea, Reminder, Habit } from './types';

const todoAtom = atomWithStorage<Todo[]>('todo', []);
const reminderAtom = atomWithStorage<Reminder[]>('reminder', []);
const ideaAtom = atomWithStorage<Idea[]>('ideaAtom', []);
const habitAtom = atomWithStorage<Habit[]>('habit', []);
const showHabitProgressAtom = atom<Habit | {}>({});

export { todoAtom, ideaAtom, reminderAtom, habitAtom, showHabitProgressAtom };
