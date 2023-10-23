"use client";

import { useAtom } from "jotai";
import { todoAtom } from "@/lib/atom";
import { Box, Flex } from "@radix-ui/themes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TodoActionMenu from "./todo-action-menu";
import { Todo } from "@/lib/types";
import { ToggleStatus } from "../../lib/actions";

const TodoItem = ({ id }: { id: Todo["id"] }) => {
  const [todos, setTodos] = useAtom(todoAtom);
  const { title, status } = todos.find((todo: Todo) => todo.id === id)!;
  function handleComplete() {
    ToggleStatus("todos", id, title, "completed");
    setTodos((prev) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, status: "completed" } : todo
      )
    );
  }
  return (
    <Box className="border rounded-xl h-[70px]" p="4" my="3">
      <Flex justify="between" align="center">
        <Flex gap="3" align="center" className="w-[90%]">
          {status === "todo" && (
            <Checkbox id={id} onCheckedChange={handleComplete} />
          )}
          <Label htmlFor={id} className="truncate">
            {title}
          </Label>
        </Flex>
        <TodoActionMenu id={id} />
      </Flex>
    </Box>
  );
};

export default TodoItem;
