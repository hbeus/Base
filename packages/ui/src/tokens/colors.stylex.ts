import * as stylex from '@stylexjs/stylex';

export const themeBackground: Record<'dark' | 'light', string> = {
  dark: 'oklch(0.12 0 0)',
  light: 'oklch(0.98 0 0)',
};

export const colors = stylex.defineVars({
  background: themeBackground.dark,
  foregroundPrimary: 'oklch(1 0 0)',
  foregroundSecondary: 'oklch(1 0 0 / 0.6)',

  border: 'oklch(1 0 0 / 0.08)',

  accent: 'oklch(0.7 0.15 250)',
  accentForeground: 'oklch(1 0 0)',

  statePositive: 'oklch(0.879 0.227 133.1)',
  stateNegative: 'oklch(0.635 0.239 19.3)',

  surfaceRaised: 'oklch(0.16 0 0)',

  lighten4: 'oklch(1 0 0 / 0.04)',
  lighten6: 'oklch(1 0 0 / 0.06)',
  lighten8: 'oklch(1 0 0 / 0.08)',
  lighten12: 'oklch(1 0 0 / 0.12)',
  lighten16: 'oklch(1 0 0 / 0.16)',

  darken4: 'oklch(0 0 0 / 0.04)',
  darken6: 'oklch(0 0 0 / 0.06)',
  darken8: 'oklch(0 0 0 / 0.08)',
  darken12: 'oklch(0 0 0 / 0.12)',
  darken16: 'oklch(0 0 0 / 0.16)',

  hover4: 'oklch(0 0 0 / 0.04)',
  hover6: 'oklch(0 0 0 / 0.06)',
  hover8: 'oklch(0 0 0 / 0.08)',
  hover12: 'oklch(0 0 0 / 0.12)',
  hover16: 'oklch(0 0 0 / 0.16)',

  focusOutline: 'oklch(0.7 0.15 250)',
});

export const lightTheme = stylex.createTheme(colors, {
  background: themeBackground.light,
  foregroundPrimary: 'oklch(0.12 0 0)',
  foregroundSecondary: 'oklch(0.12 0 0 / 0.6)',

  border: 'oklch(0 0 0 / 0.08)',

  accent: 'oklch(0.5 0.2 250)',
  accentForeground: 'oklch(1 0 0)',

  statePositive: 'oklch(0.879 0.227 133.1)',
  stateNegative: 'oklch(0.635 0.239 19.3)',

  surfaceRaised: 'oklch(1 0 0)',

  lighten4: 'oklch(0 0 0 / 0.04)',
  lighten6: 'oklch(0 0 0 / 0.06)',
  lighten8: 'oklch(0 0 0 / 0.08)',
  lighten12: 'oklch(0 0 0 / 0.12)',
  lighten16: 'oklch(0 0 0 / 0.16)',

  darken4: 'oklch(1 0 0 / 0.04)',
  darken6: 'oklch(1 0 0 / 0.06)',
  darken8: 'oklch(1 0 0 / 0.08)',
  darken12: 'oklch(1 0 0 / 0.12)',
  darken16: 'oklch(1 0 0 / 0.16)',

  hover4: 'oklch(0 0 0 / 0.04)',
  hover6: 'oklch(0 0 0 / 0.06)',
  hover8: 'oklch(0 0 0 / 0.08)',
  hover12: 'oklch(0 0 0 / 0.12)',
  hover16: 'oklch(0 0 0 / 0.16)',

  focusOutline: 'oklch(0.5 0.2 250)',
});
