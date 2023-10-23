"use client";

import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import FilterOptions from "../shared/filter-options";
import { ScrollArea } from "../ui/scroll-area";
import GetTodos from "./get-todos";

const TodoList = () => {
  const [todoStatus, setTodoStatus] = useState<"todo" | "completed" | "trash">(
    "todo"
  );

  return (
    <>
      <Flex justify="end" align="center">
        <FilterOptions
          type="todo"
          className="text-slate-500"
          filter={todoStatus}
          setFilter={setTodoStatus as any}
        />
      </Flex>
      <ScrollArea
        className="h-[calc(100vh-14rem)] rounded-xl pr-4 rounded-tr-none rounded-br-none"
        scrollHideDelay={0}
      >
        <GetTodos todoStatus={todoStatus} />
      </ScrollArea>
    </>
  );
};

export default TodoList;
