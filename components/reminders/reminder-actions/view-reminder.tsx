import ItemInfo from "@/components/shared/items-info";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Reminder } from "@/lib/types";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Text } from "@radix-ui/themes";

const ViewReminder = ({ id }: { id: Reminder["id"] }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={
          buttonVariants({
            variant: "outline",
          }) + " w-full"
        }
      >
        <EyeIcon className="w-5 h-5 mr-2" />
        <Text as="span">View</Text>
      </DialogTrigger>
      <ItemInfo id={id} type="reminders" />
    </Dialog>
  );
};

export default ViewReminder;
