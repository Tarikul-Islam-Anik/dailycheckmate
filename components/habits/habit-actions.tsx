import { useAtom } from 'jotai';
import { Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { Delete } from '@/lib/actions';
import { habitAtom, showHabitProgressAtom } from '@/lib/atom';
import { Button } from '../ui/button';
import AlertDialogParent from '../shared/alert-dialog-parent';
import TooltipParent from '../shared/tooltip-parent';
import { Icons } from '../shared/icons';
import { toast } from 'sonner';

const HabitActions = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const [habits, setHabits] = useAtom(habitAtom);
  const [, setShowHabitProgress] = useAtom(showHabitProgressAtom);

  const deleteHabit = (id: string) => {
    const filteredHabits = habits.filter((habit) => habit.id !== id);
    if (session) {
      toast.promise(Delete('habit', id), {
        loading: 'Deleting habit...',
        success: () => {
          setHabits(filteredHabits);
          return 'Habit deleted successfully';
        },
        error: 'Error deleting habit',
      });
    } else {
      setHabits(filteredHabits);
    }
  };

  return (
    <Flex>
      <TooltipParent content='Show progress'>
        <Button
          variant='ghost'
          size='icon'
          className='text-muted-foreground'
          onClick={() =>
            setShowHabitProgress(habits.find((habit) => habit.id === id) ?? {})
          }
        >
          <Icons.analytics className='h-4 w-4' />
        </Button>
      </TooltipParent>
      <AlertDialogParent
        title={'Delete Habit'}
        description='This action is irreversible. You will lose all your progress. Are you sure you want to delete this item?'
        action={() => deleteHabit(id)}
      >
        <Button variant='ghost' size='icon' className='text-muted-foreground'>
          <TrashIcon className='h-4 w-4' />
        </Button>
      </AlertDialogParent>
    </Flex>
  );
};

export default HabitActions;
