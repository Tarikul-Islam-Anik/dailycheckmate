import { useAtom } from "jotai";
import { reminderAtom } from "@/atom";
import { Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ItemInfo from "@/components/shared/items-info";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  EllipsisHorizontalIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
  EyeIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Reminder } from "@/lib/types";
import { ToggleStatus } from "@/lib/actions";

const notifyIn = [
  "In 5 minutes",
  "In 10 minutes",
  "In 15 minutes",
  "In 30 minutes",
  "In 1 hour",
  "Before a day",
];

const ReminderActionMenu = ({ id }: { id: Reminder["id"] }) => {
  const [reminders, setReminder] = useAtom(reminderAtom);

  const { title, status } = reminders.find((reminder) => reminder.id === id)!;

  function handleStatusChange(status: Reminder["status"]) {
    ToggleStatus("reminders", id, title, status);
    setReminder((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, status: status } : reminder
      )
    );
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <EyeIcon className="w-5 h-5 mr-2" />
              <Text as="span">View</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <BellIcon className="w-5 h-5 mr-2" />
              <Text as="span">Notify</Text>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuLabel>Feature unavailable</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifyIn.map((item, index) => (
                  <DropdownMenuItem key={index} disabled>
                    <Text as="span">{item}</Text>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {status !== "trash" ? (
            <DropdownMenuItem onClick={() => handleStatusChange("trash")}>
              <TrashIcon className="w-5 h-5 mr-2" />
              <Text as="span">Delete</Text>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleStatusChange("reminder")}>
              <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
              <Text as="span">Restore</Text>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ItemInfo id={id} type="reminders" />
    </Dialog>
  );
};

export default ReminderActionMenu;
