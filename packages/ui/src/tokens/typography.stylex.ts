import * as stylex from '@stylexjs/stylex';

export const typography = stylex.defineVars({
  fontSans:
    "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontMono:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",

  // display — 31px
  displaySize: '1.9375rem',
  displayLineHeight: '2rem',
  displayLetterSpacing: '-0.078rem',

  // headline — 28px
  headlineSize: '1.75rem',
  headlineLineHeight: '2rem',
  headlineLetterSpacing: '-0.085rem',

  // title — 22px
  titleSize: '1.375rem',
  titleLineHeight: '1.5rem',
  titleLetterSpacing: '-0.031rem',

  // body-lg — 18px
  bodyLgSize: '1.125rem',
  bodyLgLineHeight: '1.5rem',
  bodyLgLetterSpacing: '-0.025rem',

  // body — 15px
  bodySize: '0.9375rem',
  bodyLineHeight: '1.5rem',
  bodyLetterSpacing: '-0.022rem',

  // body-sm — 14px
  bodySmSize: '0.875rem',
  bodySmLineHeight: '1.25rem',
  bodySmLetterSpacing: '-0.005rem',

  // label — 13px
  labelSize: '0.8125rem',
  labelLineHeight: '1.0625rem',
  labelLetterSpacing: '-0.009rem',

  // caption — 12px
  captionSize: '0.75rem',
  captionLineHeight: '1rem',
  captionLetterSpacing: '-0.009rem',

  // tiny — 11px
  tinySize: '0.6875rem',
  tinyLineHeight: '0.875rem',
  tinyLetterSpacing: '0',
});
