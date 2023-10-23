import axios from "axios";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { todoAtom } from "@/lib/atom";
import { useAtom } from "jotai/react";

const ChangeBulkStatus = ({
  type,
  status,
}: {
  type: "reminder" | "todo" | "habit";
  status: "completed" | "trash";
}) => {
  const [, setTodo] = useAtom(todoAtom);

  function handleClick() {
    toast.promise(
      status === "completed"
        ? axios.put("/api/" + type + "s")
        : axios.delete("/api/" + type + "s"),
      {
        loading: status === "completed" ? "Moving to trash" : "Clearing trash",
        success: () => {
          if (status === "completed") {
            setTodo((prev) =>
              prev.map((todo) => {
                if (todo.status === "completed") {
                  return { ...todo, status: "trash" };
                }
                return todo;
              })
            );
          } else {
            setTodo((prev) => prev.filter((todo) => todo.status !== "trash"));
          }
          return status === "completed" ? "Moved to trash" : "Cleared trash";
        },
        error: status === "completed" ? "Failed to move to trash" : "Failed",
      }
    );
  }

  return (
    <Button variant="secondary" onClick={handleClick}>
      {status === "completed" ? "Move to trash" : "Clear trash"}
    </Button>
  );
};

export default ChangeBulkStatus;
