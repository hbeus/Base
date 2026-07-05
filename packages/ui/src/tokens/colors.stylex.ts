import * as stylex from '@stylexjs/stylex';

export const themeBackground: Record<'dark' | 'light', string> = {
  dark: 'oklch(0.12 0 0)',
  light: 'oklch(0.98 0 0)',
};

export const colors = stylex.defineVars({
  background: 'light-dark(oklch(0.98 0 0), oklch(0.12 0 0))',
  foregroundPrimary: 'light-dark(oklch(0.12 0 0), oklch(1 0 0))',
  foregroundSecondary: 'light-dark(oklch(0.12 0 0 / 0.6), oklch(1 0 0 / 0.6))',

  border: 'light-dark(oklch(0 0 0 / 0.08), oklch(1 0 0 / 0.08))',

  accent: 'light-dark(oklch(0.5 0.2 250), oklch(0.7 0.15 250))',
  accentForeground: 'oklch(1 0 0)',

  positive: 'oklch(0.879 0.227 133.1)',
  negative: 'oklch(0.635 0.239 19.3)',

  surfaceRaised: 'light-dark(oklch(1 0 0), oklch(0.16 0 0))',

  lighten4: 'light-dark(oklch(0 0 0 / 0.04), oklch(1 0 0 / 0.04))',
  lighten8: 'light-dark(oklch(0 0 0 / 0.08), oklch(1 0 0 / 0.08))',
  lighten12: 'light-dark(oklch(0 0 0 / 0.12), oklch(1 0 0 / 0.12))',
  lighten16: 'light-dark(oklch(0 0 0 / 0.16), oklch(1 0 0 / 0.16))',
  lighten50: 'light-dark(oklch(0 0 0 / 0.50), oklch(1 0 0 / 0.50))',

  darken4: 'light-dark(oklch(1 0 0 / 0.04), oklch(0 0 0 / 0.04))',
  darken8: 'light-dark(oklch(1 0 0 / 0.08), oklch(0 0 0 / 0.08))',
  darken12: 'light-dark(oklch(1 0 0 / 0.12), oklch(0 0 0 / 0.12))',
  darken16: 'light-dark(oklch(1 0 0 / 0.16), oklch(0 0 0 / 0.16))',
  darken50: 'light-dark(oklch(1 0 0 / 0.50), oklch(0 0 0 / 0.50))',
});
