"use client";
import { useAtom } from "jotai";
import { todoAtom, reminderAtom } from "@/atom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { EmptyTrash as ET } from "@/lib/actions";
import Tooltip from "../shared/tooltip";

const EmptyTrash = ({ type }: { type: "todos" | "reminders" }) => {
  const [, setTodos] = useAtom(todoAtom);
  const [, setReminders] = useAtom(reminderAtom);

  function handleEmptyTrash() {
    ET(type);
    if (type === "todos") {
      setTodos((prev) => prev.filter((todo) => todo.status !== "trash"));
    } else {
      setReminders((prev) =>
        prev.filter((reminder) => reminder.status !== "trash")
      );
    }
  }

  return (
    <Tooltip content="Empty trash">
      <Button
        aria-label="Empty trash"
        variant="destructive"
        size="icon"
        onClick={handleEmptyTrash}
      >
        <TrashIcon className="w-5 h-5 " />
      </Button>
    </Tooltip>
  );
};

export default EmptyTrash;
