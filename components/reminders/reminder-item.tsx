import { useAtom } from "jotai";
import { reminderAtom } from "@/atom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@radix-ui/themes";
import { Reminder } from "@/lib/types";
import { format } from "date-fns";
import ReminderActions from "./reminder-actions";

const RerminderItem = ({ id }: { id: Reminder["id"] }) => {
  const [reminders] = useAtom(reminderAtom);
  const { title, description, deadline } = reminders.find(
    (reminder) => reminder.id === id
  )!;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 min-h-[120px] min-w-[320px] max-w-[320px]">
        <Text size="2" as="p" className="line-clamp-3">
          {description?.length !== 0 ? (
            description
          ) : (
            <Text as="span" className="text-muted-foreground">
              No description provided.
            </Text>
          )}
        </Text>
        <Text size="2" as="p" className="line-clamp-3">
          <Text as="span" className="font-bold text-muted-foreground">
            Deadline:{" "}
          </Text>
          {format(new Date(deadline), "eeee dd, LLL yyyy")}
        </Text>
      </CardContent>
      <ReminderActions id={id} title={title} />
    </Card>
  );
};

export default RerminderItem;
