'use client';

import { cn } from '@/lib/utils';
import { Todo, Reminder } from '@/lib/types';
import { Flex, Text } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ChangeBulkStatus from './change-bulk-status';

type status = Todo['status'] | Reminder['status'];

interface FilterOptionsProps {
  type: 'reminder' | 'todo' | 'habit';
  className?: string;
  filter: status;
  setFilter: React.Dispatch<React.SetStateAction<status>>
}

const FilterOptions = ({
  type,
  className,
  filter,
  setFilter,
}: FilterOptionsProps) => {
  return (
    <Flex align='center' gap='2'>
      {type === 'todo' && (filter === 'completed' || filter === 'trash') && (
        <ChangeBulkStatus type={type} status={filter} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className={cn('font-bold text-primary', className)}
          >
            <Flex align='center' gap='2'>
              <MixerHorizontalIcon />
              <Text>View</Text>
            </Flex>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filter}
            onValueChange={setFilter as any}
          >
            <DropdownMenuRadioItem value='onGoing'>
              {type === 'reminder' ? 'Upcoming' : 'In Progress'}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='completed'>
              Completed
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='trash'>Trash</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
};

export default FilterOptions;
