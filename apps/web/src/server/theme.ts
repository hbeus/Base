import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

import { PALETTES, type ColorScheme, type Palette } from '@base/ui/tokens/themes.stylex';

function parsePalette(value: string | undefined): Palette {
  if (PALETTES.includes(value as Palette)) return value as Palette;
  return 'default';
}

function parseColorScheme(value: string | undefined): ColorScheme {
  if (value === 'dark' || value === 'light') return value;
  return 'dark';
}

export const getThemeFromCookie = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ colorScheme: ColorScheme; palette: Palette }> => {
    const raw = getCookie('theme');

    if (raw === 'dark' || raw === 'light') {
      return { colorScheme: raw, palette: 'default' };
    }

    if (raw?.includes('-')) {
      const [palette, scheme] = raw.split('-');
      return {
        palette: parsePalette(palette),
        colorScheme: parseColorScheme(scheme),
      };
    }

    return { colorScheme: 'dark', palette: 'default' };
  },
);
