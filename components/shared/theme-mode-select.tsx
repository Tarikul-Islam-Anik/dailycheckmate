"use client";

import * as React from "react";
import { Text, Flex } from "@radix-ui/themes";
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeModeSelect() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Flex align="center">
          <SwatchIcon className="w-5 h-5 mr-2" />
          <Text as="span">Themes</Text>
        </Flex>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Flex align="center">
              <SunIcon className="w-5 h-5 mr-2" />
              <Text as="span">Light</Text>
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Flex align="center">
              <MoonIcon className="w-5 h-5 mr-2" />
              <Text as="span">Dark</Text>
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Flex align="center">
              <ComputerDesktopIcon className="w-5 h-5 mr-2" />
              <Text as="span">System</Text>
            </Flex>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
