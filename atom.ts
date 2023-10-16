import { atom } from "jotai";
import { Todo, Reminder } from "./lib/types";

const todoAtom = atom<Todo[]>([]);
const reminderAtom = atom<Reminder[]>([]);

export { todoAtom, reminderAtom };
