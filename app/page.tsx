"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { Grid, Box } from "@radix-ui/themes";
import { todoAtom, reminderAtom, habitAtom } from "@/lib/atom";
import LeftColumn from "./components/left-column";
import RightColumn from "./components/right-column";
import MiddleColumn from "./components/middle-column";
import { sortByNewest } from "@/lib/utils";
import { Todo, Reminder } from "@/lib/types";
import useMediaQuery from "@/lib/hooks/use-media-query";
import Message from "@/components/shared/message";

export default function HomePage() {
  const [, setTodos] = useAtom(todoAtom);
  const [, setReminders] = useAtom(reminderAtom);
  const [, setHabits] = useAtom(habitAtom);
  const { isDesktop, width } = useMediaQuery();

  useEffect(() => {
    axios.get("/api/get-data").then((res) => {
      const { todos, reminders, habits } = res.data;
      setTodos(
        todos.sort((a: Todo, b: Todo) => sortByNewest(a.createdAt, b.createdAt))
      );
      setReminders(
        reminders.sort((a: Reminder, b: Reminder) =>
          sortByNewest(a.schedule, b.schedule)
        )
      );
      setHabits(habits);
    });
  }, []);

  return isDesktop && width! > 1280 ? (
    <Grid columns="4" height="100%">
      <LeftColumn />
      <Box className="col-span-2">
        <MiddleColumn />
      </Box>
      <RightColumn />
    </Grid>
  ) : (
    <Message
      message="Hey 👋 there! DailyCheckmate is only optimized for desktop. Support for mobile is coming soon!"
      className="h-screen"
    />
  );
}
