import * as stylex from '@stylexjs/stylex';

// ——— Primitives ———

const WHITE = '1 0 0';
const BLACK = '0 0 0';

const BLUEBERRY_FG = '0.9911 0.01 275';
const BLUEBERRY_FG_ON_LIGHT = '0.2103 0.01 275';
const BLUEBERRY_ACCENT = '0.5774 0.2092 275';

const WARM_FG = '0.95 0.02 80';
const WARM_BG_DARK = '0.16 0.02 65';
const WARM_FG_ON_LIGHT = '0.2 0.02 60';

// ——— Theme structure ———

type ThemeMode = {
  foreground: {
    primary: string;
    primaryHover: string;
    primaryInverse: string;
    secondary: string;
    secondaryHover: string;
    secondaryInverse: string;
    disabled: string;
  };
  background: {
    base: string;
    lighten: string;
    darken: string;
    hover: string;
    surface: string;
  };
  state: {
    positive: string;
    semiNegative: string;
    negative: string;
    semiPositive: string;
    neutral: string;
    highlight: string;
  };
  highlight: {
    base: string;
    foreground: string;
  };
  shadow: {
    drop: string;
    inner: string;
  };
  border: string;
  button: {
    accentBg: string;
    accentFg: string;
    accentHover: string;
    primaryBg: string;
    primaryFg: string;
    primaryHover: string;
  };
};

type Schemes = {
  dark: ThemeMode;
  light: ThemeMode;
};

// ——— Theme definitions ———

export const THEME = {
  default: {
    dark: {
      foreground: {
        primary: '1 0 0',
        primaryHover: '1 0 0',
        primaryInverse: '0.12 0 0',
        secondary: '1 0 0',
        secondaryHover: '1 0 0',
        secondaryInverse: '0.12 0 0',
        disabled: '1 0 0',
      },
      background: {
        base: '0.12 0 0',
        lighten: '1 0 0',
        darken: '0 0 0',
        hover: '1 0 0',
        surface: '0 0',
      },
      state: {
        positive: '0.8 0.2 135',
        negative: '0.825 0.275 25',
        semiNegative: '0.8 0.18 50',
        semiPositive: '0.8 0.15 115',
        neutral: '0.8 0.125 85',
        highlight: '0.8 0.15 250',
      },
      highlight: {
        base: '0.7 0.15 250',
        foreground: WHITE,
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.02`,
      },
      border: `${WHITE} / 0.08`,
      button: {
        accentBg: WHITE,
        accentFg: '0.12 0 0',
        accentHover: '0.9 0 0',
        primaryBg: `${WHITE} / 0.08`,
        primaryFg: WHITE,
        primaryHover: `${WHITE} / 0.12`,
      },
    },
    light: {
      foreground: {
        primary: '0.12 0 0',
        primaryHover: '0.22 0 0',
        primaryInverse: WHITE,
        secondary: '0.12 0 0',
        secondaryHover: '0.12 0 0',
        secondaryInverse: WHITE,
        disabled: '0.12 0 0',
      },
      background: {
        base: '0.96 0 0',
        lighten: '1 0 0',
        darken: WHITE,
        hover: BLACK,
        surface: WHITE,
      },
      state: {
        positive: '0.65 0.5 125',
        negative: '0.635 0.2 40',
        semiNegative: '0.675 0.2 70',
        semiPositive: '0.65 1 118',
        neutral: '0.75 0.65 109',
        highlight: '0.7 0.15 240',
      },
      highlight: {
        base: '0.5 0.2 250',
        foreground: WHITE,
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.5`,
      },
      border: `${BLACK} / 0.08`,
      button: {
        accentBg: '0.12 0 0',
        accentFg: '0.98 0 0',
        accentHover: '0.22 0 0',
        primaryBg: `${BLACK} / 0.08`,
        primaryFg: '0.12 0 0',
        primaryHover: `${BLACK} / 0.12`,
      },
    },
  },

  blueberry: {
    dark: {
      foreground: {
        primary: '1 0.05 275',
        primaryHover: '1 0.05 275',
        primaryInverse: '0.12 0.01 275',
        secondary: '1 0.025 275',
        secondaryHover: BLUEBERRY_FG,
        secondaryInverse: BLUEBERRY_FG_ON_LIGHT,
        disabled: '1 0.05 275',
      },
      background: {
        base: '0.12 0.02 280',
        lighten: '1 0.02 275',
        darken: '0.05 0.02 275',
        hover: '1 0.05 275',
        surface: '0.2103 0.02 275',
      },
      state: {
        positive: '0.85 0.2 150.16',
        negative: '0.6 0.2 20',
      },
      highlight: {
        base: BLUEBERRY_ACCENT,
        foreground: WHITE,
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.02`,
      },
      border: '0.28 0.01 275',
      button: {
        accentBg: '0.55 0.2 275',
        accentFg: '0.9911 0 0',
        accentHover: '0.64 0.18 275',
        primaryBg: '0.5 0.075 280',
        primaryFg: '1 0.025 275',
        primaryHover: '0.5 0.075 280',
      },
    },
    light: {
      foreground: {
        primary: BLUEBERRY_FG_ON_LIGHT,
        primaryHover: '0.5517 0.02 275',
        primaryInverse: BLUEBERRY_FG,
        secondary: BLUEBERRY_FG_ON_LIGHT,
        secondaryHover: BLUEBERRY_FG_ON_LIGHT,
        secondaryInverse: BLUEBERRY_FG,
        disabled: BLUEBERRY_FG_ON_LIGHT,
      },
      background: {
        base: '0.9702 0.01 275',
        lighten: BLACK,
        darken: WHITE,
        hover: BLACK,
        surface: '1 0.005 275',
      },
      state: {
        positive: '0.532 0.1238 151.57',
        negative: '0.5884 0.1993 24.39',
      },
      highlight: {
        base: BLUEBERRY_ACCENT,
        foreground: '0.9911 0 0',
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.5`,
      },
      border: '0.90 0.01 275',
      button: {
        accentBg: BLUEBERRY_ACCENT,
        accentFg: '0.9911 0 0',
        accentHover: '0.49 0.18 275',
        primaryBg: '0.94 0.01 275',
        primaryFg: '0.2103 0.006 274',
        primaryHover: '0.846 0.009 275',
      },
    },
  },

  warm: {
    dark: {
      foreground: {
        primary: WARM_FG,
        primaryHover: '0.85 0.015 80',
        primaryInverse: WARM_BG_DARK,
        secondary: WARM_FG,
        secondaryHover: WARM_FG,
        secondaryInverse: WARM_BG_DARK,
        disabled: WARM_FG,
      },
      background: {
        base: WARM_BG_DARK,
        lighten: WHITE,
        darken: BLACK,
        hover: WHITE,
        surface: '0.21 0.02 65',
      },
      state: {
        positive: '0.879 0.227 133.1',
        negative: '0.635 0.239 19.3',
      },
      highlight: {
        base: '0.72 0.15 65',
        foreground: WHITE,
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.02`,
      },
      border: `${WARM_FG} / 0.08`,
      button: {
        accentBg: '0.72 0.15 65',
        accentFg: WARM_BG_DARK,
        accentHover: '0.762 0.128 65',
        primaryBg: `${WHITE} / 0.08`,
        primaryFg: WARM_FG,
        primaryHover: `${WHITE} / 0.12`,
      },
    },
    light: {
      foreground: {
        primary: WARM_FG_ON_LIGHT,
        primaryHover: '0.3 0.02 60',
        primaryInverse: WARM_FG,
        secondary: WARM_FG_ON_LIGHT,
        secondaryHover: WARM_FG_ON_LIGHT,
        secondaryInverse: WARM_FG,
        disabled: WARM_FG_ON_LIGHT,
      },
      background: {
        base: '0.96 0.03 80',
        lighten: BLACK,
        darken: WHITE,
        hover: BLACK,
        surface: '1 0.015 80',
      },
      state: {
        positive: '0.879 0.227 133.1',
        negative: '0.635 0.239 19.3',
      },
      highlight: {
        base: '0.6 0.18 55',
        foreground: WHITE,
      },
      shadow: {
        drop: BLACK,
        inner: `${WHITE} / 0.5`,
      },
      border: `${WARM_FG_ON_LIGHT} / 0.08`,
      button: {
        accentBg: '0.6 0.18 55',
        accentFg: WHITE,
        accentHover: '0.51 0.153 55',
        primaryBg: `${BLACK} / 0.08`,
        primaryFg: WARM_FG_ON_LIGHT,
        primaryHover: `${BLACK} / 0.12`,
      },
    },
  },
} as const satisfies Record<string, Schemes>;

// ——— Derived types ———

export type Palette = keyof typeof THEME;
export type ColorScheme = keyof Schemes;
export type ThemeKey = `${Palette}-${ColorScheme}`;

export const PALETTES = Object.keys(THEME) as Palette[];
export const COLOR_SCHEMES = Object.keys(THEME[PALETTES[0]]) as ColorScheme[];

// ——— StyleX tokens ———
// THEME stores raw oklch values. Opacities for derivative tokens
// (secondary, disabled, lighten/darken/hover ramps) are applied here.

const defaultDarkMode = THEME.default.dark;

export const colors = stylex.defineVars({
  background: `oklch(${defaultDarkMode.background.base})`,
  surfaceRaised: `oklch(50 ${defaultDarkMode.background.surface})`,

  lighten4: `oklch(${defaultDarkMode.background.lighten} / 0.04)`,
  lighten6: `oklch(${defaultDarkMode.background.lighten} / 0.06)`,
  lighten8: `oklch(${defaultDarkMode.background.lighten} / 0.08)`,
  lighten12: `oklch(${defaultDarkMode.background.lighten} / 0.12)`,
  lighten16: `oklch(${defaultDarkMode.background.lighten} / 0.16)`,
  lighten50: `oklch(${defaultDarkMode.background.lighten} / 0.5)`,

  darken4: `oklch(${defaultDarkMode.background.darken} / 0.04)`,
  darken6: `oklch(${defaultDarkMode.background.darken} / 0.06)`,
  darken8: `oklch(${defaultDarkMode.background.darken} / 0.08)`,
  darken12: `oklch(${defaultDarkMode.background.darken} / 0.12)`,
  darken16: `oklch(${defaultDarkMode.background.darken} / 0.16)`,
  darken50: `oklch(${defaultDarkMode.background.darken} / 0.5)`,

  hover4: `oklch(${defaultDarkMode.background.hover} / 0.04)`,
  hover6: `oklch(${defaultDarkMode.background.hover} / 0.06)`,
  hover8: `oklch(${defaultDarkMode.background.hover} / 0.08)`,
  hover12: `oklch(${defaultDarkMode.background.hover} / 0.12)`,
  hover16: `oklch(${defaultDarkMode.background.hover} / 0.16)`,

  foregroundPrimary: `oklch(${defaultDarkMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${defaultDarkMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${defaultDarkMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${defaultDarkMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${defaultDarkMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${defaultDarkMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${defaultDarkMode.foreground.disabled} / 0.3)`,

  border: `oklch(${defaultDarkMode.border})`,
  focusOutline: `oklch(${defaultDarkMode.highlight.base})`,

  highlight: `oklch(${defaultDarkMode.highlight.base})`,
  highlightForeground: `oklch(${defaultDarkMode.highlight.foreground})`,

  statePositive: `oklch(${defaultDarkMode.state.positive})`,
  stateNegative: `oklch(${defaultDarkMode.state.negative})`,
  stateSemiNegative: `oklch(${defaultDarkMode.state.semiNegative})`,
  stateSemiPositive: `oklch(${defaultDarkMode.state.semiPositive})`,
  stateNeutral: `oklch(${defaultDarkMode.state.neutral})`,
  stateHighlight: `oklch(${defaultDarkMode.state.highlight})`,

  buttonAccentBg: `oklch(${defaultDarkMode.button.accentBg})`,
  buttonAccentFg: `oklch(${defaultDarkMode.button.accentFg})`,
  buttonAccentHover: `oklch(${defaultDarkMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${defaultDarkMode.button.primaryBg})`,
  buttonPrimaryFg: `oklch(${defaultDarkMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${defaultDarkMode.button.primaryHover})`,

  shadowElevated: `0 0 0 1px oklch(${defaultDarkMode.shadow.drop} / 0.04), 0 2px 8px oklch(${defaultDarkMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${defaultDarkMode.shadow.drop} / 0.08), 0 4px 10px oklch(${defaultDarkMode.shadow.drop} / 0.02), 0 4px 24px oklch(${defaultDarkMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${defaultDarkMode.shadow.inner})`,
});

// ——— default light ———

const defaultLightMode = THEME.default.light;

export const defaultLight = stylex.createTheme(colors, {
  background: `oklch(${defaultLightMode.background.base})`,
  surfaceRaised: `oklch(${defaultLightMode.background.surface})`,

  lighten4: `oklch(${defaultLightMode.background.lighten} / 0.5)`,
  lighten6: `oklch(${defaultLightMode.background.lighten} / 0.75)`,
  lighten8: `oklch(${defaultLightMode.background.lighten} / 0.9)`,
  lighten12: `oklch(${defaultLightMode.background.lighten} / 0.95)`,
  lighten16: `oklch(${defaultLightMode.background.lighten} / 0.98)`,
  lighten50: `oklch(${defaultLightMode.background.lighten} / 0.99)`,

  darken4: `oklch(${defaultLightMode.background.darken} / 0.04)`,
  darken6: `oklch(${defaultLightMode.background.darken} / 0.06)`,
  darken8: `oklch(${defaultLightMode.background.darken} / 0.08)`,
  darken12: `oklch(${defaultLightMode.background.darken} / 0.12)`,
  darken16: `oklch(${defaultLightMode.background.darken} / 0.16)`,
  darken50: `oklch(${defaultLightMode.background.darken} / 0.5)`,

  hover4: `oklch(${defaultLightMode.background.hover} / 0.04)`,
  hover6: `oklch(${defaultLightMode.background.hover} / 0.06)`,
  hover8: `oklch(${defaultLightMode.background.hover} / 0.08)`,
  hover12: `oklch(${defaultLightMode.background.hover} / 0.12)`,
  hover16: `oklch(${defaultLightMode.background.hover} / 0.16)`,

  foregroundPrimary: `oklch(${defaultLightMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${defaultLightMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${defaultLightMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${defaultLightMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${defaultLightMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${defaultLightMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${defaultLightMode.foreground.disabled} / 0.3)`,

  border: `oklch(${defaultLightMode.border})`,
  focusOutline: `oklch(${defaultLightMode.highlight.base})`,

  highlight: `oklch(${defaultLightMode.highlight.base})`,
  highlightForeground: `oklch(${defaultLightMode.highlight.foreground})`,

  statePositive: `oklch(${defaultLightMode.state.positive})`,
  stateNegative: `oklch(${defaultLightMode.state.negative})`,
  stateSemiNegative: `oklch(${defaultLightMode.state.semiNegative})`,
  stateSemiPositive: `oklch(${defaultLightMode.state.semiPositive})`,
  stateNeutral: `oklch(${defaultLightMode.state.neutral})`,
  stateHighlight: `oklch(${defaultLightMode.state.highlight})`,

  buttonAccentBg: `oklch(${defaultLightMode.button.accentBg})`,
  buttonAccentFg: `oklch(${defaultLightMode.button.accentFg})`,
  buttonAccentHover: `oklch(${defaultLightMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${defaultLightMode.button.primaryBg})`,
  buttonPrimaryFg: `oklch(${defaultLightMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${defaultLightMode.button.primaryHover})`,

  shadowElevated: `0 0 0 1px oklch(${defaultLightMode.shadow.drop} / 0.04), 0 2px 8px oklch(${defaultLightMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${defaultLightMode.shadow.drop} / 0.08), 0 4px 10px oklch(${defaultLightMode.shadow.drop} / 0.02), 0 4px 24px oklch(${defaultLightMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${defaultLightMode.shadow.inner})`,
});

// ——— blueberry dark ———

const blueberryDarkMode = THEME.blueberry.dark;

export const blueberryDark = stylex.createTheme(colors, {
  foregroundPrimary: `oklch(${blueberryDarkMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${blueberryDarkMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${blueberryDarkMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${blueberryDarkMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${blueberryDarkMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${blueberryDarkMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${blueberryDarkMode.foreground.disabled} / 0.3)`,

  background: `oklch(${blueberryDarkMode.background.base})`,
  highlight: `oklch(${blueberryDarkMode.highlight.base})`,
  highlightForeground: `oklch(${blueberryDarkMode.highlight.foreground})`,

  statePositive: `oklch(${blueberryDarkMode.state.positive})`,
  stateNegative: `oklch(${blueberryDarkMode.state.negative})`,
  surfaceRaised: `oklch(${blueberryDarkMode.background.surface})`,

  lighten4: `oklch(${blueberryDarkMode.background.lighten} / 0.04)`,
  lighten6: `oklch(${blueberryDarkMode.background.lighten} / 0.06)`,
  lighten8: `oklch(${blueberryDarkMode.background.lighten} / 0.08)`,
  lighten12: `oklch(${blueberryDarkMode.background.lighten} / 0.12)`,
  lighten16: `oklch(${blueberryDarkMode.background.lighten} / 0.16)`,
  lighten50: `oklch(${blueberryDarkMode.background.lighten} / 0.5)`,

  darken4: `oklch(${blueberryDarkMode.background.darken} / 0.04)`,
  darken6: `oklch(${blueberryDarkMode.background.darken} / 0.06)`,
  darken8: `oklch(${blueberryDarkMode.background.darken} / 0.08)`,
  darken12: `oklch(${blueberryDarkMode.background.darken} / 0.12)`,
  darken16: `oklch(${blueberryDarkMode.background.darken} / 0.16)`,
  darken50: `oklch(${blueberryDarkMode.background.darken} / 0.5)`,

  hover4: `oklch(${blueberryDarkMode.background.hover} / 0.04)`,
  hover6: `oklch(${blueberryDarkMode.background.hover} / 0.06)`,
  hover8: `oklch(${blueberryDarkMode.background.hover} / 0.08)`,
  hover12: `oklch(${blueberryDarkMode.background.hover} / 0.12)`,
  hover16: `oklch(${blueberryDarkMode.background.hover} / 0.16)`,

  border: `oklch(${blueberryDarkMode.border})`,
  focusOutline: `oklch(${blueberryDarkMode.highlight.base})`,

  buttonAccentBg: `oklch(${blueberryDarkMode.button.accentBg})`,
  buttonAccentFg: `oklch(${blueberryDarkMode.button.accentFg})`,
  buttonAccentHover: `oklch(${blueberryDarkMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${blueberryDarkMode.button.primaryBg} / 0.25)`,
  buttonPrimaryFg: `oklch(${blueberryDarkMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${blueberryDarkMode.button.primaryHover} / 0.3)`,

  shadowElevated: `0 0 0 1px oklch(${blueberryDarkMode.shadow.drop} / 0.04), 0 2px 8px oklch(${blueberryDarkMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${blueberryDarkMode.shadow.drop} / 0.08), 0 4px 10px oklch(${blueberryDarkMode.shadow.drop} / 0.02), 0 4px 24px oklch(${blueberryDarkMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${blueberryDarkMode.shadow.inner})`,
});

// ——— blueberry light ———

const blueberryLightMode = THEME.blueberry.light;

export const blueberryLight = stylex.createTheme(colors, {
  background: `oklch(${blueberryLightMode.background.base})`,
  foregroundPrimary: `oklch(${blueberryLightMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${blueberryLightMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${blueberryLightMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${blueberryLightMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${blueberryLightMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${blueberryLightMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${blueberryLightMode.foreground.disabled} / 0.3)`,
  border: `oklch(${blueberryLightMode.border})`,
  highlight: `oklch(${blueberryLightMode.highlight.base})`,
  highlightForeground: `oklch(${blueberryLightMode.highlight.foreground})`,
  statePositive: `oklch(${blueberryLightMode.state.positive})`,
  stateNegative: `oklch(${blueberryLightMode.state.negative})`,
  surfaceRaised: `oklch(${blueberryLightMode.background.surface})`,
  lighten4: `oklch(${blueberryLightMode.background.lighten} / 0.04)`,
  lighten6: `oklch(${blueberryLightMode.background.lighten} / 0.06)`,
  lighten8: `oklch(${blueberryLightMode.background.lighten} / 0.08)`,
  lighten12: `oklch(${blueberryLightMode.background.lighten} / 0.12)`,
  lighten16: `oklch(${blueberryLightMode.background.lighten} / 0.16)`,
  lighten50: `oklch(${blueberryLightMode.background.lighten} / 0.5)`,
  darken4: `oklch(${blueberryLightMode.background.darken} / 0.04)`,
  darken6: `oklch(${blueberryLightMode.background.darken} / 0.06)`,
  darken8: `oklch(${blueberryLightMode.background.darken} / 0.08)`,
  darken12: `oklch(${blueberryLightMode.background.darken} / 0.12)`,
  darken16: `oklch(${blueberryLightMode.background.darken} / 0.16)`,
  darken50: `oklch(${blueberryLightMode.background.darken} / 0.5)`,
  hover4: `oklch(${blueberryLightMode.background.hover} / 0.04)`,
  hover6: `oklch(${blueberryLightMode.background.hover} / 0.06)`,
  hover8: `oklch(${blueberryLightMode.background.hover} / 0.08)`,
  hover12: `oklch(${blueberryLightMode.background.hover} / 0.12)`,
  hover16: `oklch(${blueberryLightMode.background.hover} / 0.16)`,
  focusOutline: `oklch(${blueberryLightMode.highlight.base})`,
  buttonAccentBg: `oklch(${blueberryLightMode.button.accentBg})`,
  buttonAccentFg: `oklch(${blueberryLightMode.button.accentFg})`,
  buttonAccentHover: `oklch(${blueberryLightMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${blueberryLightMode.button.primaryBg})`,
  buttonPrimaryFg: `oklch(${blueberryLightMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${blueberryLightMode.button.primaryHover})`,

  shadowElevated: `0 0 0 1px oklch(${blueberryLightMode.shadow.drop} / 0.04), 0 2px 8px oklch(${blueberryLightMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${blueberryLightMode.shadow.drop} / 0.08), 0 4px 10px oklch(${blueberryLightMode.shadow.drop} / 0.02), 0 4px 24px oklch(${blueberryLightMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${blueberryLightMode.shadow.inner})`,
});

// ——— warm dark ———

const warmDarkMode = THEME.warm.dark;

export const warmDark = stylex.createTheme(colors, {
  background: `oklch(${warmDarkMode.background.base})`,
  foregroundPrimary: `oklch(${warmDarkMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${warmDarkMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${warmDarkMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${warmDarkMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${warmDarkMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${warmDarkMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${warmDarkMode.foreground.disabled} / 0.3)`,
  border: `oklch(${warmDarkMode.border})`,
  highlight: `oklch(${warmDarkMode.highlight.base})`,
  highlightForeground: `oklch(${warmDarkMode.highlight.foreground})`,
  statePositive: `oklch(${warmDarkMode.state.positive})`,
  stateNegative: `oklch(${warmDarkMode.state.negative})`,
  surfaceRaised: `oklch(${warmDarkMode.background.surface})`,
  lighten4: `oklch(${warmDarkMode.background.lighten} / 0.04)`,
  lighten6: `oklch(${warmDarkMode.background.lighten} / 0.06)`,
  lighten8: `oklch(${warmDarkMode.background.lighten} / 0.08)`,
  lighten12: `oklch(${warmDarkMode.background.lighten} / 0.12)`,
  lighten16: `oklch(${warmDarkMode.background.lighten} / 0.16)`,
  lighten50: `oklch(${warmDarkMode.background.lighten} / 0.5)`,
  darken4: `oklch(${warmDarkMode.background.darken} / 0.04)`,
  darken6: `oklch(${warmDarkMode.background.darken} / 0.06)`,
  darken8: `oklch(${warmDarkMode.background.darken} / 0.08)`,
  darken12: `oklch(${warmDarkMode.background.darken} / 0.12)`,
  darken16: `oklch(${warmDarkMode.background.darken} / 0.16)`,
  darken50: `oklch(${warmDarkMode.background.darken} / 0.5)`,
  hover4: `oklch(${warmDarkMode.background.hover} / 0.04)`,
  hover6: `oklch(${warmDarkMode.background.hover} / 0.06)`,
  hover8: `oklch(${warmDarkMode.background.hover} / 0.08)`,
  hover12: `oklch(${warmDarkMode.background.hover} / 0.12)`,
  hover16: `oklch(${warmDarkMode.background.hover} / 0.16)`,
  focusOutline: `oklch(${warmDarkMode.highlight.base})`,
  buttonAccentBg: `oklch(${warmDarkMode.button.accentBg})`,
  buttonAccentFg: `oklch(${warmDarkMode.button.accentFg})`,
  buttonAccentHover: `oklch(${warmDarkMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${warmDarkMode.button.primaryBg})`,
  buttonPrimaryFg: `oklch(${warmDarkMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${warmDarkMode.button.primaryHover})`,

  shadowElevated: `0 0 0 1px oklch(${warmDarkMode.shadow.drop} / 0.04), 0 2px 8px oklch(${warmDarkMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${warmDarkMode.shadow.drop} / 0.08), 0 4px 10px oklch(${warmDarkMode.shadow.drop} / 0.02), 0 4px 24px oklch(${warmDarkMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${warmDarkMode.shadow.inner})`,
});

// ——— warm light ———

const warmLightMode = THEME.warm.light;

export const warmLight = stylex.createTheme(colors, {
  background: `oklch(${warmLightMode.background.base})`,
  foregroundPrimary: `oklch(${warmLightMode.foreground.primary})`,
  foregroundPrimaryHover: `oklch(${warmLightMode.foreground.primaryHover})`,
  foregroundPrimaryInverse: `oklch(${warmLightMode.foreground.primaryInverse})`,
  foregroundSecondary: `oklch(${warmLightMode.foreground.secondary} / 0.6)`,
  foregroundSecondaryHover: `oklch(${warmLightMode.foreground.secondaryHover} / 0.7)`,
  foregroundSecondaryInverse: `oklch(${warmLightMode.foreground.secondaryInverse} / 0.6)`,
  foregroundDisabled: `oklch(${warmLightMode.foreground.disabled} / 0.3)`,
  border: `oklch(${warmLightMode.border})`,
  highlight: `oklch(${warmLightMode.highlight.base})`,
  highlightForeground: `oklch(${warmLightMode.highlight.foreground})`,
  statePositive: `oklch(${warmLightMode.state.positive})`,
  stateNegative: `oklch(${warmLightMode.state.negative})`,
  surfaceRaised: `oklch(${warmLightMode.background.surface})`,
  lighten4: `oklch(${warmLightMode.background.lighten} / 0.04)`,
  lighten6: `oklch(${warmLightMode.background.lighten} / 0.06)`,
  lighten8: `oklch(${warmLightMode.background.lighten} / 0.08)`,
  lighten12: `oklch(${warmLightMode.background.lighten} / 0.12)`,
  lighten16: `oklch(${warmLightMode.background.lighten} / 0.16)`,
  lighten50: `oklch(${warmLightMode.background.lighten} / 0.5)`,
  darken4: `oklch(${warmLightMode.background.darken} / 0.04)`,
  darken6: `oklch(${warmLightMode.background.darken} / 0.06)`,
  darken8: `oklch(${warmLightMode.background.darken} / 0.08)`,
  darken12: `oklch(${warmLightMode.background.darken} / 0.12)`,
  darken16: `oklch(${warmLightMode.background.darken} / 0.16)`,
  darken50: `oklch(${warmLightMode.background.darken} / 0.5)`,
  hover4: `oklch(${warmLightMode.background.hover} / 0.04)`,
  hover6: `oklch(${warmLightMode.background.hover} / 0.06)`,
  hover8: `oklch(${warmLightMode.background.hover} / 0.08)`,
  hover12: `oklch(${warmLightMode.background.hover} / 0.12)`,
  hover16: `oklch(${warmLightMode.background.hover} / 0.16)`,
  focusOutline: `oklch(${warmLightMode.highlight.base})`,
  buttonAccentBg: `oklch(${warmLightMode.button.accentBg})`,
  buttonAccentFg: `oklch(${warmLightMode.button.accentFg})`,
  buttonAccentHover: `oklch(${warmLightMode.button.accentHover})`,
  buttonPrimaryBg: `oklch(${warmLightMode.button.primaryBg})`,
  buttonPrimaryFg: `oklch(${warmLightMode.button.primaryFg})`,
  buttonPrimaryHover: `oklch(${warmLightMode.button.primaryHover})`,

  shadowElevated: `0 0 0 1px oklch(${warmLightMode.shadow.drop} / 0.04), 0 2px 8px oklch(${warmLightMode.shadow.drop} / 0.01), 0 2px 6px -4px oklch(${warmLightMode.shadow.drop} / 0.08), 0 4px 10px oklch(${warmLightMode.shadow.drop} / 0.02), 0 4px 24px oklch(${warmLightMode.shadow.drop} / 0.02)`,
  shadowElevatedInner: `inset 0 0 0 1px oklch(${warmLightMode.shadow.inner})`,
});

// ——— Theme switching ———

export const themeMap: Record<ThemeKey, typeof defaultLight | null> = {
  'default-dark': null,
  'default-light': defaultLight,
  'blueberry-dark': blueberryDark,
  'blueberry-light': blueberryLight,
  'warm-dark': warmDark,
  'warm-light': warmLight,
};

export const themeBackgrounds: Record<ThemeKey, string> = {
  'default-dark': `oklch(${THEME.default.dark.background.base})`,
  'default-light': `oklch(${THEME.default.light.background.base})`,
  'blueberry-dark': `oklch(${THEME.blueberry.dark.background.base})`,
  'blueberry-light': `oklch(${THEME.blueberry.light.background.base})`,
  'warm-dark': `oklch(${THEME.warm.dark.background.base})`,
  'warm-light': `oklch(${THEME.warm.light.background.base})`,
};
