/**
 * PROTOTYPE — drive host state and print after each action.
 * npx tsx .scratch/shader-api-prototype/run.ts
 */

import { createHostState, hostReducer, type HostState } from './host';
import type { PresetRegistration } from './api/types';

function dump(label: string, state: HostState) {
  console.log(`\n--- ${label} ---`);
  console.log(
    JSON.stringify(
      {
        phase: state.phase,
        presetId: state.preset?.id ?? null,
        framesRendered: state.framesRendered,
        uniforms: Object.fromEntries(
          Object.entries(state.uniforms).map(([k, v]) => [k, v.value]),
        ),
        warnings: state.warnings,
      },
      null,
      2,
    ),
  );
}

function makeAurora(overrides?: { speed?: number }): PresetRegistration {
  const speed = overrides?.speed ?? 1;
  return {
    id: 'aurora',
    fragment: '/* stub */',
    sync(uniforms, frame) {
      uniforms.uTime = { value: frame.time * speed };
      uniforms.uColorA = { value: '#0b1d36' };
      uniforms.uColorB = { value: '#3d8bfd' };
      uniforms.uSpeed = { value: speed };
      uniforms.uIntensity = { value: 1 };
      uniforms.uBandCount = { value: 3 };
    },
  };
}

let state = createHostState();
dump('initial (fallback, no preset)', state);

state = hostReducer(state, { type: 'register', preset: makeAurora() });
dump('after register Aurora (phase → ready)', state);

state = hostReducer(state, { type: 'tick', frame: { time: 0.016, delta: 0.016 } });
dump('after first tick (Reveal)', state);

state = hostReducer(state, { type: 'tick', frame: { time: 0.032, delta: 0.016 } });
dump('after second tick (uniforms advance)', state);

state = hostReducer(state, {
  type: 'register',
  preset: { id: 'grain', fragment: '/* stub */', sync() {} },
});
dump('after second Preset register (dev invariant)', state);

state = hostReducer(state, { type: 'unregister', id: 'aurora' });
dump('after unregister Aurora', state);

console.log('\nPublic usage sketch:\n');
console.log(`<Shader.Root fallback={…}>
  <Shader.Aurora colorA="#0b1d36" colorB="#3d8bfd" speed={1.2} intensity={0.9} bandCount={4} />
</Shader.Root>`);
