import { Aurora } from './presets/Aurora';
import { Grain } from './presets/Grain';
import { Hex } from './presets/Hex';
import { Ripple } from './presets/Ripple';
import { Warp } from './presets/Warp';
import { Root } from './Root';

export type { AuroraProps } from './presets/Aurora';
export type { GrainProps } from './presets/Grain';
export type { HexProps } from './presets/Hex';
export type { RippleProps } from './presets/Ripple';
export type { WarpProps } from './presets/Warp';
export type { RootProps } from './Root';
export type { FrameInfo, PointerState, PresetRegistration, UniformMap } from './types';
export { resolveColor } from './resolveColor';

export const Shader = {
  Root,
  Aurora,
  Warp,
  Grain,
  Hex,
  Ripple,
};
