'use client';
import { Grid, Flex, Heading, Text } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { signIn } from 'next-auth/react';
const AuthPage = () => {
  return (
    <Grid columns='1' align='center' className='h-screen place-items-center'>
      <Flex direction='column' align='center' gap='4'>
        <Flex direction='column' align='center'>
          <Icons.logo className='h-w-28 w-28 fill-primary' />
          <Heading size='8' weight='bold'>
            Welcome to DailyCheckmate
          </Heading>
          <Text as='p' className='text-muted-foreground'>
            Please login to continue. Your data is safe with us.
          </Text>
        </Flex>
        <Button variant='outline' onClick={() => signIn('google')}>
          <Flex gap='2' align='center'>
            <Icons.google className='h-4 w-4' />
            <Text>Continue with Google</Text>
          </Flex>
        </Button>
      </Flex>
    </Grid>
  );
};

export default AuthPage;
