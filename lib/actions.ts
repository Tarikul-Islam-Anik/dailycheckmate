import axios from 'axios';
import { toast } from 'sonner';

export async function Edit(
  type: 'todos' | 'reminders' | 'habits',
  id: string,
  status: string,
  title: string,
  description: string
) {
  return await axios.put(`/api/${type}/${id}`, { status, title, description });
}

export async function Delete(
  type: 'todos' | 'reminders' | 'habits',
  id: string
) {
  return await axios.delete(`/api/${type}/${id}`);
}

export async function Create(
  type: 'todos' | 'reminders' | 'habits',
  data: {
    title: string;
    color?: string;
    description?: string;
    links?: string[];
    deadline?: Date;
    reminderTime?: Date;
  }
) {
  return await axios.post(`/api/${type}/new`, data);
}

export async function ToggleStatus(
  type: 'todos' | 'reminders' | 'habits',
  id: string,
  title: string,
  status: 'todo' | 'reminder' | 'completed' | 'trash'
) {
  return await toast.promise(axios.put(`/api/${type}/${id}`, { status }), {
    loading: `"${title}" is marking as ${status.toUpperCase()}...`,
    success: `"${title}" is marked as ${status.toUpperCase()}!`,
    error: `Failed to mark "${title}" as ${status.toUpperCase()}. Please try again later.`,
  });
}

export async function EmptyTrash(type: 'todos' | 'reminders' | 'habits') {
  return await toast.promise(axios.delete(`/api/${type}`), {
    loading: `Clearing trash...`,
    success: `Trash is cleared!`,
    error: `Failed to empty trash. Please try again later.`,
  });
}
