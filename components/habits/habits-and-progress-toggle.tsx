"use client";

import { Icons } from "../shared/icons";
import { Button } from "../ui/button";
import TooltipParent from "../shared/tooltip-parent";
import { ListBulletIcon } from "@heroicons/react/24/outline";

const HabitsAndProgressToggle = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}) => {
  return (
    <TooltipParent content={toggle ? "List" : "Progress"}>
      <Button variant="ghost" size="icon" onClick={() => setToggle(!toggle)}>
        {toggle ? (
          <ListBulletIcon className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Icons.analytics className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </TooltipParent>
  );
};

export default HabitsAndProgressToggle;
