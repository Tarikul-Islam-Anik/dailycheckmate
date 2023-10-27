import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';
import HabitActions from './habit-actions';

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
        checked ? 'line-through' : '',
        !handleChange && 'justify-between pr-0',
        'my-1 flex w-full items-center gap-2 leading-5 text-muted-foreground transition-colors hover:text-black dark:hover:text-white'
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
