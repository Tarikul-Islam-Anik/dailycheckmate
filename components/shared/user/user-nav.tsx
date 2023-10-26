'use client';

import { Flex, Text } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PowerIcon } from '@heroicons/react/24/outline';
import { ThemeModeSelect } from '../theme-mode-select';

export function UserNav({ session }: { session: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-12 w-12'>
            <AvatarImage
              src={session?.user?.image!}
              alt={session?.user?.name!}
            />
            <AvatarFallback>
              {session?.user?.name
                ?.split(' ')
                .map((n: string[]) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-4' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {session?.user?.name!}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {session?.user?.email!}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeModeSelect />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <Flex align='center'>
            <PowerIcon className='mr-2 h-5 w-5' />
            <Text as='span'>Sign out</Text>
          </Flex>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
