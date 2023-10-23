import { Flex } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { habitAtom, showHabitProgressAtom } from "@/lib/atom";
import HabitItem from "./habit-item";
import ProgressCalender from "./progress-calender";
import { Habits } from "@/lib/types";
import Message from "../shared/message";

const HabitProgress = () => {
  const [habits] = useAtom(habitAtom);
  const [progress, setProgress] = useAtom(showHabitProgressAtom);

  if (habits.length === 0)
    return <Message message="No habits yet! /newline/ You can track your habits here."  className="h-[300px] text-sm"/>;

  return Object.keys(progress).length === 0 ? (
    <Flex direction="column" gap="4">
      {habits.map((habit) => (
        <HabitItem key={habit.id} text={habit.title} id={habit.id} />
      ))}
    </Flex>
  ) : (
    <ProgressCalender progress={progress as Habits} setProgress={setProgress} />
  );
};

export default HabitProgress;
