/**
 * PROTOTYPE stub — public API sketch for @base/shaders.
 * No OGL, no real GLSL. Wiring matches locked Root ↔ Preset contract.
 */

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { PresetRegistration, UniformMap } from './types';

type RegisterFn = (preset: PresetRegistration) => () => void;

type ShaderContextValue = {
  register: RegisterFn;
};

const ShaderContext = createContext<ShaderContextValue | null>(null);

function useShaderContext(component: string): ShaderContextValue {
  const ctx = useContext(ShaderContext);
  if (!ctx) {
    throw new Error(`${component} must be used within Shader.Root`);
  }
  return ctx;
}

export type RootProps = {
  className?: string;
  style?: CSSProperties;
  fallback?: ReactNode;
  children?: ReactNode;
};

function ClientGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <>{fallback ?? null}</>;
  return <>{children}</>;
}

function Root({ className, style, fallback, children }: RootProps) {
  const presetRef = useRef<PresetRegistration | null>(null);
  const [hasPreset, setHasPreset] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [warn, setWarn] = useState<string | null>(null);

  const register: RegisterFn = (preset) => {
    if (presetRef.current) {
      const msg = `dev: ignored second Preset "${preset.id}" (keeping "${presetRef.current.id}")`;
      setWarn(msg);
      console.error(msg);
      return () => {};
    }
    presetRef.current = preset;
    setHasPreset(true);
    setRevealed(false);
    return () => {
      if (presetRef.current?.id === preset.id) {
        presetRef.current = null;
        setHasPreset(false);
        setRevealed(false);
      }
    };
  };

  useEffect(() => {
    if (!hasPreset) return;
    let raf = 0;
    let frames = 0;
    const uniforms: UniformMap = {
      uTime: { value: 0 },
    };
    const loop = (t: number) => {
      const preset = presetRef.current;
      if (!preset) return;
      preset.sync(uniforms, { time: t * 0.001, delta: 0 });
      frames += 1;
      if (frames === 1) setRevealed(true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hasPreset]);

  return (
    <ShaderContext.Provider value={{ register }}>
      <ClientGuard fallback={fallback}>
        <div className={className} style={{ position: 'relative', ...style }} data-shader-root>
          {!revealed ? fallback : null}
          <canvas
            data-shader-canvas
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              opacity: revealed ? 1 : 0,
              transition: 'opacity 200ms',
            }}
          />
          {warn ? <pre data-shader-dev-warn>{warn}</pre> : null}
          {children}
        </div>
      </ClientGuard>
    </ShaderContext.Provider>
  );
}

export type AuroraProps = {
  colorA?: string;
  colorB?: string;
  speed?: number;
  intensity?: number;
  bandCount?: number;
};

const AURORA_FRAGMENT = '/* PROTOTYPE stub fragment — not real GLSL */';

function Aurora({
  colorA = '#0b1d36',
  colorB = '#3d8bfd',
  speed = 1,
  intensity = 1,
  bandCount = 3,
}: AuroraProps) {
  const { register } = useShaderContext('Shader.Aurora');
  const propsRef = useRef({ colorA, colorB, speed, intensity, bandCount });
  propsRef.current = { colorA, colorB, speed, intensity, bandCount };

  useLayoutEffect(() => {
    return register({
      id: 'aurora',
      fragment: AURORA_FRAGMENT,
      sync(uniforms, frame) {
        const p = propsRef.current;
        uniforms.uTime = { value: frame.time * p.speed };
        uniforms.uColorA = { value: p.colorA };
        uniforms.uColorB = { value: p.colorB };
        uniforms.uIntensity = { value: p.intensity };
        uniforms.uBandCount = { value: p.bandCount };
      },
    });
  }, [register]);

  return null;
}

export const Shader = {
  Root,
  Aurora,
};

export function UsageSketch() {
  return (
    <Shader.Root
      style={{ width: '100%', height: 320 }}
      fallback={<div data-fallback>loading…</div>}
    >
      <Shader.Aurora colorA='#0b1d36' colorB='#3d8bfd' speed={1.2} intensity={0.9} bandCount={4} />
    </Shader.Root>
  );
}
