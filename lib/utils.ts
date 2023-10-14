import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
