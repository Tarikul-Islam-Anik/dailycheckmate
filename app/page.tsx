import ReminderList from "@/components/reminders";
import TodoList from "@/components/todos";
import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction="column" width="100%" gap="9">
      <TodoList />
      <ReminderList />
    </Flex>
  );
}
