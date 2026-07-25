# Research: VisX + D3 package set for v1 charts

**Issue:** [#17](https://github.com/hbeus/Base/issues/17)  
**Map:** [#16](https://github.com/hbeus/Base/issues/16)  
**Question:** Which `@visx/*` packages (and focused `d3-*` utilities) should `@base/charts` depend on for v1 bar, line, area, and donut — and what constraints does that choice impose for integrating `motion/react` animations?

**Sources:** VisX docs/repo (`airbnb/visx`), D3 module docs (`d3js.org`), Motion React docs (`motion.dev`). No secondary blog posts.

---

## Verdict (gist)

Compose **low-level VisX primitives** for v1 — **do not** take `@visx/xychart` as the chart shell. Pin VisX **`^4.0.0`**. Treat D3 as **vendored-through-VisX** (`@visx/vendor` / shape+scale wrappers), not a kitchen-sink `d3` import. Animate with **`motion/react`** around VisX geometry (SVG attrs / path `d`), and honor reduced motion via Motion’s APIs. XYChart’s `Animated*` path is a hard miss: it peers **`@react-spring/web`** and has **no pie/donut**.

---

## Options compared

### A. `@visx/xychart` (high-level cartesian)

From the package README ([`packages/visx-xychart/README.md`](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/README.md)):

- High-level x/y chart API with modular React context (theme, scales, data, events, tooltips).
- Out-of-box series: Area, Bar, BarGroup, BarStack, Glyph, Line — each with **Animated** variants.
- Install note: `npm install --save @visx/xychart react-spring` — **`react-spring` is a required peer for `Animated*`**.
- `package.json` peers include `@react-spring/web` (`^9.7.5 || ^10.0.0`) and React 18/19 ([`visx-xychart/package.json`](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/package.json)).
- Animated path implementation imports `useSpring` / `animated` from `@react-spring/web` and `d3-interpolate-path` ([`AnimatedPath.tsx`](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/components/series/private/AnimatedPath.tsx)).
- Public exports include cartesian series/axis/grid/tooltip — **no `Pie` / `Arc` / donut** ([`visx-xychart/src/index.ts`](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/index.ts)).

**Fit for Base:** Poor for standing preferences. Forces a second animation stack (react-spring) if we want built-in series animation; fights first-class `motion/react`. Still need a separate donut path. XYChart theming (`buildChartTheme`) overlaps badly with StyleX / `@base/ui` tokens (see map #16 + ticket #18).

### B. Compose low-level `@visx/*` (recommended)

VisX’s own positioning ([docs home](https://airbnb.io/visx/docs), [root README](https://github.com/airbnb/visx/blob/master/README.md)):

1. Split packages → keep bundle small; start with what you need.
2. **Un-opinionated on purpose** — bring your own state, animation, CSS-in-JS.
3. **Not a charting library** — you build the charting library on primitives.

FAQ on animation ([root README](https://github.com/airbnb/visx/blob/master/README.md)): animation is intentionally not baked in; “since visx is react, it already supports all react animation libs.”

Simple bar example deps: `@visx/group` + `@visx/shape` + `@visx/scale` ([root README](https://github.com/airbnb/visx/blob/master/README.md)).

`@visx/shape` exports cover v1 geometry ([`visx-shape/src/index.ts`](https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/index.ts)):

| Chart | VisX surface |
|---|---|
| Bar | `Bar`, `BarGroup`, `BarStack`, `BarRounded` |
| Line | `LinePath` (+ `Line`) |
| Area | `Area`, `AreaClosed`, `AreaStack` |
| Donut | `Pie` / `Arc` with **`innerRadius` > 0** |

`Pie` defaults `innerRadius = 0` (pie); donut is the same component with a positive inner radius ([`Pie.tsx`](https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/shapes/Pie.tsx)). That matches D3: annular sectors via `arc.innerRadius` ([d3-shape arcs](https://d3js.org/d3-shape/arc)); angles from `d3.pie` ([d3-shape pies](https://d3js.org/d3-shape/pie)). Stacks are position intervals for areas/bars ([d3-shape stacks](https://d3js.org/d3-shape/stack)); VisX wraps these via `AreaStack` / `BarStack` / `stackOffset` / `stackOrder`.

**Fit for Base:** Matches compound API + shared cartesian shell + separate donut + motion-first animation. You own the charting layer (exactly VisX’s intended use).

### C. Hybrid (XYChart non-animated + motion)

Use XYChart’s non-`Animated*` series and wrap children with `motion/*`. Still inherits XYChart’s context/theme/tooltip model and still **does not** cover donut. Gains little over option B while coupling `@base/charts` to XYChart’s opinions. **Not recommended.**

---

## Recommended dependency list

Pin **all** `@visx/*` to the same major/minor line. Current stable: **visx 4** / React 18 or 19 ([README](https://github.com/airbnb/visx/blob/master/README.md), [MIGRATION.md](https://github.com/airbnb/visx/blob/master/MIGRATION.md)). As of 2026-07-26, `@visx/shape@4.0.0` published **2026-06-11** (~44 days) — clears `minimumReleaseAge: 10080` (7 days) in `pnpm-workspace.yaml`.

### Direct dependencies (`@base/charts`)

| Package | Role for v1 |
|---|---|
| `@visx/shape` | Bar / LinePath / Area* / Pie+Arc (donut) |
| `@visx/scale` | `scaleBand`, `scaleLinear`, `scaleTime`/`scaleUtc`, `scaleOrdinal`, helpers |
| `@visx/curve` | Line/area interpolation (`curveMonotoneX`, etc.; re-exports `@visx/vendor/d3-shape`) |
| `@visx/group` | SVG `<g>` positioning for cartesian + polar centers |
| `@visx/axis` | Shared cartesian axes |
| `@visx/grid` | Shared cartesian grid |
| `@visx/responsive` | `ParentSize` / `useParentSize` for container sizing |
| `@visx/event` | Local pointer coords for chart tooltip hit-testing |
| `motion` | Already in monorepo (`motion/react`); peer or dep of `@base/charts` — first-class mount / series / tooltip motion |

### Optional (add when a grill ticket locks the need)

| Package | When |
|---|---|
| `@visx/glyph` | Series markers on line/area |
| `@visx/legend` | If legends are not custom HTML/StyleX |
| `@visx/text` | Explicit if you outgrow axis’s transitive use |
| `@visx/tooltip` | Only if #23 wants its hooks/portal helpers; map already says chart-owned tooltip chrome |

### Explicit D3 access (no kitchen-sink `d3`)

Prefer **`@visx/vendor/<pkg>`** when you need D3 directly (ESM/CJS dual path) ([`@visx/vendor` README](https://github.com/airbnb/visx/blob/master/packages/visx-vendor/Readme.md)). Vendored modules include `d3-scale`, `d3-shape`, `d3-array`, `d3-path`, etc. ([`visx-vendor/package.json`](https://github.com/airbnb/visx/blob/master/packages/visx-vendor/package.json)).

| Utility | Primary source | Access pattern |
|---|---|---|
| Scales (band/linear/time/ordinal) | [d3-scale](https://d3js.org/d3-scale) | Prefer `@visx/scale` wrappers; vendor only for escapes |
| Line / area / arc / pie / stack | [d3-shape](https://d3js.org/d3-shape) | Prefer `@visx/shape` + `@visx/curve`; `Pie`/`Arc` already wrap pie+arc |
| Domain helpers (`extent`, `max`, …) | [d3-array](https://d3js.org/d3-array) | `@visx/vendor/d3-array` (or tiny local helpers) |

**Do not** depend on the umbrella `d3` package.  
**Do not** add `@visx/xychart`, `@visx/react-spring`, or `@react-spring/web` for v1.  
**Do not** adopt upcoming `@visx/theme` (4.1 migration notes) for Base — tokens stay in `@base/ui` (map #16 / ticket #18).

### Transitive (do not re-declare unless needed)

`@visx/shape` → `@visx/curve`, `@visx/group`, `@visx/scale`, `@visx/vendor`  
`@visx/axis` → `@visx/text`, `@visx/shape`, …  
`@visx/scale` → `@visx/vendor`

---

## Suggested layering for the brief

```
@base/charts (compound API)
├── shell/cartesian     @visx/responsive + group + scale + axis + grid
├── series/bar|line|area   @visx/shape (+ curve) → SVG nodes
├── shell/donut         @visx/shape Pie/Arc (innerRadius) + group
├── tooltip             @base/charts chrome + @visx/event (coords)
├── motion              motion/react on series/tooltip/mount
└── tokens              deep-import @base/ui/tokens/*.stylex  (#18)
```

- Shared **cartesian** shell for bar/line/area (scales, margins, axis, grid).
- **Donut** is a separate polar shell (no XYChart).
- VisX generates geometry; **Motion owns time**. StyleX owns paint.

---

## Motion / `motion/react` constraints from this choice

1. **No VisX-baked animation path.** Low-level packages do not animate; XYChart’s animated path is react-spring-only ([README](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/README.md), [`AnimatedPath.tsx`](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/components/series/private/AnimatedPath.tsx)). Choosing primitives means **we** implement mount + series-update + tooltip motion — aligned with the standing preference.

2. **Animate SVG via `motion.*`.** Motion documents per-element SVG components (`motion.path`, `motion.rect`, …), attribute animation, `pathLength` draw-on, and `d` morphing when paths are similar; dissimilar paths need an external mixer (e.g. Flubber) ([Motion SVG animation](https://motion.dev/docs/react-svg-animation)). Implication: prefer animating **stable attrs** (bar `y`/`height`, arc angles via custom props) over naive `d` morphs when point counts change; if path morph is required, budget a mixer (XYChart used `d3-interpolate-path` for the same reason).

3. **Children / render props.** Many VisX shapes accept `children` render overrides or render plain `<path>`/`<rect>`. Compound parts should either wrap VisX output in `motion.*` or use render props to emit `motion` elements — avoid fighting VisX’s default DOM if Motion needs refs on the leaf.

4. **Reduced motion.** Use `MotionConfig` `reducedMotion="user"` and/or `useReducedMotion` to strip large transforms / keep opacity-style transitions ([Motion accessibility](https://motion.dev/docs/react-accessibility)). Chart-specific: disable pathLength / layout slides under reduced motion; keep educational opacity fades if desired (ticket #22).

5. **Tooltip motion is chart-owned.** `@visx/event` for coordinates; animate the `@base/charts` tooltip with Motion — do not inherit XYChart Tooltip animation semantics.

6. **Single animation library.** Declining XYChart avoids shipping react-spring beside `motion` (VisX FAQ explicitly warns against animation-library bloat).

---

## Version / freshness notes

| Constraint | Status |
|---|---|
| React 19 | VisX 4 peers `react` `^18 \|\| ^19` |
| pnpm `minimumReleaseAge: 10080` | VisX 4.0.0 ~44d old as of 2026-07-26 — OK |
| Align majors | Upgrade all `@visx/*` together ([MIGRATION.md](https://github.com/airbnb/visx/blob/master/MIGRATION.md)) |
| Vendor pin drift | `@visx/vendor` pins older `d3-*` (e.g. `d3-scale@4.0.2`, `d3-shape@3.2.0`) — prefer vendor path over parallel latest `d3-*` to avoid dual copies |

---

## Out of scope (other tickets)

- StyleX → SVG paint (#18)
- Domain vocabulary / compound API / motion vocabulary / tooltip API (#19–#23)
- Locked brief + ADR (#24)
- Implementation of `@base/charts`

---

## Sources (primary)

- https://airbnb.io/visx/docs  
- https://github.com/airbnb/visx/blob/master/README.md  
- https://github.com/airbnb/visx/blob/master/MIGRATION.md  
- https://github.com/airbnb/visx/blob/master/packages/visx-xychart/README.md  
- https://github.com/airbnb/visx/blob/master/packages/visx-xychart/package.json  
- https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/index.ts  
- https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/components/series/private/AnimatedPath.tsx  
- https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/index.ts  
- https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/shapes/Pie.tsx  
- https://github.com/airbnb/visx/blob/master/packages/visx-scale/src/index.ts  
- https://github.com/airbnb/visx/blob/master/packages/visx-curve/src/index.ts  
- https://github.com/airbnb/visx/blob/master/packages/visx-responsive/src/index.ts  
- https://github.com/airbnb/visx/blob/master/packages/visx-vendor/Readme.md  
- https://github.com/airbnb/visx/blob/master/packages/visx-vendor/package.json  
- https://github.com/airbnb/visx/blob/master/packages/visx-react-spring/package.json  
- https://d3js.org/d3-scale  
- https://d3js.org/d3-shape/arc  
- https://d3js.org/d3-shape/pie  
- https://d3js.org/d3-shape/stack  
- https://d3js.org/d3-array  
- https://motion.dev/docs/react-svg-animation  
- https://motion.dev/docs/react-accessibility  
