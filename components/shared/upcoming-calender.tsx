"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { reminderAtom } from "@/lib/atom";
import { format } from "date-fns";
import { Flex, Heading, Box } from "@radix-ui/themes";
import { DateFormatter } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const seasonEmoji: Record<string, string> = {
  winter: "⛄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍂",
};

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return "winter";
  if (monthNumber >= 3 && monthNumber < 6) return "spring";
  if (monthNumber >= 6 && monthNumber < 9) return "summer";
  else return "autumn";
};

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month);
  return (
    <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{" "}
      {format(month, "LLLL", { locale: options?.locale })}
    </>
  );
};

const UpcomingEventCalender = () => {
  const [reminder] = useAtom(reminderAtom);
  const events = [...reminder.map((item) => new Date(item.schedule))];

  function disableDates(date: Date): boolean {
    return !events.some(
      (event) =>
        event.getDate() === date.getDate() &&
        event.getMonth() === date.getMonth() &&
        event.getFullYear() === date.getFullYear()
    );
  }

  return (
    <Box>
      <Flex justify="between" align="center" mb="4">
        <Heading size="5" as="h3">
          Upcoming Events
        </Heading>
      </Flex>
      <Box className="rounded-xl bg-card w-full space-x-9 flex h-[290px] relative items-center justify-center overflow-hidden">
        <Calendar
          mode="single"
          selected={new Date()}
          disabled={(date) => disableDates(date)}
          modifiers={{
            events: events,
          }}
          modifiersClassNames={{
            events: "text-primary",
          }}
          className="absolute top-2 w-full h-full left-2"
          classNames={{
            head_cell:
              "text-muted-foreground rounded-md w-8 mx-0.5 font-normal text-[0.8rem]",
            cell: cn(
              "relative p-0 mx-0.5 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent"
            ),
          }}
          formatters={{ formatCaption }}
        />
      </Box>
    </Box>
  );
};

export default UpcomingEventCalender;
