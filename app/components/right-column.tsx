import { Flex, Box } from "@radix-ui/themes";
import HabitsList from "@/components/habits";
import ClockAndWeather from "@/components/shared/clock-and-weather";
import User from "@/components/shared/user";
import Version from "@/components/shared/version";

const RightColumn = () => {
  return (
    <Flex justify="between" align="end" direction="column">
      <Flex direction="column" align="center" height="100%" p="6" gap="6" className="w-3/4">
        <User />
        <Box className="w-full h-5 bg-transparent" />
        <ClockAndWeather />
        <HabitsList />
      </Flex>
      <Version />
    </Flex>
  );
};

export default RightColumn;
