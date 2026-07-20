import * as stylex from '@stylexjs/stylex';
import { useContext } from 'react';

import { SurfaceContext } from '../contexts/SurfaceContext';
import { colors } from '../tokens/themes.stylex';

const surfaceBg = stylex.create({
  0: { backgroundColor: colors.surface0 },
  100: { backgroundColor: colors.surface100 },
  200: { backgroundColor: colors.surface200 },
  300: { backgroundColor: colors.surface300 },
  400: { backgroundColor: colors.surface400 },
  500: { backgroundColor: colors.surface500 },
});

export function useSurface() {
  const level = useContext(SurfaceContext);
  return surfaceBg[level];
}
