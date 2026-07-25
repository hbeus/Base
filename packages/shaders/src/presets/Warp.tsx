import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { WARP_FRAGMENT } from './warpFragment';

export type WarpProps = {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  speed?: number;
  intensity?: number;
  warp?: number;
  scale?: number;
};

export function Warp({
  colorA = '#0a1628',
  colorB = '#3d5a80',
  colorC = '#98c1d9',
  speed = 1,
  intensity = 1,
  warp = 1,
  scale = 1.4,
}: WarpProps) {
  const { register, hostRef } = useShaderContext('Shader.Warp');
  const propsRef = useRef({ colorA, colorB, colorC, speed, intensity, warp, scale });
  propsRef.current = { colorA, colorB, colorC, speed, intensity, warp, scale };

  useLayoutEffect(() => {
    return register({
      id: 'warp',
      fragment: WARP_FRAGMENT,
      uniforms: {
        uColorA: { value: [0, 0, 0] },
        uColorB: { value: [1, 1, 1] },
        uColorC: { value: [0.5, 0.5, 0.5] },
        uIntensity: { value: 1 },
        uWarp: { value: 1 },
        uScale: { value: 1 },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorA) uniforms.uColorA.value = resolveColor(p.colorA, host);
        if (uniforms.uColorB) uniforms.uColorB.value = resolveColor(p.colorB, host);
        if (uniforms.uColorC) uniforms.uColorC.value = resolveColor(p.colorC, host);
        if (uniforms.uIntensity) uniforms.uIntensity.value = p.intensity;
        if (uniforms.uWarp) uniforms.uWarp.value = p.warp;
        if (uniforms.uScale) uniforms.uScale.value = p.scale;
      },
    });
  }, [register, hostRef]);

  return null;
}
