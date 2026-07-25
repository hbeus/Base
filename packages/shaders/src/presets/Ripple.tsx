import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { RIPPLE_FRAGMENT } from './rippleFragment';

export type RippleProps = {
  colorA?: string;
  colorB?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  decay?: number;
  thickness?: number;
};

export function Ripple({
  colorA = '#0a1420',
  colorB = '#5ec8ff',
  amplitude = 1,
  frequency = 28,
  speed = 1,
  decay = 2.2,
  thickness = 1,
}: RippleProps) {
  const { register, hostRef } = useShaderContext('Shader.Ripple');
  const propsRef = useRef({
    colorA,
    colorB,
    amplitude,
    frequency,
    speed,
    decay,
    thickness,
  });
  propsRef.current = { colorA, colorB, amplitude, frequency, speed, decay, thickness };

  useLayoutEffect(() => {
    return register({
      id: 'ripple',
      fragment: RIPPLE_FRAGMENT,
      pointer: true,
      uniforms: {
        uColorA: { value: [0.04, 0.08, 0.14] },
        uColorB: { value: [0.35, 0.75, 1.0] },
        uAmplitude: { value: 1 },
        uFrequency: { value: 28 },
        uThickness: { value: 1 },
        uDecay: { value: 2.2 },
        uOrigin: { value: [0.5, 0.5] },
        uActive: { value: 0 },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorA) uniforms.uColorA.value = resolveColor(p.colorA, host);
        if (uniforms.uColorB) uniforms.uColorB.value = resolveColor(p.colorB, host);
        if (uniforms.uAmplitude) uniforms.uAmplitude.value = p.amplitude;
        if (uniforms.uFrequency) uniforms.uFrequency.value = p.frequency;
        if (uniforms.uThickness) uniforms.uThickness.value = p.thickness;
        if (uniforms.uDecay) uniforms.uDecay.value = p.decay;
        const origin = uniforms.uOrigin as { value: [number, number] } | undefined;
        const active = uniforms.uActive as { value: number } | undefined;
        if (frame.pointer && origin && active) {
          origin.value = [frame.pointer.x, frame.pointer.y];
          active.value = frame.pointer.active ? 1 : 0.35;
        } else if (origin && active) {
          origin.value = [0.5, 0.5];
          active.value = 0.25;
        }
      },
    });
  }, [register, hostRef]);

  return null;
}
