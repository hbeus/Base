# Research: StyleX theme tokens → VisX SVG

**Issue:** [#18](https://github.com/hbeus/Base/issues/18)  
**Map:** [#16](https://github.com/hbeus/Base/issues/16)  
**Question:** How should chart series/chrome colors from `@base/ui` StyleX theme variables (`defineVars` / `createTheme` on `<html>`) be applied to VisX SVG fills, strokes, and related attributes in a TanStack Start + StyleX setup?

**Sources:** StyleX docs (`stylexjs.com`), SVG 2 styling (`w3.org/TR/SVG/styling`), VisX docs/migration (`airbnb/visx`), plus our theme pipeline and app roots. No secondary blog posts.

---

## Verdict (gist)

Keep chart paint as **CSS custom properties** — pass StyleX color tokens (`colors.dataN`, chrome tokens) into VisX as `fill` / `stroke` (they compile to `var(--x…)`), and let the existing `createTheme` class on `<html>` re-resolve them on palette/scheme switch. Prefer that over `getComputedStyle` or baking resolved `oklch(…)` into every mark. Use the generated `THEME` / `modeToVars` path only when JS needs a concrete color (meta tags, canvas, luminance math). Do **not** adopt `@visx/theme` / XYChart `buildChartTheme` as the token source.

---

## How our theme pipeline works (facts)

### StyleX variables + themes

`stylex.defineVars` creates **global CSS custom properties** (hashed names by default). Values from that group are used inside `stylex.create` and resolve through the cascade.

Source: [stylex.defineVars](https://stylexjs.com/docs/api/javascript/defineVars), [Defining variables](https://stylexjs.com/docs/learn/theming/defining-variables)

`stylex.createTheme(vars, overrides)` returns a StyleX styles object applied with `stylex.props(theme)` on an ancestor; overrides apply to that subtree. Un-overridden keys fall back to `defineVars` defaults.

Source: [stylex.createTheme](https://stylexjs.com/docs/api/javascript/createTheme), [Creating themes](https://stylexjs.com/docs/learn/theming/creating-themes)

StyleX’s using-variables guide: variables are **CSS identifiers**; they are not for general JS value computation.

Source: [Using variables](https://stylexjs.com/docs/learn/theming/using-variables)

### Base generator + tokens

`packages/ui/scripts/generate-themes.ts` writes `packages/ui/src/tokens/themes.stylex.ts`:

- `THEME` — raw LCH triples / structured mode data per palette × scheme
- `colors = stylex.defineVars(modeToVars(default.dark))` — defaults are **default-dark** full `oklch(…)` strings
- `defaultLight` / `blueberryDark` / … = `stylex.createTheme(colors, …)` for every non-default-dark combo
- `themeMap` — `'palette-scheme' → theme | null` (`default-dark` is `null` → defaults only)
- `themeBackgrounds` — concrete `oklch(…)` strings for cases that need resolved paint (e.g. `<meta name="theme-color">`)

`modeToVars` in `packages/ui/src/utils/generate-theme.ts` is the single mapping from `ThemeMode` → StyleX color leaves.

Agent contract (`packages/ui/AGENTS.md`): theming via `createTheme` on `<html>`; do not use CSS `light-dark()`.

### App application (TanStack Start)

Both `apps/web` and `apps/docs` `__root.tsx`:

1. `beforeLoad` → `getThemeFromCookie()` (`packages/shared/src/server/theme.ts`) so SSR and first paint share palette/scheme.
2. `ThemeProvider` holds React state; cookie write on change.
3. `RootDocument` applies `themeMap[themeKey]` via `stylex.props(theme)` as `className` (+ inline `style`) on **`<html>`**, plus `data-theme` / `data-palette`.

Compiled docs CSS confirms the model: `:root, .x10wiy40 { --x…: oklch(…); }` with theme classes swapping the same custom-property names. Atomic rules use `fill: var(--x…)` / `stroke: var(--x…)` for UI SVG (e.g. popover arrows).

### Existing SVG precedent in `@base/ui`

Overlay arrows (Popover, Menu, Select, …) style SVG through StyleX:

```ts
const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    // …
  },
});
// …stylex.props(arrowStyles.base, …)
```

That is the blessed path when we own the element. VisX owns many leaf `<rect>` / `<path>` nodes and exposes `fill` / `stroke` props instead.

---

## SVG: presentation attributes vs CSS

SVG 2: `fill`, `stroke`, etc. are **presentation attributes** — parsed as the corresponding CSS property value, author-level, specificity 0. The `style` attribute is a full CSS declaration list. Authors are steered toward CSS properties over presentation attributes for new work.

Source: [SVG 2 — Styling §6.6 Presentation attributes](https://www.w3.org/TR/SVG/styling.html#PresentationAttributes)

`var()` in presentation attributes is **implementation-uneven** for some properties (esp. lengths); `style="fill: var(--…)"` participates in normal CSS substitution. SVGWG discussion: [w3c/svgwg#1031](https://github.com/w3c/svgwg/issues/1031). For **paint** (`fill` / `stroke`), modern engines generally accept `var()` in both forms; prefer CSS (`style` / StyleX class) when unsure.

---

## VisX paint APIs (relevant to #17)

Low-level primitives (`@visx/shape`, axis, grid, …) are **prop-driven**: pass `fill` / `stroke` (and often `style` / `className`) on the SVG node. VisX does not read StyleX or our theme context.

`@visx/xychart`’s `buildChartTheme` wants concrete theme strings (`colors: string[]`, `gridColor`, …) for a JS theme object — a parallel token system, poor fit with StyleX on `<html>` (also conflicts with map preference to avoid XYChart as the shell; see #17 research branch).

`@visx/theme` (visx **4.1**, migration notes) scopes **shadcn-style** names (`--chart-1`, `--background`, …) via `ThemeScope` / hooks. It does **not** read StyleX hashed vars, and `theme="auto"` does not update JS-only values when a CSS class changes. Not a substitute for `@base/ui` tokens.

Sources: [visx-xychart README](https://github.com/airbnb/visx/blob/master/packages/visx-xychart/README.md), [MIGRATION.md — `@visx/theme`](https://github.com/airbnb/visx/blob/master/MIGRATION.md)

---

## Options compared

| Approach | Theme switch | SSR / hydration | Fits VisX props | Notes |
|---|---|---|---|---|
| **A. Pass StyleX tokens as `fill`/`stroke`** (`colors.data1` → `var(--x…)`) | Automatic via `<html>` theme class | Stable: same `var()` string server + client | Yes | Primary recommendation for series + chrome paint |
| **B. StyleX `create` + `className` / `style` on VisX nodes** | Automatic | Stable | When component forwards class/style | Same as UI arrows; use for chrome we wrap |
| **C. Resolve via `THEME` + `modeToVars` + `useTheme()`** | Needs React re-render on theme change | Stable if keyed from cookie theme on SSR | Yes (`oklch(…)`) | Use only when JS needs concrete color |
| **D. `getComputedStyle(el).getPropertyValue(--x…)`** | Needs DOM read after theme paint | Client-only; mismatch / flash risk | Yes after mount | Avoid for chart paint path |
| **E. `@visx/theme` / XYChart `buildChartTheme`** | Separate from StyleX | N/A / dual systems | Built-in | Reject — duplicates token ownership |

### Runtime shape of `colors.*`

After StyleX compile, token leaves are CSS value strings like `var(--x17xijtw)` (observed in docs build output for spacing/color groups). Passing that string as a React SVG `fill` prop is passing a **CSS paint value**, not performing JS color math — consistent with StyleX’s “CSS identifier” model. Do not interpolate, mix, or parse those strings in JS.

---

## SSR / hydration

- Cookie → `beforeLoad` → `ThemeProvider` initial state → `themeMap` class on `<html>` means the **same** custom-property overrides exist in SSR HTML and first client render.
- Marks painted with `var(--x…)` do not embed scheme-specific literals → **no hydration mismatch** when toggling would only change CSS variable definitions.
- Resolving with `getComputedStyle` on the server is impossible; on the client before theme CSS applies yields wrong/default values.
- Concrete `oklch` from `THEME` / `themeBackgrounds` is SSR-safe **if** derived from the same cookie-driven `palette` + `colorScheme` as `RootDocument` (pattern already used for `theme-color` meta).

---

## Theme switching

Toggling scheme/palette updates `themeMap[…]` on `<html>`. Any SVG still referencing `var(--x…)` via StyleX tokens updates in the next style recalculation **without** rewriting VisX props.

If charts instead store resolved `oklch` from `THEME`, they must subscribe to `useTheme()` (or equivalent) and recompute — more moving parts, easy to desync from the document theme class.

---

## Recommended pattern for `@base/charts`

1. **Tokens stay in `@base/ui`.** Deep-import `@base/ui/tokens/themes.stylex` (and future data-color leaves once #20 lands). Do not fork colors into `@base/charts`.

2. **Default paint path — CSS variables:**
   - Series: `fill={colors.data1}` / `stroke={colors.data1}` (or ordinal scale whose range is the `colors.data1…data8` token strings).
   - Chrome (axes, grid, ticks, reference lines): `colors.border`, `colors.foregroundSecondary`, surfaces, etc.
   - Where VisX forwards `style`/`className`, StyleX `create({ mark: { fill: colors.data1 } })` is equally valid and matches Popover-arrow precedent.

3. **Prefer CSS when presentation-attribute `var()` is doubtful** — e.g. `style={{ fill: colors.data1 }}` or a StyleX class — especially for non-paint experiments; for fill/stroke, attribute form is acceptable in current Chromium/WebKit/Firefox for paint.

4. **Resolved colors only on demand** — helper keyed by `ThemeKey` / `useTheme()`, built from `THEME` + `modeToVars` (same as generator), for:
   - `<meta>` / Open Graph style needs
   - Canvas / WebGL
   - Contrast / luminance / forced non-CSS consumers  
   Not for ordinary SVG series paint.

5. **Do not** `getComputedStyle` for the default chart theme bridge.

6. **Do not** wire `@visx/theme` `ThemeScope` or XYChart `buildChartTheme` to own design tokens. If a future VisX helper wants a `colors: string[]`, pass our StyleX token strings (still `var(--x…)`) or, only if that API parses colors, the resolved `modeToVars` list.

7. **Ordinal scales:** `scaleOrdinal({ range: [colors.data1, … colors.data8] })` is fine for paint. Do not run D3 interpolators / `color-mod` on `var()` strings — use discrete categorical assignment or resolve via `THEME` first if you need geometric color math.

8. **Compound charts:** keep token → paint mapping inside `@base/charts` (series parts + chrome), not in docs demos, so theme switching stays automatic everywhere charts render under the app `RootDocument`.

---

## Out of scope / deferred

- Generating `data1…data8` + chrome token names (grilling #20).
- Implementing `@base/charts` or docs chart routes.
- Changing `generate-themes.ts` / StyleX setup.
- Whether to export stable `--` custom names from `defineVars` (StyleX supports keys starting with `--`); hashed names are fine if charts always go through the `colors` object.
