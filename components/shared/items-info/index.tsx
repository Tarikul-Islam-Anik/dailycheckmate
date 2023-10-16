import { Todo, Reminder } from "@/lib/types";
import { DialogContent } from "@/components/ui/dialog";
import DescriptionTerm from "./description-term";
import DescriptionDetails from "./description-details";

type ItemInfoProps = Todo | Reminder;

const ItemInfo = ({ info }: { info: ItemInfoProps }) => {
  return (
    <DialogContent>
      <dl className="divide-y divide-gray-100">
        {Object.entries(info).map(([key, value]) => {
          return (
            key !== "id" &&
            key !== "updatedAt" && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
