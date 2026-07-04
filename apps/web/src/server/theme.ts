import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export type Theme = 'light' | 'dark';

export const getThemeFromCookie = createServerFn({ method: 'GET' }).handler(async (): Promise<Theme> => {
  const value = getCookie('theme');
  return value === 'light' ? 'light' : 'dark';
});
