import { useContext } from 'react';

import { SurfaceContext } from '../contexts/SurfaceContext';
import { surfaceBg } from '../tokens/surface.stylex';

export function useSurface() {
  const level = useContext(SurfaceContext);
  return surfaceBg[level];
}
