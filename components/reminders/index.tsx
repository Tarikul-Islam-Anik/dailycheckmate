"use client";

import { useState } from "react";
import { Grid, Flex, Heading, Text, Section } from "@radix-ui/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateNew from "../shared/create-new";
import EmptyTrash from "../shared/empty-trash";
import GetReminders from "./get-reminders";

const TabItems: ("reminder" | "completed" | "trash")[] = [
  "reminder",
  "completed",
  "trash",
];

const ReminderList = () => {
  const [currentTab, setCurrentTab] =
    useState<(typeof TabItems)[number]>("reminder");
  return (
    <Section p="0">
      <Tabs
        defaultValue="reminder"
        onValueChange={(value) =>
          setCurrentTab(value as (typeof TabItems)[number])
        }
      >
        <Flex direction="column" gap="5">
          <Flex justify="between">
            <Heading as="h2" size="6">
              <Text as="span">⏰ Reminders</Text>
            </Heading>
            <TabsList>
              {TabItems.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {currentTab === "trash" ? (
              <EmptyTrash type="reminders" />
            ) : (
              <CreateNew
                type="reminders"
                title="📅 Add Reminder"
                description="You can edit and view your reminder later."
              />
            )}
          </Flex>
          {TabItems.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Flex gap="3" p="4" className="border rounded-md overflow-x-auto min-h-[250px]">
                <GetReminders reminderStatus={tab} />
              </Flex>
            </TabsContent>
          ))}
        </Flex>
      </Tabs>
    </Section>
  );
};

export default ReminderList;
