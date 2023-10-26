import { Flex, Text } from '@radix-ui/themes';
import { Icons } from './icons';
import { useEffect, useState } from 'react';

const Message = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  const splitedMessage = message.split('/newline/').map((item, index) => (
    <Text as='p' key={index}>
      <Text align='center'>{item}</Text>
      <br />
    </Text>
  ));

  return (
    <Flex align='center' justify='center' className={className}>
      <Flex align='center' justify='center'>
        {loading && <Icons.spinner className='mr-2 h-5 w-5 animate-spin' />}
        <Text align='center' as='p'>
          {loading ? 'Loading...' : splitedMessage}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Message;
