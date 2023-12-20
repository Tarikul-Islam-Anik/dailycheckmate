import { z } from 'zod';

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
  updatedAt: z.string().optional(),
});

const status = z.enum(['onGoing', 'completed', 'trash']);

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: status.default('onGoing'),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  userId: z.string(),
});
export const ideaSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  tags: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
});

export const reminderSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(z.string()).optional(),
  schedule: z.string(),
  status: status.default('onGoing'),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  userId: z.string(),
});

export const habitSchema = z.object({
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
export type Idea = z.infer<typeof ideaSchema>;
export type Reminder = z.infer<typeof reminderSchema>;
export type Habit = z.infer<typeof habitSchema>;
