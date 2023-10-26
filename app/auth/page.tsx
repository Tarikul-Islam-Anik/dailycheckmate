'use client';

import { Grid, Flex, Heading, Text } from '@radix-ui/themes';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';

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
            Login to sync your data across devices. Or continue as guest.
          </Text>
          <Text as='p' size='2' className='text-muted-foreground'>
            Guest accounts are not synced across devices and will be deleted
          </Text>
        </Flex>
        <Flex align='center' width='auto' direction='column' gap='4'>
          <Button
            variant='outline'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
              })
            }
          >
            <Flex gap='2' align='center'>
              <Icons.google className='h-4 w-4' />
              <Text>Continue with Google</Text>
            </Flex>
          </Button>
          <Link
            href='/'
            className={buttonVariants({ variant: 'secondary' }) + ' w-full'}
          >
            <Flex gap='2' align='center'>
              <UserIcon className='h-4 w-4' />
              <Text>Continue as Guest</Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default AuthPage;
