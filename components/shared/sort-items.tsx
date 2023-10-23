"use client";

import { useAtom } from "jotai";
import { todoAtom, reminderAtom } from "@/lib/atom";
import { Text } from "@radix-ui/themes";
import { sortByNewest, sortByOldest } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretSortIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "../ui/button";
import TooltipParent from "./tooltip-parent";

const SortItems = ({ type }: { type: "todos" | "reminders" }) => {
  const [, setTodos] = useAtom(todoAtom);
  const [, setReminders] = useAtom(reminderAtom);

  function sortItems(type: "todos" | "reminders", sortBy: "newest" | "oldest") {
    if (type === "todos") {
      setTodos((prev) =>
        prev.sort((a, b) =>
          sortBy === "newest"
            ? sortByNewest(a.createdAt, b.createdAt)
            : sortByOldest(a.createdAt, b.createdAt)
        )
      );
    } else {
      setReminders((prev) =>
        prev.sort((a, b) =>
          sortBy === "newest"
            ? sortByNewest(a.createdAt, b.createdAt)
            : sortByOldest(a.createdAt, b.createdAt)
        )
      );
    }
  }

  return (
    <DropdownMenu>
      <TooltipParent content="Sort by">
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <CaretSortIcon className="w-5 h-5" />
        </DropdownMenuTrigger>
      </TooltipParent>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center"
          onClick={() => sortItems(type, "newest")}
        >
          <ArrowUpIcon className="w-3.5 text-muted-foreground h-3.5 mr-2" />
          <Text as="span">Newest</Text>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center"
          onClick={() => sortItems(type, "oldest")}
        >
          <ArrowDownIcon className="w-3.5 text-muted-foreground h-3.5 mr-2" />
          <Text as="span">Oldest</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortItems;
