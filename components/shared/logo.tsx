import { Text, Flex } from '@radix-ui/themes';
import { Icons } from './icons';

const Logo = () => {
  return (
    <Flex align='center'>
      <Icons.logo className='h-12 w-12 fill-primary' />
      <Text size='6' className='font-bold' as='span'>
        DailyCheckmate
      </Text>
    </Flex>
  );
};

export default Logo;
