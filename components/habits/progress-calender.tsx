import { Flex, Text } from '@radix-ui/themes';
import { Habits } from '@/lib/types';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const ProgressCalender = ({
  progress,
  setProgress,
}: {
  progress: Habits;
  setProgress: (value: {}) => void;
}) => {
  const daysCompleted = [...progress.days.map((item) => new Date(item))];
  return (
    <Flex direction='column'>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setProgress({})}
        className='justify-between space-x-2 pr-6'
      >
        <ArrowLeftIcon />
        <Text as='p'>
          <Text className='capitalize'>{progress.title}</Text> -{' '}
          {daysCompleted.length} day
          {daysCompleted.length > 1 && 's'}
        </Text>
      </Button>
      <Calendar
        mode='single'
        selected={new Date()}
        modifiers={{
          events: daysCompleted,
        }}
        modifiersClassNames={{
          events: 'text-primary',
        }}
      />
    </Flex>
  );
};

export default ProgressCalender;
