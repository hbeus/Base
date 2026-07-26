# Next preset shortlist — gradients + interaction

Research for wayfinder [#40](https://github.com/hbeus/Base/issues/40) under map [#39](https://github.com/hbeus/Base/issues/39). Decision-oriented input for grill [#41](https://github.com/hbeus/Base/issues/41) to lock **2–4** tweakable named Presets (new and/or optional refines). Does **not** lock the catalog.

**Question:** What 6–10 diversifying fullscreen Preset candidates should `@base/shaders` consider next — biased toward **two strong gradient-class looks** and **pointer/velocity-interactive** looks?

---

## Method

Reuse and extend the [#26](https://github.com/hbeus/Base/issues/26) shortlist; do not re-pitch Aurora / Warp / Grain / Hex / Ripple as net-new looks. Bias the new cut toward (1) two marketing-grade **gradient-class** atmospheres and (2) looks that consume the locked **velocity** contract without forcing flowmap/FBO.

| Kind | Sources |
|---|---|
| Prior shortlist | [#26](https://github.com/hbeus/Base/issues/26); `.scratch/diversifying-fullscreen-preset-shortlist.md` on `research/diversifying-fullscreen-preset-shortlist` |
| Map / velocity lock | [#39](https://github.com/hbeus/Base/issues/39); [#42](https://github.com/hbeus/Base/issues/42) — `PointerState` gains `vx`/`vy` (norm/s, BL space); Root EMA + idle/leave decay; reduced-motion → `pointer: null`; **no flowmap in the contract** |
| Base ADRs / glossary | [ADR 0001](../docs/adr/0001-shaders-package-route.md), [ADR 0003](../docs/adr/0003-shaders-next-phase-catalog-pointer-color.md), `CONTEXT.md` (Shaders / Pointer — glossary still describes position + active; velocity deepen is map decision, not yet glossary prose) |
| Shipped catalog | `packages/shaders/src/presets/{Aurora,Warp,Grain,Hex,Ripple}.*`; Ripple opts into `pointer: true` and drives ring origin from `frame.pointer.x/y` only |
| Host / interaction demos | OGL [triangle-screen-shader.html](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html); [mouse-flowmap.html](https://github.com/oframe/ogl/blob/master/examples/mouse-flowmap.html) (`Flowmap` + mouse velocity → `tFlow`; package **Unlicense**) |
| Gradient algorithms | Quilez [Palettes](https://iquilezles.org/articles/palettes/) (`a + b·cos(2π(c·t+d))`); Shadertoy [Xl2GRc](https://www.shadertoy.com/view/Xl2GRc) |
| Domain / cellular / soft fields | Quilez [Domain Warping](https://iquilezles.org/articles/warp/); Quilez [Voronoise](https://iquilezles.org/articles/voronoise/); MIT [tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders) |
| Caustics | Dave Hoskins Shadertoy [MdlXz8](https://www.shadertoy.com/view/MdlXz8) (check per-shader license before copy) |
| Attio feel ref | First-party [attio.com/redefine](https://attio.com/redefine): bottom-anchored decorative `<canvas>` + soft `blob` media; site CSS ships slow **conic multi-hue** angle spins (`ai-hero-box-gradient-spin`, 30s linear infinite) — **feel/motion only**, not a CSS port |

**Constraints:** tweakable named Presets only (no composition / Effect engine); flowmap/FBO remains **fog** unless a look clearly needs trails; prefer single-pass fragment + Root uniforms.

**Shipped (covered — not re-shortlisted as new):** Aurora, Warp, Grain, Hex, Ripple (position-aware; not velocity-aware yet).

**From #26 not yet shipped:** Palette, Caustics, Blobs, Cellular, Flow.

---

## Shortlist table

Nine grill-facing candidates, plus **Flow** as escalate-only. Categories reuse #26 vocabulary where useful.

| Name | Category | Gradient? | Pointer / velocity? | Flowmap needed? | Refine-of? | Sources |
|---|---|---|---|---|---|---|
| **Mesh** | Soft mesh / color orbs | **Yes — strong #1** (Attio-class atmosphere) | Optional: attract/repel orbs; `vx`/`vy` → pull strength | **No** (single-pass weighted Gaussians / soft fields) | — | [Attio Redefine](https://attio.com/redefine) (feel: bottom wash + soft blob mass); soft-field / metaball family in [tuxalin](https://github.com/tuxalin/procedural-tileable-shaders) (`metaballs`; MIT); OGL Triangle host |
| **Palette** | Cosine / spectral color field | **Yes — strong #2** | No (time + UV / index only) | **No** | — | Quilez [Palettes](https://iquilezles.org/articles/palettes/); Shadertoy [Xl2GRc](https://www.shadertoy.com/view/Xl2GRc); OGL [triangle-screen-shader](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html) (`0.5 + 0.3 * cos(vUv.xyx + uTime)`) |
| **Spectrum** | Angular multi-stop wash | Yes (Attio conic-spin sibling; prefer as Palette mode) | Optional: angle bias toward pointer / velocity | **No** | Optional mode of Palette | Attio first-party CSS: `@property --ai-hero-box-gradient-angle` + `@keyframes ai-hero-box-gradient-spin` (30s) + `conic-gradient(... #fd9038 → #f5b900 → #ff5b59 → #266df0 → #13dd8d …)`; Quilez palette for stop colorization if productized as uniforms |
| **Blobs** | Soft metaballs | Soft multi-hue (secondary gradient) | **Yes** — attract/repel; velocity scales force | **No** | — | [tuxalin metaballs](https://github.com/tuxalin/procedural-tileable-shaders) (MIT); #26 shortlist |
| **Caustics** | Refractive light filaments | Partial (highlight vs floor) | Optional origin/light bias; velocity → shimmer amp | **No** | — | Hoskins [MdlXz8](https://www.shadertoy.com/view/MdlXz8); Quilez [Simple Water](https://iquilezles.org/articles/simplewater/) (related, mesh-oriented — not drop-in) |
| **Cellular** | Voronoi / Worley | No | Optional edge accent; Quilez Voronoise demo maps mouse → blend | **No** | — | Quilez [Voronoise](https://iquilezles.org/articles/voronoise/); tuxalin `voronoi` / `cellularNoise`; Book of Shaders [Cellular](https://thebookofshaders.com/12/) (**© pedagogy only**) |
| **Warp+** | Domain warp + local pull | Partial (shipped 3-color marble; not marketing-mesh) | **Yes** — pointer domain offset; **velocity** → pull radius / strength | **No** | **Warp** | Quilez [Domain Warping](https://iquilezles.org/articles/warp/); shipped `warpFragment.ts` / `Warp.tsx` (no pointer today) |
| **Ripple+** | Radial rings | No | **Yes** — keep position origin; **velocity** → amplitude / frequency / impulse | **No** | **Ripple** | Shipped `rippleFragment.ts` + `Ripple.tsx` (`pointer: true`); classic `sin(length(uv−o)·f − t)` |
| **Twist** | Curl / swirl distortion | No | **Yes** — rotate UV around pointer; **velocity** → torque | **No** | — | Domain distortion family (Quilez warp: `f(p + h(p))`); single-pass polar offset — no FBO |
| **Flow** *(escalate)* | Velocity trails / smear | No | **Yes — wants trails** | **Yes** — OGL `Flowmap` FBO | — | OGL [mouse-flowmap.html](https://github.com/oframe/ogl/blob/master/examples/mouse-flowmap.html) (`velocity` → `flowmap.velocity.lerp` → `tFlow` RG velocity texture) |

**Velocity uniforms vs flowmap (aligned with #42):**

- Enough for Mesh attract, Blobs force, Warp+ pull, Ripple+ amp, Twist torque, Caustics shimmer: consume Root `PointerState.vx`/`vy` in one fragment pass (EMA already owned by Root).
- Escalate to flowmap/FBO **only** for Flow-style persistent trails / smears (OGL example updates a ping-pong velocity texture each frame). Keep Flow **out** of the default 2–4 cut unless the grill explicitly wants trails and accepts host-path fog lift.

---

## Attio-inspired gradient direction

[Attio Redefine](https://attio.com/redefine) is the map’s feel/motion reference, not a CSS/WebGL port.

**What the page actually does (first-party, inspected):**

1. **Bottom decorative plane** — a full-width, `pointer-events-none`, bottom-anchored `<canvas>` (`~600×1440` CSS px, scaled) sits under the lower viewport; nearby soft `blob` raster media reinforces mass, not hard geometry.
2. **Site-wide multi-hue spin language** — Attio marketing CSS (same origin assets) registers `@property --ai-hero-box-gradient-angle` and animates `ai-hero-box-gradient-spin` for **30s linear infinite**, driving `conic-gradient` stops in a warm→cool loop, e.g. `#fd9038` (peach) → `#f5b900` (gold) → `#ff5b59` (coral) → `#266df0` (blue) → `#13dd8d` (mint) → back. Softer widget variants use `#febe8e` / `#f9d671` / `#ffa09f` / `#85abf6` / `#7debbc`.

**Capture for a GPU Preset (not a DOM `@property` reimplementation):**

1. **Multi-stop hue richness** beyond Aurora’s two-color curtains and Warp’s marble folds.
2. **Slow organic drift** of color mass (soft Gaussian / metaball centers, or a gently advancing palette index / angle) — ambient brand atmosphere, not Shadertoy pulse.
3. Optional **bottom-weighted presence** so the field can sit under UI the way a page-footer wash does.
4. Respect `prefers-reduced-motion` the same way Root already nulls pointer (ADR 0003 / #42).

Prefer a single-pass fragment (N orb weights + `resolveColor` stops, or Quilez cosine / angular `t`) over stacking DOM radials. **Mesh** is the closest “soft atmosphere / bottom wash” capture; **Palette** (with optional **Spectrum** angular mode) captures the multi-hue spectral language. Interaction is optional frosting (pointer / velocity bias), not the core look.

---

## Recommendation for the grill (9 in front; lock 2–4 later)

Put these in front of grill [#41](https://github.com/hbeus/Base/issues/41):

1. **Mesh** — gradient pillar A (Attio-class soft atmosphere)
2. **Palette** — gradient pillar B (Quilez / OGL cosine field; fold Spectrum in as angular mode / props, not a 10th full Preset name)
3. **Blobs** — soft + natural `vx`/`vy` consumer
4. **Caustics** — diversifier vs the noise / lattice family already shipping
5. **Cellular** — structural diversifier (prefer over Hex refine unless lattice interaction is the goal)
6. **Warp+** — cheap deepen of shipped Warp via pointer + velocity
7. **Ripple+** — cheap deepen of shipped Ripple via velocity (proves #42 without a new silhouette)
8. **Twist** — new interaction silhouette without flowmap
9. **Flow** — present only as escalate-if-trails; default **out** of the 2–4 cut (map fog)

**Strongest two gradient candidates:** **Mesh** and **Palette**.

Illustrative (not locked) 2–4 mixes that satisfy map standing prefs (two gradients inside the budget + interaction depth, no flowmap):

| Mix | Presets | Notes |
|---|---|---|
| A | Mesh + Palette + Ripple+ | Two new gradients + velocity on existing pointer preset |
| B | Mesh + Palette + Warp+ | Gradients + domain-warp interaction refine |
| C | Mesh + Palette + Blobs + Ripple+ | Max interaction surface; still no flowmap |
| D | Mesh + Palette + Twist | New curl interaction; leave Ripple as-is |

**Defer:** Grain refine (already quiet texture); Hex refine (only if Cellular is dropped and lattice interaction is wanted); Spectrum as a separate catalog name; Flow/FBO unless trails win the grill.

**Naming note for grill:** `Warp+` / `Ripple+` are research labels for “optional refine of shipped Preset,” not product names. Grill should choose either ship as deepened props on `Shader.Warp` / `Shader.Ripple`, or skip refine and spend the slot on a new look.

---

## Citations

1. Map standing prefs — [#39](https://github.com/hbeus/Base/issues/39) (gradients ×2, velocity deepen, flowmap fog, named Presets only).
2. Velocity contract — [#42](https://github.com/hbeus/Base/issues/42) resolution (`PointerState` `{ x, y, vx, vy, active }`; Root EMA; no flowmap).
3. Prior shortlist — [#26](https://github.com/hbeus/Base/issues/26); blob [diversifying-fullscreen-preset-shortlist.md](https://github.com/hbeus/Base/blob/research/diversifying-fullscreen-preset-shortlist/.scratch/diversifying-fullscreen-preset-shortlist.md).
4. ADR 0001 — OGL compound Shader, named Presets, Triangle/Program host ([docs/adr/0001-shaders-package-route.md](../docs/adr/0001-shaders-package-route.md)).
5. ADR 0003 — catalog Warp/Grain/Hex/Ripple; pointer `x`/`y`/`active`; no velocity/FBO that phase ([docs/adr/0003-shaders-next-phase-catalog-pointer-color.md](../docs/adr/0003-shaders-next-phase-catalog-pointer-color.md)).
6. Glossary — Preset / Pointer definitions (`CONTEXT.md`).
7. Shipped fragments — `packages/shaders/src/presets/*Fragment.ts`; Ripple pointer wiring in `Ripple.tsx`.
8. `PointerState` / `FrameInfo` today — `packages/shaders/src/types.ts` (velocity not implemented on `main` yet; contract locked on #42).
9. OGL triangle cosine field — [triangle-screen-shader.html](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html); license Unlicense (`ogl` `package.json`).
10. OGL flowmap + velocity — [mouse-flowmap.html](https://github.com/oframe/ogl/blob/master/examples/mouse-flowmap.html) (`velocity.x/y`, `flowmap.update()`, `tFlow`).
11. Quilez palettes — [iquilezles.org/articles/palettes](https://iquilezles.org/articles/palettes/).
12. Quilez domain warp — [iquilezles.org/articles/warp](https://iquilezles.org/articles/warp/).
13. Quilez Voronoise — [iquilezles.org/articles/voronoise](https://iquilezles.org/articles/voronoise/).
14. Hoskins caustics — [shadertoy.com/view/MdlXz8](https://www.shadertoy.com/view/MdlXz8).
15. tuxalin MIT tileables — [github.com/tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders).
16. Book of Shaders cellular — [thebookofshaders.com/12](https://thebookofshaders.com/12/) (©; pedagogy, not paste source).
17. Attio feel — [attio.com/redefine](https://attio.com/redefine) (bottom canvas + blob media); first-party CSS pattern `ai-hero-box-gradient` / `ai-hero-box-gradient-spin` / `--ai-hero-box-gradient-angle` (30s conic multi-stop).
