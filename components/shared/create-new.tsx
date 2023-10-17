"use client";
import React, { useState } from "react";
import { Text } from "@radix-ui/themes";
import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tooltip from "./tooltip";
import TodoForm from "../todos/todo-form";
import ReminderForm from "../reminders/reminder-form";

const CreateNew = ({
  type,
  title,
  description,
}: {
  type: "reminders" | "todos";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip content="Create new">
        <DialogTrigger
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <PlusIcon className="w-5 h-5" />
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text as="span">{title}</Text>
          </DialogTitle>
          <DialogDescription>
            <Text as="span">{description}</Text>
          </DialogDescription>
        </DialogHeader>
        {type === "todos" ? <TodoForm setOpen={setOpen} /> : <ReminderForm setOpen={setOpen} />
}
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
