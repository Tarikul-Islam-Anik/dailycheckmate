import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import HabitActions from "./habit-actions";

const HabitItem = ({
  id,
  text,
  checked,
  handleChange,
}: {
  id: string;
  text: string;
  checked?: boolean;
  handleChange?: (id: string) => void;
}) => {
  return (
    <Label
      key={id}
      className={cn(
        checked ? "line-through" : "",
        !handleChange && "justify-between pr-0",
        "flex items-center gap-2 w-full text-muted-foreground my-1 hover:text-black dark:hover:text-white transition-colors leading-5"
      )}
      htmlFor={id}
    >
      {handleChange && (
        <Checkbox
          onCheckedChange={() => handleChange(id)}
          checked={checked}
          disabled={checked}
          id={id}
        />
      )}
      {text}
      {!handleChange && <HabitActions id={id} />}
    </Label>
  );
};

export default HabitItem;
