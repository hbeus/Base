# OGL + React fullscreen fragment-shader preset host

Primary-source patterns for hosting a fullscreen OGL fragment-shader preset in
React — what `@base/shaders` `Shader.Root` should follow. Research only; no
package implementation.

**Scope**: OGL Triangle/Program fullscreen path; React lifecycle (init once vs
uniform updates); RAF pause (offscreen + tab-hidden); SSR / client-only mount;
first-frame reveal without flash; DPR caps; brief R3F contrast.

**Local context**: `@base/canvas` already ships `SSRGuard` and an R3F `Canvas`
wrapper — reuse the SSR pattern, not the R3F stack, for shader presets.

---

## Verdict (recommendations for `Shader.Root`)

1. **Host shape**: OGL `Renderer` + `Triangle` + `Program` + `Mesh`; no
   `Camera` / `Transform`. Update uniforms in the RAF callback; render with
   `{ scene: mesh }`.
2. **Lifecycle**: One mount Effect builds GL + starts the loop; cleanup must
   fully tear it down. Uniform / prop sync uses refs or a separate Effect that
   mutates `program.uniforms.*.value` — never rebuild the Program on every
   prop change.
3. **RAF gate**: Run frames only when `document.visibilityState === "visible"`
   **and** the host element is intersecting (`IntersectionObserver`). Cancel
   the pending frame when pausing; re-schedule when both are true again.
4. **SSR**: Client-only mount via the same two-pass pattern as
   `@base/canvas` `SSRGuard` (and React’s intentional client/server split).
   Server + first client render = stable fallback; WebGL only after mount.
5. **Reveal**: Keep the canvas visually hidden (or fully transparent) until
   after the first successful `renderer.render`, then reveal. Match
   `clearColor` / page background; prefer `alpha: true` and write opaque
   fragments rather than `alpha: false`.
6. **DPR**: Cap — e.g. `Math.min(devicePixelRatio, 2)` — aligned with R3F’s
   default `[1, 2]`. Size from the host box (`ResizeObserver`), not only
   `window.innerWidth/Height`.
7. **Do not** pull R3F for fullscreen fragment presets; borrow only the
   *ideas* (dpr clamp, fallback slot, optional demand-style pause).

---

## 1. OGL fullscreen Triangle / Program pattern

### Official recipe

OGL’s README documents a “full-screen shader” path that drops the scene graph
and camera: custom full-viewport geometry (or `Triangle`), a `Program` with
time/color uniforms, a `Mesh`, then RAF that mutates uniforms and calls
`renderer.render({ scene: mesh })`.

Source: [oframe/ogl README — Usage (fullscreen shader)](https://github.com/oframe/ogl/blob/master/README.md)

```js
import { Renderer, Geometry, Program, Mesh } from 'ogl';

const renderer = new Renderer({
  width: window.innerWidth,
  height: window.innerHeight,
});
const gl = renderer.gl;
document.body.appendChild(gl.canvas);

const geometry = new Geometry(gl, {
  position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
  uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
});
// Alternatively, you could use the Triangle class.

const program = new Program(gl, {
  // vertex + fragment …
  uniforms: { uTime: { value: 0 } },
});

const mesh = new Mesh(gl, { geometry, program });

requestAnimationFrame(update);
function update(t) {
  requestAnimationFrame(update);
  program.uniforms.uTime.value = t * 0.001;
  renderer.render({ scene: mesh });
}
```

The commented example `examples/triangle-screen-shader.html` is the same
pattern with the `Triangle` helper, `uTime` / `uColor`, resize via
`renderer.setSize`, and an explicit `gl.clearColor(1, 1, 1, 1)`.

Source: [triangle-screen-shader.html](https://raw.githubusercontent.com/oframe/ogl/master/examples/triangle-screen-shader.html)

### `Triangle` geometry

`Triangle` is a thin `Geometry` that hard-codes the oversized clip-space
triangle and matching UVs (viewport covered; excess clipped):

```js
position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
```

Source: [src/extras/Triangle.js](https://raw.githubusercontent.com/oframe/ogl/master/src/extras/Triangle.js)

### Renderer size / DPR (OGL core)

`Renderer` defaults include `dpr = 1`. `setSize(width, height)` sets CSS size
to `width`/`height` px and backing-store size to `width * dpr` /
`height * dpr`. `render` sets the viewport to `this.width * this.dpr` ×
`this.height * this.dpr` when drawing to the canvas.

Source: [src/core/Renderer.js](https://raw.githubusercontent.com/oframe/ogl/master/src/core/Renderer.js)

### Uniforms are mutable bags

`Program` stores `this.uniforms = uniforms` and, on `use()`, walks active
uniforms and uploads `uniform.value`. Mutating `.value` each frame (as in the
official examples) is the intended hot path; recreating `Program` is a cold
path (compile/link).

Source: [src/core/Program.js](https://raw.githubusercontent.com/oframe/ogl/master/src/core/Program.js)

### Implication for `Shader.Root`

| Piece | Init once | Per frame / prop |
| --- | --- | --- |
| `Renderer`, canvas attach | ✓ | — |
| `Triangle`, `Program`, `Mesh` | ✓ | — |
| `renderer.setSize` / dpr | on resize / dpr change | — |
| `program.uniforms.*.value` | initial values | RAF + prop sync |
| `renderer.render({ scene: mesh })` | — | when loop is active |

---

## 2. React lifecycle: init once vs uniform updates

### Effects synchronize with external systems

React’s `useEffect` is for connecting to systems React does not own (DOM,
third-party widgets, animation libs). Setup runs after commit; cleanup must
undo setup. In Strict Mode (dev), React runs an extra setup→cleanup→setup
cycle so cleanup must be complete (dispose GL, cancel RAF, disconnect
observers).

Sources:

- [react.dev — useEffect](https://react.dev/reference/react/useEffect)
- [react.dev — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

Effects **do not run during SSR**; they are client-only.

Source: [react.dev — useLayoutEffect caveats](https://react.dev/reference/react/useLayoutEffect) (“Effects only run on the client”)

### Recommended split for `Shader.Root`

**Effect A — GL host (deps: mount / stable identity only)**

1. Create `Renderer` (optionally pass an existing canvas from a ref).
2. Build `Triangle` + `Program` + `Mesh` from the preset’s shaders/uniforms.
3. Attach resize (`ResizeObserver` on the host) and visibility/intersection
   listeners.
4. Start the RAF pump (gated — §3).
5. Cleanup: `cancelAnimationFrame`, disconnect observers, remove listeners,
   `program.remove()` / lose or drop context, detach canvas if you created it.

**Effect B — prop → uniform sync (deps: changing uniform props)**  
or **refs read inside RAF** (no re-subscribe):

- Write into `program.uniforms[name].value`.
- Do **not** put the entire GL bootstrap in this Effect’s dependency list.

This mirrors React’s own “keep an external system synchronized to props”
guidance (e.g. map widget `setZoom`), without tearing down the external
system when only the zoom changes.

Source: [react.dev — useEffect — Controlling a non-React widget](https://react.dev/reference/react/useEffect#controlling-a-non-react-widget)

**Avoid**: putting `uTime`-style continuous values in React state every frame.
Prefer mutating uniforms inside RAF (same as OGL examples). React’s animation
example uses a ref + Effect to start/stop an imperative animation class — not
`setState` per frame.

Source: [react.dev — useEffect — Triggering animations](https://react.dev/reference/react/useEffect#triggering-animations)

---

## 3. RAF pause: tab-hidden + offscreen

### Tab / document hidden — Page Visibility

HTML defines `Document` visibility state `"hidden"` | `"visible"`,
`document.visibilityState`, `document.hidden`, and a bubbling
`visibilitychange` event when the state updates.

Source: [HTML Living Standard — Page visibility](https://html.spec.whatwg.org/multipage/interaction.html#page-visibility)

MDN: use the API to avoid unnecessary work when the document is not visible;
listen for `visibilitychange` and branch on `document.hidden`.

Source: [MDN — Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

### RAF already throttles / pauses in background

MDN: `requestAnimationFrame` callbacks “are paused in most browsers when
running in background tabs or hidden `<iframe>`s” for performance and battery.
Callbacks are one-shot — you must re-request the next frame.

Source: [MDN — Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)

**Still gate explicitly**: relying only on browser pause does not cover
“tab visible but shader scrolled offscreen,” and making pause/resume
deterministic simplifies Strict Mode cleanup and battery policy.

### Offscreen — Intersection Observer

Intersection Observer notifies when a target’s intersection with a root
(viewport if `root: null`) crosses thresholds. Use `entry.isIntersecting`
(and optionally `intersectionRatio`) to pause when the host leaves the
viewport. Default `threshold: 0` fires as soon as the target touches the
root boundary.

Source: [MDN — Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

React’s own `useEffect` docs include an IntersectionObserver example for
viewport visibility — same integration shape (observe in setup, disconnect
in cleanup).

Source: [react.dev — useEffect — IntersectionObserver example](https://react.dev/reference/react/useEffect)

### Recommended gate for `Shader.Root`

```ts
const shouldRun = document.visibilityState === 'visible' && isIntersecting

function tick(t: number) {
  rafId = null
  if (!shouldRun) return
  // update uniforms + renderer.render(...)
  rafId = requestAnimationFrame(tick)
}

function resume() {
  if (rafId == null && shouldRun) rafId = requestAnimationFrame(tick)
}

function pause() {
  if (rafId != null) cancelAnimationFrame(rafId)
  rafId = null
}
```

- On `visibilitychange` → hidden: `pause()`.
- On `visibilitychange` → visible **and** intersecting: `resume()`.
- On IntersectionObserver: update `isIntersecting`, then `pause` / `resume`.

Use the RAF **timestamp** argument for time-based uniforms (MDN warns against
assuming a fixed frame duration on high-refresh displays) — same as OGL’s
`t * 0.001` pattern.

---

## 4. SSR / client-only mounting

### Local pattern — `@base/canvas` `SSRGuard`

```tsx
export function SSRGuard({ children, fallback = null }: SSRGuardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

Source: `packages/canvas/src/SSRGuard/index.tsx`

### React’s same pattern (hydration-safe)

React documents intentional server/client differences as two-pass rendering:
initial render matches the server; an Effect sets a client flag and re-renders
with client-only UI. This avoids hydration mismatches from
`typeof window !== 'undefined'` during render.

Source: [react.dev — hydrateRoot — Handling different client and server content](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content)

Hydration expects server HTML and the first client render to match; mismatches
are bugs.

Source: [react.dev — hydrateRoot caveats](https://react.dev/reference/react-dom/client/hydrateRoot)

### Implication for `Shader.Root`

- Server + first client paint: host shell + `fallback` (poster, solid color,
  or `null`) — **no** `new Renderer()` / `getContext` during render.
- After mount Effect: create WebGL, then reveal (§5).
- Optionally compose with / re-export the same guard API as `@base/canvas`
  for consistency across the monorepo.

---

## 5. First-frame reveal without flash

Primary sources do not ship a single “no-flash” API, but they constrain the
pieces:

| Concern | Guidance | Source |
| --- | --- | --- |
| Empty / wrong first paint | Don’t show client-only content until after the client pass | React hydrateRoot two-pass |
| Clear color | Official triangle example sets `gl.clearColor(1, 1, 1, 1)` before drawing | OGL triangle-screen-shader |
| Alpha compositing cost | Prefer `alpha: true` and write `1.0` alpha in the fragment; `alpha: false` can be expensive on some platforms | [MDN — WebGL best practices — Avoid alpha:false](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices) |
| RAF timing | First RAF callback can be delayed several frames after the initial request; structure “start” from the first callback timestamp if needed | [MDN — requestAnimationFrame examples](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) |

### Recommended reveal sequence

1. Mount host with canvas (or placeholder) at `opacity: 0` / `visibility: hidden`
   (or keep `SSRGuard` fallback until ready).
2. Init GL; set `clearColor` to the page/surface background (or transparent if
   the design requires).
3. On the **first** RAF tick that successfully `render`s, flip a `ready` flag
   (state or class) and show the canvas.
4. Optional: `useLayoutEffect` only if you must measure layout before paint;
   prefer `useEffect` for GL init so you don’t block paint with shader compile.
   (`useLayoutEffect` blocks paint by design.)

Source: [react.dev — useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

R3F’s docs note that an ideal WebGL `fallback` is a seamless visual
replacement for what the canvas would have rendered — same UX idea for
`Shader.Root`’s SSR/loading shell.

Source: [R3F Canvas — Errors and fallbacks](https://r3f.docs.pmnd.rs/api/canvas)

---

## 6. DPR caps and sizing

### Platform

`window.devicePixelRatio` is physical pixels per CSS pixel; zooming changes it.
MDN’s canvas example scales backing store by DPR for sharpness.

Source: [MDN — Window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

WebGL best practices: naive `width * devicePixelRatio` with **non-integer**
DPR (common with OS UI scaling / zoom) can cause moiré; consider
`ResizeObserver` with `device-pixel-content-box` for true device-pixel sizes
where supported. Also reason about VRAM via
`(cssWidth * dpr) * (cssHeight * dpr)` budgets.

Source: [MDN — WebGL best practices — devicePixelRatio / ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

### OGL

Pass `dpr` into `Renderer` and/or assign `renderer.dpr` before `setSize`.
Default is `1` — HiDPI needs an explicit value.

Source: [Renderer.js constructor / setSize](https://raw.githubusercontent.com/oframe/ogl/master/src/core/Renderer.js)

### R3F contrast (policy, not dependency)

R3F `Canvas` default `dpr` is `[1, 2]` — clamp between min and max.

Source: [R3F Canvas props](https://r3f.docs.pmnd.rs/api/canvas)

### Recommendation for `Shader.Root`

```ts
const dpr = Math.min(window.devicePixelRatio || 1, maxDpr) // maxDpr default 2
renderer.dpr = dpr
renderer.setSize(cssWidth, cssHeight)
```

- Observe the **host element** with `ResizeObserver` (content box), not only
  `window` resize — presets are rarely full-`document.body`.
- Source: [MDN — ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- Re-read DPR on `matchMedia('(resolution: …dppx)')` changes when moving
  across displays / zoom (MDN devicePixelRatio examples).
- Optional later: adaptive DPR under load (R3F PerformanceMonitor pattern) —
  not required for v1.

---

## 7. Contrast notes vs R3F (`@base/canvas`)

| Topic | R3F / `@base/canvas` | `Shader.Root` (OGL) |
| --- | --- | --- |
| Stack | `@react-three/fiber` `Canvas`, scene graph | OGL Triangle fullscreen; no Three scene |
| Loop | `frameloop`: `always` \| `demand` \| `never` + `invalidate` | Own RAF + visibility/IO gate |
| DPR | Default `[1, 2]` | Explicit cap (recommend ≤ 2) |
| SSR | App-level; local `SSRGuard` | Same `SSRGuard`-style two-pass |
| Fallback | `Canvas fallback={…}` when GL missing | Host `fallback` + optional no-GL UI |
| Cost model | Continuous 3D loop is expensive; docs push on-demand when idle | Fragment preset is one draw; still pause when invisible |

Sources:

- [R3F Canvas](https://r3f.docs.pmnd.rs/api/canvas)
- [R3F Scaling performance — on-demand rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- `packages/canvas/src/Canvas/index.tsx` (thin R3F wrapper; no custom dpr/frameloop defaults beyond R3F)

For animated fragment presets, R3F `frameloop="demand"` is usually the wrong
default (uniforms change every frame). Prefer continuous RAF **while visible**,
akin to R3F `frameloop="always"` but with an explicit offscreen/tab gate R3F
does not provide out of the box.

---

## 8. Suggested `Shader.Root` responsibility map

```
Shader.Root
├── SSR / mounted gate → fallback | children host
├── Host DOM (size box + canvas)
├── Mount Effect: Renderer, Triangle, Program, Mesh, RO, IO, visibility
├── RAF: if visible && intersecting → uniforms + render
├── Prop sync: mutate program.uniforms (refs / light Effect)
├── Ready flag: reveal canvas after first successful frame
└── Cleanup: cancel RAF, disconnect observers, delete program / drop GL
```

Presets supply `vertex` / `fragment` (or fragment-only with a shared fullscreen
vertex), default uniform map, and optional `clearColor` / `maxDpr` /
`alpha`.

---

## Sources

### OGL (primary)

- https://github.com/oframe/ogl/blob/master/README.md
- https://raw.githubusercontent.com/oframe/ogl/master/examples/triangle-screen-shader.html
- https://raw.githubusercontent.com/oframe/ogl/master/src/extras/Triangle.js
- https://raw.githubusercontent.com/oframe/ogl/master/src/core/Renderer.js
- https://raw.githubusercontent.com/oframe/ogl/master/src/core/Program.js
- https://oframe.github.io/ogl/examples/?m=triangle-screen-shader

### React (primary)

- https://react.dev/reference/react/useEffect
- https://react.dev/reference/react/useLayoutEffect
- https://react.dev/learn/synchronizing-with-effects
- https://react.dev/reference/react-dom/client/hydrateRoot

### Web platform (primary)

- https://html.spec.whatwg.org/multipage/interaction.html#page-visibility
- https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
- https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices

### R3F (contrast only)

- https://r3f.docs.pmnd.rs/api/canvas
- https://r3f.docs.pmnd.rs/advanced/scaling-performance

### Local

- `packages/canvas/src/SSRGuard/index.tsx`
- `packages/canvas/src/Canvas/index.tsx`
