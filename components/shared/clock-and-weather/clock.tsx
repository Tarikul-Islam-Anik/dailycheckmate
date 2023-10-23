"use client";

import { useEffect, useState } from "react";
import { Counter } from "../../animations/animated-number";
import { Flex, Text } from "@radix-ui/themes";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex gap="1" align="center">
      <Counter
        value={parseInt(
          time.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })
        )}
      />
      <Text size="7" as="span">
        :
      </Text>
      <Counter
        value={parseInt(
          time.toLocaleTimeString("en-US", {
            minute: "numeric",
            hour12: true,
          })
        )}
      />
      <Text size="7" as="span">
        :
      </Text>
      <Counter
        value={parseInt(
          time.toLocaleTimeString("en-US", {
            second: "numeric",
            hour12: true,
          })
        )}
      />
      <Text size="7" as="span" ml="2">
        {time
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })
          .slice(-2)}
      </Text>
    </Flex>
  );
};

export default Clock;
