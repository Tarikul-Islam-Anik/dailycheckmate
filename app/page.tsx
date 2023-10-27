'use client';

import { useEffect, useCallback } from 'react';
import isHotkey from 'is-hotkey';
import { useTheme } from 'next-themes';
import Home from '@/app/components/home';

const HomePage = () => {
  const { setTheme } = useTheme();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isHotkey('mod+l', event)) {
      event.preventDefault();
      setTheme('light');
    }
    if (isHotkey('mod+d', event)) {
      event.preventDefault();
      setTheme('dark');
    }
    if (isHotkey('mod+s', event)) {
      event.preventDefault();

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
