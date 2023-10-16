import axios from "axios";
import { toast } from "sonner";

export async function Edit(
  type: "todos" | "reminders",
  id: string,
  status: string,
  title: string,
  description: string
) {
  return await axios.put(`/api/${type}/${id}`, { status, title, description });
}

export async function Delete(type: "todos" | "reminders", id: string) {
  return await axios.delete(`/api/${type}/${id}`);
}

export async function Create(
  type: "todos" | "reminders",
  data: {
    title: string;
    description?: string;
    links?: string;
    deadline?: Date;
    reminderTime?: Date;
  }
) {
  return await axios.post(`/api/${type}/new`, data);
}

export async function ToggleStatus(
  type: "todos" | "reminders",
  id: string,
  title: string,
  status: "todo" | "reminder" | "completed" | "trash"
) {
  return await toast.promise(axios.put(`/api/${type}/${id}`, { status }), {
    loading: `"${title}" is moving to ${status.toUpperCase()} tab...`,
    success: `"${title}" is moved to ${status.toUpperCase()} tab!`,
    error: `Failed to move "${title}" to ${status.toUpperCase()} tab. Please try again later.`,
  });
}

export async function EmptyTrash(type: "todos" | "reminders") {
  return await toast.promise(axios.delete(`/api/${type}`), {
    loading: `Clearing trash...`,
    success: `Trash is cleared!`,
    error: `Failed to empty trash. Please try again later.`,
  });
}
