import { type ReactNode, useContext } from 'react';

import { SurfaceContext } from '../../../contexts/SurfaceContext';
import {
  SURFACE_MAX,
  SURFACE_STEP,
  type SurfaceLevel as SurfaceLevelType,
} from '../../../tokens/surface.stylex';

export interface SurfaceLevelProps {
  level?: SurfaceLevelType;
  children: ReactNode;
}

export function SurfaceLevel({ level, children }: SurfaceLevelProps) {
  const parentLevel = useContext(SurfaceContext);

  const resolvedLevel: SurfaceLevelType =
    level !== undefined
      ? level
      : (Math.min(parentLevel + SURFACE_STEP, SURFACE_MAX) as SurfaceLevelType);

  return <SurfaceContext value={resolvedLevel}>{children}</SurfaceContext>;
}
