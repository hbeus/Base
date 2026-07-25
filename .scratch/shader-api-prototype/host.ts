import type { FrameInfo, HostPhase, PresetRegistration, UniformMap } from './api/types';

export type HostState = {
  phase: HostPhase;
  preset: PresetRegistration | null;
  uniforms: UniformMap;
  framesRendered: number;
  warnings: string[];
};

export type HostAction =
  | { type: 'register'; preset: PresetRegistration }
  | { type: 'unregister'; id: string }
  | { type: 'tick'; frame: FrameInfo }
  | { type: 'rebuild-program' };

export function createHostState(): HostState {
  return {
    phase: 'fallback',
    preset: null,
    uniforms: {},
    framesRendered: 0,
    warnings: [],
  };
}

function emptyUniforms(): UniformMap {
  return {
    uTime: { value: 0 },
    uColorA: { value: '#000000' },
    uColorB: { value: '#ffffff' },
    uSpeed: { value: 1 },
    uIntensity: { value: 1 },
    uBandCount: { value: 3 },
  };
}

export function hostReducer(state: HostState, action: HostAction): HostState {
  switch (action.type) {
    case 'register': {
      if (state.preset) {
        return {
          ...state,
          warnings: [
            ...state.warnings,
            `dev: ignored second Preset "${action.preset.id}" (keeping "${state.preset.id}")`,
          ],
        };
      }
      return {
        ...state,
        preset: action.preset,
        uniforms: emptyUniforms(),
        phase: 'ready',
        framesRendered: 0,
      };
    }
    case 'unregister': {
      if (!state.preset || state.preset.id !== action.id) return state;
      return createHostState();
    }
    case 'rebuild-program': {
      if (!state.preset) return state;
      return {
        ...state,
        uniforms: emptyUniforms(),
        phase: 'ready',
        framesRendered: 0,
      };
    }
    case 'tick': {
      if (!state.preset || state.phase === 'fallback') return state;
      const uniforms = { ...state.uniforms };
      for (const key of Object.keys(uniforms)) {
        uniforms[key] = { value: uniforms[key]!.value };
      }
      state.preset.sync(uniforms, action.frame);
      const framesRendered = state.framesRendered + 1;
      return {
        ...state,
        uniforms,
        framesRendered,
        phase: framesRendered >= 1 ? 'revealed' : state.phase,
      };
    }
    default:
      return state;
  }
}
