// ——— Types ———

export type ThemeConfig = {
  brandHue: number | null;
  neutralTint: number;
  stateHarmony: number;
};

export type ThemeMode = {
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
    surface0: string;
    surface100: string;
    surface200: string;
    surface300: string;
    surface400: string;
    surface500: string;
  };
  state: {
    positive: string;
    semiPositive: string;
    neutral: string;
    semiNegative: string;
    negative: string;
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

export type Schemes = { dark: ThemeMode; light: ThemeMode };

type ModeValues = { lightness: number; vividness: number };
type LightnessValue = { lightness: number };

type StateKey = keyof ThemeMode['state'];

export type StateEntry = {
  hue: number;
  dark: ModeValues;
  light: ModeValues;
};

export type ColorEntry = {
  dark: ModeValues;
  light: ModeValues;
};

// ——— State colors (relative chroma) ———

export const STATE_CONFIG: Record<StateKey, StateEntry> = {
  positive: {
    hue: 145,
    dark: { lightness: 0.675, vividness: 0.85 },
    light: { lightness: 0.58, vividness: 0.9 },
  },
  semiPositive: {
    hue: 120,
    dark: { lightness: 0.71, vividness: 0.95 },
    light: { lightness: 0.6, vividness: 1.0 },
  },
  neutral: {
    hue: 90,
    dark: { lightness: 0.72, vividness: 1.0 },
    light: { lightness: 0.6, vividness: 1.0 },
  },
  semiNegative: {
    hue: 55,
    dark: { lightness: 0.7, vividness: 0.85 },
    light: { lightness: 0.58, vividness: 0.95 },
  },
  negative: {
    hue: 25,
    dark: { lightness: 0.605, vividness: 0.85 },
    light: { lightness: 0.5, vividness: 0.9 },
  },
  highlight: {
    hue: 240,
    dark: { lightness: 0.675, vividness: 0.85 },
    light: { lightness: 0.58, vividness: 0.9 },
  },
};

// ——— Highlight / focus ring (relative chroma, uses brandHue) ———

export const HIGHLIGHT_CONFIG: ColorEntry = {
  dark: { lightness: 0.65, vividness: 0.85 },
  light: { lightness: 0.5, vividness: 0.85 },
};

// ——— Accent button (relative chroma, uses brandHue) ———

export const ACCENT_CONFIG = {
  bg: { dark: { lightness: 0.58, vividness: 0.85 }, light: { lightness: 0.55, vividness: 0.85 } },
  hover: { dark: { lightness: 0.66, vividness: 0.7 }, light: { lightness: 0.48, vividness: 0.7 } },
  fg: { lightness: 0.985 },
  achromaticBg: { dark: { lightness: 1.0 }, light: { lightness: 0.16 } },
  achromaticHover: { dark: { lightness: 0.9 }, light: { lightness: 0.26 } },
} as const;

// ——— Primary button (semi-transparent overlay) ———

export const PRIMARY_BUTTON_CONFIG = {
  color: { lightness: 0.5, vividness: 0.4 },
  opacity: { dark: { bg: 0.2, hover: 0.28 }, light: { bg: 0.1, hover: 0.15 } },
  achromaticOpacity: { bg: 0.08, hover: 0.12 },
} as const;

// ——— Foreground (uses neutralTint for chroma, not vividness) ———

export const FOREGROUND_CONFIG = {
  primary: { dark: { lightness: 0.985 }, light: { lightness: 0.16 } },
  hover: { dark: { lightness: 1.0 }, light: { lightness: 0.1 } },
  inverse: { dark: { lightness: 0.12 }, light: { lightness: 0.985 } },
} satisfies Record<string, { dark: LightnessValue; light: LightnessValue }>;

// ——— Background (uses neutralTint for chroma, not vividness) ———

export const BACKGROUND_CONFIG = {
  base: { dark: { lightness: 0.12 }, light: { lightness: 0.965 } },
  surface0: { dark: { lightness: 0.12 }, light: { lightness: 0.965 } },
  surface100: { dark: { lightness: 0.2 }, light: { lightness: 0.977 } },
  surface200: { dark: { lightness: 0.26 }, light: { lightness: 0.986 } },
  surface300: { dark: { lightness: 0.3 }, light: { lightness: 0.993 } },
  surface400: { dark: { lightness: 0.33 }, light: { lightness: 0.997 } },
  surface500: { dark: { lightness: 0.35 }, light: { lightness: 0.999 } },
} satisfies Record<string, { dark: LightnessValue; light: LightnessValue }>;

// ——— Opacity values ———

export const OPACITY_CONFIG = {
  foregroundSecondary: 0.6,
  foregroundSecondaryHover: 0.7,
  foregroundDisabled: 0.3,
  border: 0.08,
  shadowInner: { dark: 0.02, light: 0.5 },
  shadowElevated: { ring: 0.04, ambient1: 0.01, key: 0.08, ambient2: 0.02, spread: 0.02 },
} as const;

// ——— Theme configurations ———

export const CONFIGS = {
  default: { brandHue: null, neutralTint: 0, stateHarmony: 0 },
  blueberry: { brandHue: 275, neutralTint: 0.015, stateHarmony: 0.15 },
  warm: { brandHue: 65, neutralTint: 0.02, stateHarmony: 0.12 },
} as const satisfies Record<string, ThemeConfig>;
