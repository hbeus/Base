# Diversifying fullscreen preset shortlist

High-trust candidate looks for decorative fullscreen fragment presets in
`@base/shaders` (OGL Triangle / Program), diversifying vs the shipped
`Shader.Aurora`. Research only — does **not** lock the 2–4 catalog; that is
grill ticket #27.

**Baseline (shipped):** Aurora — soft animated vertical curtains; props
`colorA` / `colorB` / `speed` / `intensity` / `bandCount`; value-noise fBM +
curtain falloff; no pointer uniforms.

Sources for baseline: `packages/shaders/src/presets/Aurora.tsx`,
`packages/shaders/src/presets/auroraFragment.ts`. Host path: OGL fullscreen
Triangle / Program ([oframe/ogl README](https://github.com/oframe/ogl/blob/master/README.md),
[triangle-screen-shader.html](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html);
prior notes on `research/ogl-react-fullscreen-preset-host`).

**Catalog target later:** pick **2–4** named presets from this shortlist
(+ docs). Map #25 also requires **≥1** eventual preset to be pointer-aware.

**Constraints:** decorative page backgrounds only; no StyleX / `@base/ui`
coupling; prefer MIT / public-domain / author-published patterns with clear
attribution — not a marketplace scrape.

---

## Verdict (grilling input)

Nine candidates, spanning classic fullscreen-background categories. Strong
diversifiers vs Aurora (soft curtains): **Warp**, **Palette**, **Caustics**,
**Grain**, **Blobs**, **Hex**, **Cellular**, **Flow**, **Ripple**.

Pointer-native (best for the map’s ≥1 pointer-aware preset):

| Candidate | Pointer |
|---|---|
| Flow | **Yes — wants it** (flowmap driven by pointer velocity) |
| Ripple | **Yes — wants it** (rings origin at pointer) |
| Blobs | Optional but natural (attract / push blobs) |
| Warp | Optional (local domain pull) |
| Caustics | Optional (light / origin bias) |
| Palette, Grain, Hex, Cellular | No (time + color/scale only) |

Suggested grilling cut (illustrative, not locked): one organic (**Warp** or
**Caustics**), one structural (**Hex** or **Cellular**), one quiet texture
(**Grain** or **Palette**), plus one pointer-aware (**Flow** or **Ripple**).

---

## Shortlist

### 1. Warp

- **Visual idea:** Nested fBM domain distortion — cloudy marble / smoke
  sheets that fold through each other rather than hang as vertical bands.
- **Diversifies vs Aurora:** Same noise family, different structure —
  multi-pass domain warp (`fbm(p + fbm(p + fbm(p)))`) instead of curtain
  falloff + band ridges.
- **Prop surface sketch:** `colorA` / `colorB` / `colorC?`, `speed`,
  `intensity`, `warp` (displacement scale), `scale`.
- **Pointer:** Optional — local pull on the warp domain.
- **Provenance:** Inigo Quilez, [Domain Warping](https://iquilezles.org/articles/warp/)
  (code + explanation; Shadertoy refs
  [4s23zz](https://www.shadertoy.com/view/4s23zz),
  [lsl3RH](https://www.shadertoy.com/view/lsl3RH)). MIT tileable variants:
  [tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders)
  (domain warping / fBM; MIT).

### 2. Palette

- **Visual idea:** Cheap cosine color field over UV + time — smooth
  multi-hue “mesh” / iridescent wash without curtains.
- **Diversifies vs Aurora:** Color rhythm from a 4-parameter cosine palette
  (or OGL’s `0.5 + 0.3 * cos(vUv.xyx + uTime)` demo), not a two-color ridge
  mix under a vertical mask.
- **Prop surface sketch:** Either Quilez `a`/`b`/`c`/`d` vec3 params, or
  product-friendly `colorA`–`colorD` + `speed` + `contrast`; optional
  `angle`.
- **Pointer:** No.
- **Provenance:** Quilez, [Palettes](https://iquilezles.org/articles/palettes/)
  (`color = a + b*cos(2π(c*t+d))`; Shadertoy
  [Xl2GRc](https://www.shadertoy.com/view/Xl2GRc)). Host-shaped demo:
  OGL [triangle-screen-shader.html](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html)
  (Unlicense package).

### 3. Caustics

- **Visual idea:** Soft refractive light pools — animated bright filaments
  on a darker field, reading as underwater / glass caustics.
- **Diversifies vs Aurora:** High-frequency light focusing vs soft vertical
  glow bands; horizontal / isotropic motion rather than curtain hang.
- **Prop surface sketch:** `colorA` / `colorB` (floor vs highlight),
  `scale`, `speed`, `intensity`, optional `distortion`.
- **Pointer:** Optional — bias caustic origin / light direction toward
  pointer.
- **Provenance:** Dave Hoskins, Shadertoy
  [Tileable Water Caustic — MdlXz8](https://www.shadertoy.com/view/MdlXz8)
  (author page: [Dave_Hoskins](https://www.shadertoy.com/user/Dave_Hoskins)).
  Related water-surface recipe (mesh + fBM normals, not a drop-in fragment):
  Quilez [Simple Water](https://iquilezles.org/articles/simplewater/).
  Prefer Hoskins’ tileable 2D fragment for a fullscreen Triangle preset;
  confirm Shadertoy license banner before copy.

### 4. Grain

- **Visual idea:** Animated film / sensor grain over a flat or soft
  gradient — texture presence without large shapes.
- **Diversifies vs Aurora:** High-frequency monochrome noise vs large soft
  color curtains; can sit under UI without competing for silhouette.
- **Prop surface sketch:** `color` (base), `amount`, `size`, `speed`,
  optional `lumaResponse` (less grain in highlights).
- **Pointer:** No.
- **Provenance:** Technique write-up — Martins Upitis,
  [Film Grain post process FX](http://devlog-martinsh.blogspot.com/2013/05/image-imperfections-and-film-grain-post.html).
  MIT package — Matt DesLauriers
  [glsl-film-grain](https://github.com/mattdesl/glsl-film-grain) (MIT;
  uses 3D noise, not a pure hash sparkle). LYGIA re-exports the same grain
  helper with MIT attribution to DesLauriers
  ([lygia/distort/grain](https://lygia.xyz/distort/grain)) — note LYGIA’s
  own dual license if pulling other LYGIA modules.

### 5. Blobs

- **Visual idea:** Soft overlapping metaballs / ink blots drifting slowly
  across the field.
- **Diversifies vs Aurora:** Discrete soft circular masses vs continuous
  vertical curtains.
- **Prop surface sketch:** `colorA` / `colorB`, `count` (or fixed small N),
  `softness`, `speed`, `scale`, optional `threshold`.
- **Pointer:** Optional but natural — attract / repel nearest blob, or
  treat pointer as an extra ball.
- **Provenance:** Metaballs as cellular-noise variant —
  [tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders)
  (`metaballs`; MIT). Algorithm family also covered pedagogically in Book of
  Shaders cellular chapter (copyright; use as learning ref, not paste
  source — see Attribution notes).

### 6. Hex

- **Visual idea:** Subtle hexagonal lattice — thin edges or soft cell
  fills, optionally breathing / slowly warping.
- **Diversifies vs Aurora:** Explicit geometric structure vs organic
  curtains; reads “designed / tech” rather than “sky”.
- **Prop surface sketch:** `colorLine` / `colorFill`, `scale`,
  `thickness`, `speed` (phase / gentle warp), optional `glow`.
- **Pointer:** Optional — thicken / brighten cells near pointer.
- **Provenance:** MIT hex tile helpers —
  [tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders)
  (`tileHexagons`, `noiseHexagons`; MIT). Author Shadertoy preview linked
  from that repo: [3sKXWh](https://www.shadertoy.com/view/3sKXWh).

### 7. Cellular

- **Visual idea:** Soft Voronoi / Worley cells — organic tiles, edges, or
  “cracks”; can lean organic (Voronoise) or crisp (edge distance).
- **Diversifies vs Aurora:** Cell topology and edge emphasis vs continuous
  fBM curtains.
- **Prop surface sketch:** `colorA` / `colorB`, `scale`, `edgeWidth`,
  `jitter`, `speed`, optional Quilez-style `u`/`v` blend (noise ↔ Voronoi).
- **Pointer:** Optional — jitter / edge accent toward pointer (Quilez’s
  interactive Voronoise demo already maps mouse → `u`/`v`).
- **Provenance:** Quilez, [Voronoise](https://iquilezles.org/articles/voronoise/)
  (generalizes Noise ↔ Voronoi; interactive demo on that page). MIT
  implementations: tuxalin `voronoi` / `cellularNoise` / `cracks`. Pedagogy
  (not a license grant): Book of Shaders
  [Cellular Noise](https://thebookofshaders.com/12/).

### 8. Flow

- **Visual idea:** Pointer-driven fluid streak / smear — velocity trail
  that distorts a soft procedural field (or tinted flow RGB).
- **Diversifies vs Aurora:** Interaction-first; motion comes from user
  velocity, not only time-scrolled noise bands.
- **Prop surface sketch:** `colorA` / `colorB` (procedural base — avoid
  requiring a stock photo), `strength`, `decay` / `falloff`, `speed`
  (auto-drift when idle), maybe `viscosity`.
- **Pointer:** **Yes — wants it.** Needs pointer position + velocity
  uniforms (or Root-owned flow buffer).
- **Provenance:** First-party OGL example
  [mouse-flowmap.html](https://github.com/oframe/ogl/blob/master/examples/mouse-flowmap.html)
  (`Flowmap` + Triangle + `tFlow` velocity texture; package license
  **Unlicense**). For decorative backgrounds, replace the example’s
  `tWater` photo with a procedural gradient / noise field so the preset
  stays texture-free.

### 9. Ripple

- **Visual idea:** Concentric soft rings expanding from a point — pond
  ripples; quiet when idle, responsive on move/click.
- **Diversifies vs Aurora:** Radial wave geometry vs vertical curtains;
  discrete event-like motion.
- **Prop surface sketch:** `colorA` / `colorB`, `amplitude`, `frequency`,
  `speed` / `decay`, `thickness`; origin defaults to center when no
  pointer.
- **Pointer:** **Yes — wants it** (ring origin = pointer; optional click
  impulse). Still usable without pointer (timed center ripples).
- **Provenance:** Classic distance-field rings (`sin(length(uv - origin) *
  freq - time)`). Distance / shaping building blocks: Quilez distance
  function corpus (e.g. site articles under
  [iquilezles.org/articles](https://iquilezles.org/articles/)); Book of
  Shaders shaping / examples discuss ripples pedagogically (copyright —
  reimplement, don’t paste). Pair with OGL pointer wiring patterns from
  Flowmap example for host uniforms.

---

## Diversification matrix (vs Aurora)

| Candidate | Category | Motif vs curtains | Pointer |
|---|---|---|---|
| Warp | Domain warp | Turbulent folds | Optional |
| Palette | Gradient / color field | Cosine multi-hue wash | No |
| Caustics | Ripple / light | Refractive filaments | Optional |
| Grain | Noise / grain | High-freq texture | No |
| Blobs | Soft particles | Discrete metaballs | Optional★ |
| Hex | Geometric grid | Lattice | Optional |
| Cellular | Cellular / Voronoi | Cells / edges | Optional |
| Flow | Warp + interaction | Velocity trails | **Yes** |
| Ripple | Ripple | Radial rings | **Yes** |

★ Natural fit if grilling wants a softer pointer preset than Flow.

---

## Attribution & license notes (for implementers)

| Source | Role | License / terms |
|---|---|---|
| oframe/ogl | Host + Flowmap example | Unlicense (`package.json` `"license": "Unlicense"`) |
| tuxalin/procedural-tileable-shaders | Warp / Blobs / Hex / Cellular GLSL | MIT |
| mattdesl/glsl-film-grain | Grain | MIT |
| iquilezles.org articles + Shadertoy `iq` | Warp, Palette, Voronoise algorithms | Author-published; check each Shadertoy’s license banner before verbatim copy |
| Shadertoy `Dave_Hoskins` MdlXz8 | Caustics reference | Check shader’s license banner before copy |
| thebookofshaders.com | Pedagogy (cellular, fBM, ripples) | © Patricio Gonzalez Vivo — **all rights reserved**; use for learning, not as copy-paste source |
| LYGIA | Optional grain re-export | Grain helper attributes MIT DesLauriers; library dual-licensed — prefer glsl-film-grain or own port if avoiding LYGIA terms |

Shadertoy default terms are per-shader; do not assume MIT. Prefer Quilez’s
article-embedded listings + MIT repos when shipping production GLSL.

---

## Fit for `@base/shaders`

All nine are single-pass (or Flowmap’s dedicated buffer + one present pass)
fullscreen fragment looks compatible with current `Shader.Root`
(Triangle + Program + RAF uniform sync). None require StyleX or `@base/ui`.
Flow is the only candidate that clearly wants a **Root-level** pointer /
flow helper (aligns with map #25 pointer grill #28); Ripple / Blobs can
consume a simpler `uPointer` vec2 if Root exposes it.

Out of scope here: locking names, implementing presets, stackable layers,
or a shaders.com-style editor.

---

## Sources (index)

1. [oframe/ogl README — fullscreen shader](https://github.com/oframe/ogl/blob/master/README.md)
2. [OGL triangle-screen-shader.html](https://github.com/oframe/ogl/blob/master/examples/triangle-screen-shader.html)
3. [OGL mouse-flowmap.html](https://github.com/oframe/ogl/blob/master/examples/mouse-flowmap.html)
4. Quilez — [Domain Warping](https://iquilezles.org/articles/warp/)
5. Quilez — [Palettes](https://iquilezles.org/articles/palettes/)
6. Quilez — [Voronoise](https://iquilezles.org/articles/voronoise/)
7. Quilez — [Simple Water](https://iquilezles.org/articles/simplewater/)
8. Shadertoy — Hoskins [MdlXz8](https://www.shadertoy.com/view/MdlXz8)
9. [mattdesl/glsl-film-grain](https://github.com/mattdesl/glsl-film-grain) (MIT)
10. Martins Upitis — [Film Grain post](http://devlog-martinsh.blogspot.com/2013/05/image-imperfections-and-film-grain-post.html)
11. [tuxalin/procedural-tileable-shaders](https://github.com/tuxalin/procedural-tileable-shaders) (MIT)
12. Book of Shaders — [Cellular Noise](https://thebookofshaders.com/12/) (©; pedagogy only)
13. Local — `packages/shaders/src/presets/auroraFragment.ts`
