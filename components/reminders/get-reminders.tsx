"use client";
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
  const [reminders] = useAtom(reminderAtom);

  const filteredReminders = reminders
    .map((reminder: Reminder) => {
      reminder.status !== "trash" &&
        new Date() > new Date(reminder.deadline) &&
        (reminder.status = "completed");
      return reminder;
    })
    .filter((reminder: Reminder) => reminder.status === reminderStatus);

  return filteredReminders.length !== 0 ? (
    filteredReminders.map((reminder) => {
      return <ReminderItem key={reminder.id} id={reminder.id} />;
    })
  ) : (
    <Message message="No reminders found." />
  );
};

export default GetReminders;
