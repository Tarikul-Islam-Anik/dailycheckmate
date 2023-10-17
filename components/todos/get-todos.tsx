"use client";

import { useAtom } from "jotai";
import { todoAtom } from "@/atom";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import Message from "../shared/message";

type TodoStatus = "todo" | "completed" | "trash";

const GetTodos = ({ todoStatus }: { todoStatus: TodoStatus }) => {
  const [todos] = useAtom(todoAtom);

  const filteredTodos = todos
    .filter((todo: Todo) => todo.status === todoStatus)
    .sort(
      (a: Todo, b: Todo) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return filteredTodos.length !== 0 ? (
    filteredTodos.map((todo: Todo) => {
      return <TodoItem key={todo.id} id={todo.id} />;
    })
  ) : (
    <Message message="No todos found." />
  );
};

export default GetTodos;
