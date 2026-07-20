import * as stylex from '@stylexjs/stylex';

export type SurfaceLevel = 0 | 100 | 200 | 300 | 400 | 500;

export const SURFACE_LEVELS: readonly SurfaceLevel[] = [0, 100, 200, 300, 400, 500] as const;
export const SURFACE_STEP = 100;
export const SURFACE_MAX = 500;

export const surface = stylex.defineVars({
  bg0: 'oklch(0.12 0 0)',
  bg100: 'oklch(0.20 0 0)',
  bg200: 'oklch(0.26 0 0)',
  bg300: 'oklch(0.30 0 0)',
  bg400: 'oklch(0.33 0 0)',
  bg500: 'oklch(0.35 0 0)',
});

export const surfaceLight = stylex.createTheme(surface, {
  bg0: 'oklch(0.965 0 0)',
  bg100: 'oklch(0.977 0 0)',
  bg200: 'oklch(0.986 0 0)',
  bg300: 'oklch(0.993 0 0)',
  bg400: 'oklch(0.997 0 0)',
  bg500: 'oklch(0.999 0 0)',
});

export const surfaceBg = stylex.create({
  0: { backgroundColor: surface.bg0 },
  100: { backgroundColor: surface.bg100 },
  200: { backgroundColor: surface.bg200 },
  300: { backgroundColor: surface.bg300 },
  400: { backgroundColor: surface.bg400 },
  500: { backgroundColor: surface.bg500 },
});
