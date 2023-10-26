'use client';
import { useSession } from 'next-auth/react';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { UserNav } from './user-nav';

const User = () => {
  const { data: session } = useSession();
  const date = new Date().getHours();
  const greeting =
    date >= 5 && date < 12
      ? 'Good morning'
      : date >= 12 && date < 18
      ? 'Good afternoon'
      : 'Good evening';

  return (
    <Flex justify='between' align='center' className='w-full'>
      <Heading size='4' className='flex flex-col items-start'>
        <Text as='span' className='text-muted-foreground'>
          {greeting},
        </Text>
        <Text>{session?.user?.name ?? 'there'} </Text>
      </Heading>
      <UserNav session={session} />
    </Flex>
  );
};

export default User;
