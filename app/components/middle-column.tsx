import { Flex, Heading } from "@radix-ui/themes";
import { format } from "date-fns";
import CreateNew from "@/components/shared/create-new";
import TodoList from "@/components/todos";

const MiddleColumn = () => {
  return (
    <Flex direction="column" gap="4" py="6">
      <Flex justify="between" align="center" width="100%">
        <Flex direction="column" gap="1">
          <Heading size="8">Today&apos;s Schedule</Heading>
          <Heading size="8" className="text-primary">
            {format(new Date(), "eeee, do")}
          </Heading>
        </Flex>
        <CreateNew />
      </Flex>
      <TodoList />
    </Flex>
  );
};

export default MiddleColumn;
