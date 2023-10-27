import axios from 'axios';
import { toast } from 'sonner';

type ItemType = 'todo' | 'reminder' | 'habit';

export async function Edit(
  type: ItemType,
  id: string,
  status: string,
  title: string,
  description: string
) {
  return await axios.put(`/api/${type}s/${id}`, { status, title, description });
}

export async function Delete(type: ItemType, id: string) {
  return await axios.delete(`/api/${type}s/${id}`);
}

export async function Create(
  type: ItemType,
  data: {
    title: string;
    color?: string;
    description?: string;
    links?: string[];
    deadline?: Date;
    reminderTime?: Date;
  }
) {
  return await axios.post(`/api/${type}s/new`, data);
}

export async function ToggleStatus(
  type: ItemType,
  id: string,
  title: string,
  status: 'todo' | 'reminder' | 'completed' | 'trash'
) {
  return await toast.promise(axios.put(`/api/${type}s/${id}`, { status }), {
    loading: `"${title}" is marking as ${status.toUpperCase()}...`,
    success: `"${title}" is marked as ${status.toUpperCase()}!`,
    error: `Failed to mark "${title}" as ${status.toUpperCase()}. Please try again later.`,
  });
}
