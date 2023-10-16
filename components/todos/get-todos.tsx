"use client";

import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { todoAtom } from "@/atom";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import Message from "../shared/message";

type TodoStatus = "todo" | "completed" | "trash";

const GetTodos = ({ todoStatus }: { todoStatus: TodoStatus }) => {
  const [todos, setTodos] = useAtom(todoAtom);

  useEffect(() => {
    axios.get("/api/todos").then((res) => {
      const { data } = res;
      setTodos(data);
    });
  }, []);

  const filteredTodos = todos
    .filter((todo: Todo) => todo.status === todoStatus)
    .sort(
      (a: Todo, b: Todo) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return filteredTodos.length !== 0 ? (
    filteredTodos.map((todo) => {
      const { id, title, description, status, createdAt, updatedAt } = todo;
      return (
        <TodoItem
          key={id}
          data={{
            id,
            title,
            description: description!,
            status: status as TodoStatus,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }}
        />
      );
    })
  ) : (
    <Message message="No todos found." />
  );
};

export default GetTodos;
