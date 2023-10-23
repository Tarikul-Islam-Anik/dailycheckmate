import ReminderList from "@/components/reminders";
import Logo from "@/components/shared/logo";
import UpcomingEventCalender from "@/components/shared/upcoming-calender";
import { Flex } from "@radix-ui/themes";

const LeftColumn = () => {
  return (
    <Flex
      direction="column"
      justify="between"
      className="w-3/4"
      height='100%'
      p="6"
      gap='1'
    >
      <Logo />
      <ReminderList />
      <UpcomingEventCalender />
    </Flex>
  );
};

export default LeftColumn;
