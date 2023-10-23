"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangeBulkStatus from "./change-bulk-status";

type status = "reminder" | "todo" | "completed" | "trash";

const FilterOptions = ({
  type,
  className,
  filter,
  setFilter,
}: {
  type: "reminder" | "todo" | "habit";
  className?: string;
  filter: status;
  setFilter: (status: status) => void;
}) => {
  return (
    <Flex align="center" gap="2">
      {type === "todo" && (filter === "completed" || filter === "trash") && (
        <ChangeBulkStatus type={type} status={filter} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("text-primary font-bold", className)}
          >
            <Flex align="center" gap="2">
              <MixerHorizontalIcon />
              <Text>View</Text>
            </Flex>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filter}
            onValueChange={setFilter as any}
          >
            <DropdownMenuRadioItem value={type}>
              {type === "reminder" ? "Upcoming" : "In Progress"}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="completed">
              Completed
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="trash">Trash</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
};

export default FilterOptions;
