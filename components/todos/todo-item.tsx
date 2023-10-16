"use client";

import { useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TodoActionMenu from "./todo-action-menu";
import { Todo } from "@/lib/types";
import { ToggleStatus } from "../../lib/actions";

const TodoItem = ({ data }: { data: Todo }) => {
  const [visible, setVisible] = useState(true);
  const { id, title, status } = data;
  return (
    visible && (
      <Box className="border rounded-md h-[70px]" p="4">
        <Flex justify="between" align="center">
          <Flex gap="3" align="center" className="w-[90%]">
            {status === "todo" && (
              <Checkbox
                id={id}
                onCheckedChange={() => {
                  ToggleStatus("todos", id, title, "completed");
                  setVisible(false);
                }}
              />
            )}
            <Label htmlFor={id} className="truncate">
              {title}
            </Label>
          </Flex>
          <TodoActionMenu data={data} setVisible={setVisible} />
        </Flex>
      </Box>
    )
  );
};

export default TodoItem;
