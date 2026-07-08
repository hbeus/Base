import * as stylex from '@stylexjs/stylex';

export const typography = stylex.defineVars({
  fontSans:
    "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontMono:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",

  // hero — 32px
  heroSize: '2rem',
  heroLineHeight: '1.2',
  heroLetterSpacing: '-0.08rem',

  // display — 28px
  displaySize: '1.75rem',
  displayLineHeight: '1.2',
  displayLetterSpacing: '-0.085rem',

  // headline — 22px
  headlineSize: '1.375rem',
  headlineLineHeight: '1.2',
  headlineLetterSpacing: '-0.031rem',

  // title — 18px
  titleSize: '1.125rem',
  titleLineHeight: '1.4',
  titleLetterSpacing: '-0.025rem',

  // body — 15px
  bodySize: '0.9375rem',
  bodyLineHeight: '1.4',
  bodyLetterSpacing: '-0.022rem',

  // body-sm — 13px
  bodySmSize: '0.8125rem',
  bodySmLineHeight: '1.4',
  bodySmLetterSpacing: '-0.006rem',

  // label — 12px
  labelSize: '0.75rem',
  labelLineHeight: '1.4',
  labelLetterSpacing: '-0.009rem',

  // caption — 11px
  captionSize: '0.6875rem',
  captionLineHeight: '1.4',
  captionLetterSpacing: '0',
});
