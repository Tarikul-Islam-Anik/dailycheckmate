import { useAtom } from 'jotai';
import { todoAtom, reminderAtom } from '@/lib/atom';
import { Todo, Reminder } from '@/lib/types';
import { DialogContent } from '@/components/ui/dialog';
import DescriptionTerm from './description-term';
import DescriptionDetails from './description-details';

type ItemInfoProps = Todo | Reminder;

const ItemInfo = ({
  type,
  id,
}: {
  id: ItemInfoProps['id'];
  type: 'todo' | 'reminder';
}) => {
  const [items, setItems] = useAtom(type === 'todo' ? todoAtom : reminderAtom);
  const data = items.find((item: ItemInfoProps) => item.id === id);

  return (
    <DialogContent>
      <dl className='divide-y divide-gray-100 dark:divide-muted-foreground'>
        {data &&
          Object.entries(data).map(([key, value]) => {
            return (
              key !== 'id' &&
              key !== 'updatedAt' &&
              key !== 'userId' && (
                <div
                  key={key}
                  className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'
                >
                  <DescriptionTerm term={key} />
                  <DescriptionDetails term={key} details={value} />
                </div>
              )
            );
          })}
      </dl>
    </DialogContent>
  );
};

export default ItemInfo;
