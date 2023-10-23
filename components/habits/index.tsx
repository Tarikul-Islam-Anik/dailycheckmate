"use client";
import { useState } from "react";
import { Text } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HabitsAndProgressToggle from "./habits-and-progress-toggle";
import GetHabits from "./get-habits";
import { ScrollArea } from "../ui/scroll-area";
import HabitProgress from "./progress";

const HabitsList = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          <Text size="5" as="span">
            Habits {toggle && "Progress"}
          </Text>
        </CardTitle>
        <CardDescription>
          <HabitsAndProgressToggle toggle={toggle} setToggle={setToggle} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {toggle ? <HabitProgress /> : <GetHabits />}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HabitsList;
