"use client";

import { useState } from "react";
import { Grid, Flex, Heading, Text, Section } from "@radix-ui/themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateNew from "../shared/create-new";
import GetTodos from "./get-todos";
import EmptyTrash from "../shared/empty-trash";
import SortItems from "../shared/sort-items";

const TabItems: ("todo" | "completed" | "trash")[] = [
  "todo",
  "completed",
  "trash",
];

const TodoList = () => {
  const [currentTab, setCurrentTab] =
    useState<(typeof TabItems)[number]>("todo");
  return (
    <Section p="0" id="todo">
      <Tabs
        defaultValue="todo"
        onValueChange={(value) =>
          setCurrentTab(value as (typeof TabItems)[number])
        }
      >
        <Flex direction="column" gap="5">
          <Flex justify="between">
            <Heading as="h2" size="6">
              <Text as="span">✔ Todo List</Text>
            </Heading>
            <TabsList>
              {TabItems.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <Flex gap="2">
              <SortItems type="todos" />
              {currentTab === "trash" ? (
                <EmptyTrash type="todos" />
              ) : (
                <CreateNew
                  type="todos"
                  title="✏ Add todo"
                  description="You can edit and view your todo later."
                />
              )}
            </Flex>
          </Flex>
          <Grid
            columns="3"
            rows="auto 1fr"
            gap="3"
            width="auto"
            p="4"
            className="border rounded-2xl max-h-[264px] min-h-[264px] overflow-y-auto"
          >
            <GetTodos todoStatus={currentTab} />
          </Grid>
        </Flex>
      </Tabs>
    </Section>
  );
};

export default TodoList;
