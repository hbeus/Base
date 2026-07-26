# Research: VisX/D3 stack and group for cartesian shell

**Issue:** [#33](https://github.com/hbeus/Base/issues/33)  
**Map:** [#31](https://github.com/hbeus/Base/issues/31)  
**Question:** Which VisX / focused D3 APIs fit composing stacked and grouped bar/area layouts on our existing `CartesianChart` compound shell, without `@visx/xychart`?

**Sources:** d3-shape Stacks docs (Observable), `@visx/shape` 4.0.0 TypeScript API (`BarGroup`, `BarStack`, `AreaStack`, `Stack`, stack order/offset helpers), prior package-set research on composing low-level `@visx/*`.

---

## Verdict (gist)

Stay on low-level `@visx/shape` + `@visx/scale` (no XYChart).

- **Stacked bars:** `@visx/shape` `BarStack` (wraps d3-shape stack; series points `[y0, y1]`).  
- **Stacked areas:** `AreaStack` (same stack config).  
- **Grouped bars:** `BarGroup` with **two band scales** — `x0Scale` (category) + `x1Scale` (series keys within the band).  
- **Grouped areas:** not a first-class VisX primitive; either keep overlay multi-series (current) or offset manually — usually **grouped = bars only** for next wave.  
- Optionally call **`stack` from `@visx/vendor/d3-shape` / VisX `Stack`** when custom rendering is easier than `BarStack`/`AreaStack` children.

Data shape for stack/group helpers is **wide rows** (`{ x, seriesA, seriesB, … }`) with an explicit `keys` array — matches our current multi-series `dataKey` parts better than tidy long form (d3 docs still show tidy + `index`/`union` as the modern example; VisX BarGroup/BarStack examples use wide + `keys`).

---

## d3-shape stack (foundation)

`d3.stack()` does not draw; it computes per-series point arrays `[y0, y1]` (baseline/topline). Configure with `.keys()`, `.value()`, `.order()`, `.offset()` (defaults: key order, `d => d[key]`, `stackOrderNone`, `stackOffsetNone` / zero baseline).

Source: [d3-shape — Stacks](https://d3js.org/d3-shape/stack)

For our shell: y-domain becomes `[0, max topline]` (or diverging offset later — out of this map’s sequential/diverging fog).

---

## VisX `@visx/shape` primitives (v4.0.0)

Exported from `@visx/shape` (package index):

| Export | Role |
|---|---|
| `BarStack` / `BarStackHorizontal` | Stacked bars; `keys`, scales, `color`, optional `children(stacks)` |
| `AreaStack` | Stacked areas via same stack path config |
| `Stack` | Lower-level stack path helper |
| `BarGroup` / `BarGroupHorizontal` | Grouped bars; `x0` + `x0Scale` + `x1Scale` + `keys` + `yScale` |
| `stackOrder` / `stackOffset` | Named wrappers around d3 stack order/offset |

`BarStack` series points are documented as `[y0, y1]` with `.data` pointing at the input datum — same model as d3-shape.

Source: `@visx/shape` `lib/types/barStack.d.ts`, `lib/index.d.ts`

`BarGroup` docs in types: one group per datum; inner bars from `keys`; setup uses outer `scaleBand` for categories and inner `scaleBand` for keys (padding on both). Example gallery: airbnb.io/visx/bargroup.

Source: `@visx/shape` `lib/shapes/BarGroup.d.ts`

---

## Fit to current `CartesianChart`

Today:

- Single `scaleBand` on x categories  
- Single `scaleLinear` on y  
- Series parts (`Bar` / `Line` / `Area`) each plot one `dataKey` (overlay)

### Stacked

1. Collect registered series keys (or explicit `keys` / layout mode on Root).  
2. Run stack (via `BarStack`/`AreaStack` or d3 `stack().keys(keys)`).  
3. Expand y-domain to max stack topline.  
4. Render stacked geometry instead of independent `yScale(value)` bars/areas.  
5. Tooltips: values remain per key; optional show stack total.

Lines generally stay unstacked (or become range/band charts later — not required).

### Grouped

1. Keep `x0Scale = scaleBand` on categories (existing x).  
2. Add `x1Scale = scaleBand` with `domain = keys`, `range = [0, x0Scale.bandwidth()]`.  
3. Use `BarGroup` or equivalent math in `Bar` when layout=`group`.  
4. y-domain stays max of raw values (not stacked).

### API surface (for grilling #35 — facts only)

VisX wants `keys: Key[]` + wide data. Our compound can keep `CartesianChart.Bar dataKey="a"` × N and derive `keys` from registration, plus a Root/layout prop (`layout="overlay" | "stack" | "group"`) — exact API is the grill’s job.

---

## What not to use

- **`@visx/xychart`** — rejected in ADR-0002 / prior research (react-spring, no donut, fights StyleX).  
- **Re-implementing stack arithmetic** when `BarStack`/`AreaStack`/d3-shape already exist.  
- **Grouped areas as a v1 primitive** unless product insists — VisX doesn’t ship `AreaGroup`; overlay lines/areas already cover comparison.

---

## Recommended next-wave composition

| Layout | Bars | Areas | Lines |
|---|---|---|---|
| Overlay (current) | N× `Bar` | N× `Area` | N× `Line` |
| Stack | `BarStack` (or stacked `Bar` from stack series) | `AreaStack` | n/a / overlay only |
| Group | `BarGroup` + `x0`/`x1` band scales | overlay only | overlay only |

Dependencies: ensure `@visx/shape` already present (yes); stack order/offset optional later (`stackOffsetNone` default).

---

## Out of scope for this note

- Compound prop names / which part owns `layout` (grilling #35)  
- Streamgraph / wiggle / expand offsets  
- Horizontal bar variants (`BarStackHorizontal`) unless grill asks  
