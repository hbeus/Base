# PROTOTYPE — Shader API sketch

**Throwaway.** Not production `@base/shaders`. Branch: `prototype/shader-api-sketch`.

## Question

Does this public API and Root ↔ Preset wiring feel right?

- Compound `Shader.Root` + headless `Shader.Aurora`
- Context registration; Root owns Program (stubbed)
- Props via ref + `sync(uniforms, frame)` from RAF
- Root owns Reveal after first successful frame
- Exactly one Preset (dev invariant)

## Run

```bash
npx tsx .scratch/shader-api-prototype/run.ts
```

Prints host state after each simulated action (register / prop change / frames / second preset).

## Read the API shape

- [`api/Shader.tsx`](api/Shader.tsx) — public compound stub (no real OGL/GLSL)
- [`api/types.ts`](api/types.ts) — registration contract types
- [`host.ts`](host.ts) — pure host state (the liftable bit)

React stubs are for reading/import shape, not a browser playground. DialKit belongs in docs later, not here.
