"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { todoAtom, reminderAtom } from "@/atom";
import { Flex } from "@radix-ui/themes";
import ReminderList from "@/components/reminders";
import TodoList from "@/components/todos";

export default function Home() {
  const [, setTodos] = useAtom(todoAtom);
  const [, setReminders] = useAtom(reminderAtom);
  useEffect(() => {
    axios.get("/api/todos").then((res) => {
      setTodos(res.data);
    });
    axios.get("/api/reminders").then((res) => {
      setReminders(res.data);
    });
  }, []);

  return (
    <Flex direction="column" width="100%" gap="9">
      <TodoList />
      <ReminderList />
    </Flex>
  );
}
