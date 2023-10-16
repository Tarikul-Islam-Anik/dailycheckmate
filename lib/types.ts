import * as z from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["todo", "completed", "trash"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReminderSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  links: z.string().optional(),
  deadline: z.string(),
  reminderTime: z.string(),
  status: z.enum(["reminder", "completed", "trash"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;

export type Reminder = z.infer<typeof ReminderSchema>;
