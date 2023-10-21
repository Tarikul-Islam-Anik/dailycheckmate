import { atom } from "jotai";
import { Todo, Reminder, Habits } from "./lib/types";

const todoAtom = atom<Todo[]>([]);
const reminderAtom = atom<Reminder[]>([]);
const habitAtom = atom<Habits[]>([]);

export { todoAtom, reminderAtom, habitAtom };
