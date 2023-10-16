"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { EmptyTrash as ET } from "@/lib/actions";
import Tooltip from "../shared/tooltip";

const EmptyTrash = ({ type }: { type: "todos" | "reminders" }) => {
  return (
    <Tooltip content="Empty trash">
      <Button
        aria-label="Empty trash"
        variant="destructive"
        size="icon"
        onClick={() => ET(type)}
      >
        <TrashIcon className="w-5 h-5 " />
      </Button>
    </Tooltip>
  );
};

export default EmptyTrash;
