import { useAtom } from 'jotai';
import { Delete } from '@/lib/actions';
import { Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import DescriptionTerm from './description-term';
import { Todo, Reminder, Idea } from '@/lib/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Separator } from '@/components/ui/separator';
import DescriptionDetails from './description-details';
import { todoAtom, ideaAtom, reminderAtom } from '@/lib/atom';
import { DialogContent, DialogFooter } from '@/components/ui/dialog';

type ItemInfoProps = Todo | Reminder | Idea;

const ItemInfo = ({
  type,
  id,
}: {
  id: ItemInfoProps['id'];
  type: 'todo' | 'reminder' | 'idea';
}) => {
  const [items, setItems] = useAtom(
    type === 'todo' ? todoAtom : type === 'reminder' ? reminderAtom : ideaAtom
  );
  const data = items.find((item: ItemInfoProps) => item.id === id);
  const { data: session } = useSession();

  function handleDelete() {
    if (session) {
      Delete(type, id!).then(() => {
        setItems((prev: ItemInfoProps[]) =>
          prev.filter((item: ItemInfoProps) => item.id !== id)
        );
      });
    } else {
      setItems((prev: ItemInfoProps[]) =>
        prev.filter((item: ItemInfoProps) => item.id !== id)
      );
    }
  }

  return (
    <DialogContent>
      <dl>
        {data &&
          Object.entries(data).map(([key, value], index) => {
            return (
              key !== 'id' &&
              key !== 'updatedAt' &&
              key !== 'userId' && (
                <Box key={key}>
                  <Box className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <DescriptionTerm term={key} />
                    <DescriptionDetails term={key} details={value} />
                  </Box>
                  {index !== Object.entries(data).length - 3 && (
                    <Separator key={key} />
                  )}
                </Box>
              )
            );
          })}
      </dl>
      <DialogFooter className='sm:justify-end'>
        <DialogClose asChild>
          <Button
            type='button'
            variant='destructive'
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </DialogClose>
        <Button type='button' variant='secondary' disabled>
          Edit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ItemInfo;
