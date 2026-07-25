import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { hexToRgb } from '../hex';
import type { UniformMap } from '../types';
import { AURORA_FRAGMENT } from './auroraFragment';

export type AuroraProps = {
  colorA?: string;
  colorB?: string;
  speed?: number;
  intensity?: number;
  bandCount?: number;
};

export function Aurora({
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
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const uTime = uniforms.uTime;
        const uColorA = uniforms.uColorA;
        const uColorB = uniforms.uColorB;
        const uIntensity = uniforms.uIntensity;
        const uBandCount = uniforms.uBandCount;
        if (uTime) uTime.value = frame.time * p.speed;
        if (uColorA) uColorA.value = hexToRgb(p.colorA);
        if (uColorB) uColorB.value = hexToRgb(p.colorB);
        if (uIntensity) uIntensity.value = p.intensity;
        if (uBandCount) uBandCount.value = p.bandCount;
      },
    });
  }, [register]);

  return null;
}
