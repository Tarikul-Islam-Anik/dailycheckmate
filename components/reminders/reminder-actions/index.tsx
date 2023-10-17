import { useAtom } from "jotai";
import { reminderAtom } from "@/atom";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Reminder } from "@/lib/types";
import { ToggleStatus } from "@/lib/actions";
import ViewReminder from "./view-reminder";
import Notify from "./notify";
import Tooltip from "@/components/shared/tooltip";

const ReminderActions = ({
  id,
  title,
}: {
  id: Reminder["id"];
  title: Reminder["title"];
}) => {
  const [reminders, setReminder] = useAtom(reminderAtom);

  const reminder = reminders.find((reminder) => reminder.id === id)!;

  function handleStatusChange(status: Reminder["status"]) {
    ToggleStatus("reminders", id, title, status);
    setReminder((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, status: status } : reminder
      )
    );
  }

  const tooltipContent =
    reminder.status === "trash" ? "Restore" : "Move to trash";

  const icon =
    reminder.status === "trash" ? (
      <ArrowUturnLeftIcon className="w-5 h-5" />
    ) : (
      <TrashIcon className="w-5 h-5" />
    );

  return (
    <CardFooter className="flex space-x-2 ">
      <div className="w-full flex space-x-2">
        <ViewReminder id={id} />
        <Notify />
      </div>
      <Tooltip content={tooltipContent}>
        <Button
          variant="ghost"
          onClick={() =>
            handleStatusChange(
              reminder.status === "trash" ? "reminder" : "trash"
            )
          }
        >
          {icon}
        </Button>
      </Tooltip>
    </CardFooter>
  );
};

export default ReminderActions;
