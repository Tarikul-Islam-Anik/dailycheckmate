import { BellIcon } from "@heroicons/react/24/outline";
import { Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import TooltipParent from "@/components/shared/tooltip-parent";

const Notify = () => {
  return (
    <TooltipParent content="This service is not available yet">
      <Button variant="outline" className="w-full">
        <BellIcon className="w-5 h-5 mr-2" />
        <Text as="span">Notify</Text>
      </Button>
    </TooltipParent>
  );
};

export default Notify;
