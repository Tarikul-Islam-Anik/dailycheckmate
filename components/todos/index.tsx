"use client";

import { useState } from "react";
import { Grid, Flex, Heading, Text, Section } from "@radix-ui/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateNew from "../shared/create-new";
import GetTodos from "./get-todos";
import EmptyTrash from "../shared/empty-trash";

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
          {TabItems.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Grid
                columns="3"
                rows="auto 1fr"
                gap="3"
                width="auto"
                p="4"
                className="border rounded-md max-h-[264px] min-h-[264px] overflow-y-scroll"
              >
                <GetTodos todoStatus={tab} />
              </Grid>
            </TabsContent>
          ))}
        </Flex>
      </Tabs>
    </Section>
  );
};

export default TodoList;
