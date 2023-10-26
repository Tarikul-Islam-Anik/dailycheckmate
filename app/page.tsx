'use client';

import { useEffect, useCallback } from 'react';
import isHotkey from 'is-hotkey';
import { useTheme } from 'next-themes';
import Home from '@/app/components/home';

const HomePage = () => {
  const { setTheme } = useTheme();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    if (isHotkey('mod+l', event)) {
      setTheme('light');
    }
    if (isHotkey('mod+d', event)) {
      setTheme('dark');
    }
    if (isHotkey('mod+s', event)) {
      setTheme('system');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return <Home />;
};

export default HomePage;
