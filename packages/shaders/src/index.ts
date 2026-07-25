import { Aurora } from './presets/Aurora';
import { Root } from './Root';

export type { AuroraProps } from './presets/Aurora';
export type { RootProps } from './Root';
export type { FrameInfo, PointerState, PresetRegistration, UniformMap } from './types';
export { resolveColor } from './resolveColor';

export const Shader = {
  Root,
  Aurora,
};
