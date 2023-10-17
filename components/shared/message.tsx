import { Flex, Text } from "@radix-ui/themes";
import { Icons } from "./icons";

const Message = ({
  message,
  loading = false,
}: {
  message: string;
  loading?: boolean;
}) => {
  return (
    <Flex align="center" justify="center" className="h-full text-center w-full">
      <Text align="center">
        {loading && <Icons.spinner className="w-5 h-5 mr-2" />}
        <Text as="span">{message}</Text>
      </Text>
    </Flex>
  );
};

export default Message;
