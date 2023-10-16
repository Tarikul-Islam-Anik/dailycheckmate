import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Reminder } from "@/lib/types";
import { ToggleStatus } from "@/lib/actions";
import ViewReminder from "./view-reminder";
import Notify from "./notify";
import Tooltip from "@/components/shared/tooltip";

const ReminderActions = ({ data }: { data: Reminder }) => {
  return (
    <CardFooter className="flex space-x-2 ">
      <div className="w-full flex space-x-2">
        <ViewReminder data={data} />
        <Notify />
      </div>
      <Tooltip content="Move to trash">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            ToggleStatus("reminders", data.id, data.title, "trash")
          }
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </Tooltip>
    </CardFooter>
  );
};

export default ReminderActions;
