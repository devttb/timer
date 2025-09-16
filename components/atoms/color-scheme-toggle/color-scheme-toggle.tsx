'use client';

import { useMemo } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = useMemo(() => colorScheme === 'dark', [colorScheme]);

  return (
    <ActionIcon onClick={toggleColorScheme} variant={'transparent'}>
      {isDarkMode ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  );
}
