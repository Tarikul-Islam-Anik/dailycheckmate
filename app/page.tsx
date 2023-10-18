"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { todoAtom, reminderAtom } from "@/atom";
import { Flex } from "@radix-ui/themes";
import { sortByNewest } from "@/lib/utils";
import { Todo, Reminder } from "@/lib/types";
import ReminderList from "@/components/reminders";
import TodoList from "@/components/todos";
import HabitsList from "@/components/habit";

export default function Home() {
  const [, setTodos] = useAtom(todoAtom);
  const [, setReminders] = useAtom(reminderAtom);

  useEffect(() => {
    axios.get("/api/todos").then((res) => {
      const sortedData = res.data.sort((a: Todo, b: Todo) => {
        return sortByNewest(a.createdAt, b.createdAt);
      });
      setTodos(sortedData);
    });
    axios.get("/api/reminders").then((res) => {
      const sortedData = res.data.sort((a: Reminder, b: Reminder) => {
        return sortByNewest(a.deadline, b.deadline);
      });
      setReminders(sortedData);
    });
  }, []);

  return (
    <Flex direction="column" width="100%" gap="9">
      <TodoList />
      <ReminderList />
      <HabitsList />
    </Flex>
  );
}
