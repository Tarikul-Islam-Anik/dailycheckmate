import { Flex, Text } from "@radix-ui/themes";
import { Icons } from "./icons";
import { useEffect, useState } from "react";

const Message = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  const splitedMessage = message.split("/newline/").map((item, index) => (
    <>
      <Text key={index} align="center">
        {item}
      </Text>
      <br />
    </>
  ));

  return (
    <Flex align="center" justify="center" className={className}>
      <Flex align="center" justify="center">
        {loading && <Icons.spinner className="w-5 h-5 mr-2 animate-spin" />}
        <Text align="center" as="p">
          {loading ? "Loading..." : splitedMessage}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Message;
