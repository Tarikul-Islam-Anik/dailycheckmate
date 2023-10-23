"use client";
import { useAtom } from "jotai";
import { todoAtom, reminderAtom } from "@/lib/atom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { EmptyTrash as ET } from "@/lib/actions";
import TooltipParent from "./tooltip-parent";
import AlertDialogParent from "./alert-dialog-parent";

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
    <AlertDialogParent
      title="Are you sure?"
      description="This action is irreversible. All the items in the trash will be deleted permanently."
      action={handleEmptyTrash}
    >
      <TooltipParent content="Empty trash">
        <Button aria-label="Empty trash" variant="destructive" size="icon">
          <TrashIcon className="w-5 h-5 " />
        </Button>
      </TooltipParent>
    </AlertDialogParent>
  );
};

export default EmptyTrash;
