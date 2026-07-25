# Domain Glossary

Canonical terms for this project. Keep terms meaningful to the domain — not implementation details.

## Language

### Shaders

GPU background effects shipped via `@base/shaders`.

**Shader**:
The compound React surface for a GPU background effect — Root plus its named presets.
_Avoid_: GLSL source, OGL Program, any WebGL on the page

**Root**:
The Shader host that owns the canvas lifecycle (client mount, RAF pause, DPR, fallback, reveal). In the POC, exactly one Preset runs under it.
_Avoid_: the visual look itself; a Preset

**Preset**:
A named visual effect that plugs into Root — typed props in, fragment look out.
_Avoid_: editor save files; layer stacks; the canvas host

**Fallback**:
The non-WebGL stand-in shown in Root’s fallback slot while the GPU isn’t ready or can’t run. Shaders-domain only.
_Avoid_: a low-quality shader; the reveal transition; general UI “fallback” elsewhere in the app

**Reveal**:
The transition from Fallback to the running Preset after the first successful frame, so the canvas doesn’t flash empty.
_Avoid_: pause/resume show-hide; a second Preset
