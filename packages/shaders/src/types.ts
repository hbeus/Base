export type UniformMap = Record<string, { value: unknown }>;

export type FrameInfo = {
  time: number;
  delta: number;
};

export type PresetRegistration = {
  id: string;
  fragment: string;
  vertex?: string;
  sync: (uniforms: UniformMap, frame: FrameInfo) => void;
};

export type RegisterFn = (preset: PresetRegistration) => () => void;
