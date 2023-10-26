'use client';

import * as React from 'react';
import { Text, Flex } from '@radix-ui/themes';
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeModeSelect() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Flex align='center'>
          <SwatchIcon className='mr-2 h-5 w-5' />
          <Text as='span'>Themes</Text>
        </Flex>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onSelect={() => {
              setTheme('light');
            }}
          >
            <Flex align='center'>
              <SunIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Light</Text>
            </Flex>
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setTheme('dark')}>
            <Flex align='center'>
              <MoonIcon className='mr-2 h-5 w-5' />
              <Text as='span'>Dark</Text>
            </Flex>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setTheme('system')}>
            <Flex align='center'>
              <ComputerDesktopIcon className='mr-2 h-5 w-5' />
              <Text as='span'>System</Text>
            </Flex>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
