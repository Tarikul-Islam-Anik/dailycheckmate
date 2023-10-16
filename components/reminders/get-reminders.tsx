"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { reminderAtom } from "@/atom";
import { Reminder } from "@/lib/types";
import ReminderItem from "./reminder-item";
import Message from "../shared/message";

type ReminderStatus = "reminder" | "completed" | "trash";

const GetReminders = ({
  reminderStatus,
}: {
  reminderStatus: ReminderStatus;
}) => {
  const [reminders, setReminders] = useAtom(reminderAtom);
  useEffect(() => {
    axios.get("/api/reminders").then((res) => {
      const { data } = res;
      setReminders(data);
    });
  }, []);

  const filteredReminders = reminders
    .map((reminder: Reminder) => {
      reminder.status !== "trash" &&
        new Date() > new Date(reminder.deadline) &&
        (reminder.status = "completed");
      return reminder;
    })
    .filter((reminder: Reminder) => reminder.status === reminderStatus)
    .sort(
      (a: Reminder, b: Reminder) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

  return filteredReminders.length !== 0 ? (
    filteredReminders.map((reminder) => {
      const {
        id,
        title,
        description,
        links,
        status,
        deadline,
        reminderTime,
        createdAt,
        updatedAt,
      } = reminder;
      return (
        <ReminderItem
          key={id}
          data={{
            id,
            title,
            description: description!,
            links: links!,
            status: status as ReminderStatus,
            deadline: deadline,
            reminderTime: reminderTime,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }}
        />
      );
    })
  ) : (
    <Message message="No reminders found." />
  );
};

export default GetReminders;
