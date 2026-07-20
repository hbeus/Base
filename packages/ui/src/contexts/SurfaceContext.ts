import { createContext } from 'react';

import type { SurfaceLevel } from '../tokens/surface.stylex';

export const SurfaceContext = createContext<SurfaceLevel>(0);
