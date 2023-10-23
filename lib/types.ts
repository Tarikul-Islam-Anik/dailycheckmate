import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.string().nullable(),
  image: z.string().optional(),
  accounts: z.array(z.string()).optional(),
});

const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional(),
  access_token: z.string().optional(),
  expires_at: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  session_state: z.string().optional(),
  oauth_token_secret: z.string().optional(),
  oauth_token: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["todo", "completed", "trash"]).default("todo"),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

const reminderSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(z.string()).optional(),
  schedule: z.string(),
  status: z.enum(["reminder", "completed", "trash"]).default("reminder"),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

const habitsSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().optional(),
  days: z.array(z.date()),
  createdAt: z.string(),
  userId: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type Account = z.infer<typeof accountSchema>;
export type Todo = z.infer<typeof todoSchema>;
export type Reminder = z.infer<typeof reminderSchema>;
export type Habits = z.infer<typeof habitsSchema>;
