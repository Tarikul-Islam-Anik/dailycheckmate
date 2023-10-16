import { BellIcon } from "@heroicons/react/24/outline";
import { Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import Tooltip from "@/components/shared/tooltip";

const Notify = () => {
  return (
    <Tooltip content="This service is not available yet">
      <Button variant="outline" className="w-full">
        <BellIcon className="w-5 h-5 mr-2" />
        <Text as="span">Notify</Text>
      </Button>
    </Tooltip>
  );
};

export default Notify;
