import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  EyeIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { buttonVariants } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";
import { ToggleStatus } from "@/lib/actions";
import ItemInfo from "../shared/items-info";
import { Todo } from "@/lib/types";

const actions = [
  {
    label: "Undo",
    value: "todo",
    icon: ArrowUturnLeftIcon,
  },
  {
    label: "Move to trash",
    value: "trash",
    icon: TrashIcon,
  },
];

const TodoActionMenu = ({
  data,
  setVisible,
}: {
  data: Todo;
  setVisible: (visible: boolean) => void;
}) => {
  const { id, title, status } = data;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-muted-foreground">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <EyeIcon className="w-5 h-5 mr-2" />
              <Text as="span">View</Text>
            </DropdownMenuItem>
          </DialogTrigger>
          {actions.map((action) => {
            return (
              action.value !== status && (
                <DropdownMenuItem
                  key={action.value}
                  className="flex items-center"
                  onClick={() => {
                    ToggleStatus(
                      "todos",
                      id,
                      title,
                      action.value as "trash" | "todo"
                    );
                    setVisible(false);
                  }}
                >
                  <action.icon className="w-5 h-5 mr-2" />
                  <Text as="span">{action.label}</Text>
                </DropdownMenuItem>
              )
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <ItemInfo info={data} />
    </Dialog>
  );
};

export default TodoActionMenu;
