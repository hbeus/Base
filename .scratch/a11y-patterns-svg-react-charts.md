# Research: a11y patterns for SVG React charts

**Issue:** [#32](https://github.com/hbeus/Base/issues/32)  
**Map:** [#31](https://github.com/hbeus/Base/issues/31)  
**Question:** What accessibility patterns (ARIA roles/properties, keyboard interaction, screen-reader announcements, reduced-motion interplay) are recommended for SVG-based React charts like our VisX `CartesianChart` / `DonutChart`, and which are realistic as a v1.x baseline for `@base/charts`?

**Sources:** WAI-ARIA Graphics Module 1.0, WAI-ARIA 1.2, W3C ACT rule for SVG accessible names, WCAG 2.2 Understanding (1.1.1, 2.3.3), SVG Accessibility Chart Taxonomy (W3C Wiki — informative). Primary specs only; no secondary blogs.

---

## Verdict (gist)

Treat each chart SVG as a **named image** (`role="img"` + non-empty accessible name) for broad AT support; do **not** rely on Graphics Module chart taxonomy roles (`graphics-document` / proposed chart roles) as the baseline — support is inconsistent. Provide a **text alternative** (summary and/or data table). Keep pointer tooltips; add a **keyboard path** to the same values. Use **`aria-live="polite"`** (or `status`) for value announcements on focus/selection — not `alert`. Honor **`prefers-reduced-motion`** for non-essential series/tooltip motion (already partly in place). Defer deep SVG structure navigation and full Graphics Module chart roles to later.

---

## Roles and naming

### WAI-ARIA Graphics Module

The Graphics Module defines `graphics-document`, `graphics-object`, and `graphics-symbol` for structured graphics. It explicitly notes that future work would expand annotation for data-rich charts/maps; the module itself does not ship a complete chart widget pattern.

Source: [WAI-ARIA Graphics Module 1.0](https://www.w3.org/TR/graphics-aria-1.0/)

`img` is defined as a single graphic perceived as an indivisible whole — children are presentational; unlike `graphics-document`, it is not meant for navigable interactive child content.

Source: same TR, role `img` characteristics

### Practical SVG naming (ACT)

W3C ACT rule **7d6734**: SVG elements with explicit role `img`, `graphics-document`, or `graphics-symbol` that are in the accessibility tree need a **non-empty accessible name**. The rule notes browser/AT support for SVG and `graphics-document` is **inconsistent**, and that combining WAI-ARIA with `role="img"` on non-decorative SVG **significantly improves** support.

Source: [SVG element with explicit role has non-empty accessible name](https://www.w3.org/WAI/standards-guidelines/act/rules/7d6734/)

### Chart taxonomy (informative, not Rec)

The W3C Wiki chart taxonomy proposes richer roles (`graphics-datagroup`, guides, etc.) for explorability. That work is **not** a Recommendation and is not a safe v1 baseline dependency.

Source: [SVG Accessibility/Chart Taxonomy](https://www.w3.org/wiki/SVG_Accessibility/Chart_Taxonomy)

### Implication for `@base/charts`

Today Roots already set `role="img"` on the SVG without a guaranteed accessible name. Baseline should keep `role="img"` (or equivalent on a wrapping figure) and require a **name**: `aria-label` / `aria-labelledby` / visible title wired via `aria-labelledby`. Prefer a sibling/caption pattern for docs demos.

Do **not** make `graphics-document` + child exploration the v1.x baseline.

---

## Text alternatives (WCAG 1.1.1)

Non-text content needs a text alternative that serves the equivalent purpose (with listed exceptions). A chart that conveys data needs more than a decorative label — typically a **short name** plus a longer description and/or an accessible **data table**.

Source: [Understanding SC 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)

**Baseline:** Root API for `aria-label` / `aria-labelledby` (+ optional `aria-describedby` pointing at a description or table id). Docs examples include a summary or table. Full “sonification” / structured chart navigation is later.

---

## Keyboard interaction

Neither Graphics Module nor ACT prescribe a chart keyboard widget. For interactive exploration (our pointer hit-testing + Chart tooltip), WCAG operable content implies a keyboard-accessible path when the interaction is required to get the information (see WCAG 2.1.1 Keyboard — not re-fetched here; treat as known SC).

**Realistic baseline:**

- Chart host or a focusable control in the compound (`tabIndex={0}` on a dedicated explorer region, not every mark)  
- Arrow keys (or similar) move the active datum/index that already drives tooltip/crosshair  
- Escape clears selection  
- Focus visible styles from the design system  

**Later:** roving tabindex across individual marks; full APG-style grid for dense data.

---

## Screen-reader announcements (live regions)

WAI-ARIA 1.2: live regions (`aria-live`, etc.) announce updates when focus may be elsewhere. `aria-live="polite"` waits for idle; `assertive` interrupts. Role `status` is a live region; `alert` is assertive and for important/time-sensitive messages.

Source: [WAI-ARIA 1.2 — live regions / `alert`](https://www.w3.org/TR/wai-aria-1.2/)

APG Alert pattern: alerts must not steal keyboard focus; avoid using alert for routine UI chatter.

Source: [APG Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

**Baseline:** When the active index changes via keyboard (and optionally pointer), update a visually hidden (or tooltip-linked) node with `aria-live="polite"` / `role="status"` describing category + series values. Do **not** use `alert` for hover scrubbing.

**Later:** announce on every pointer move (often too noisy); configurable politeness.

---

## Reduced motion

WCAG 2.3.3 Animation from Interactions (AAA): non-essential motion from interaction can be disabled; sufficient techniques include CSS/`prefers-reduced-motion` in JS.

Source: [Understanding SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

`@base/charts` already snaps series/tooltip motion when `useReducedMotion()` / `animate={false}`.

**Baseline:** Keep that contract; document it; ensure mount animations and tooltip transitions both honor reduced motion (no essential-data-only exception needed for decorative geometry motion).

---

## VisX-specific note

VisX is unopinionated on a11y (composition library, not a charting accessibility layer). No first-party VisX “chart a11y” package replaces the patterns above — responsibility sits in `@base/charts` compounds.

---

## Recommended v1.x baseline vs later

| Area | v1.x baseline | Later |
|---|---|---|
| Role | `role="img"` (or figure+img) on chart graphic | Graphics Module / chart taxonomy exploration |
| Name | Required `aria-label` or `aria-labelledby` | Auto-generated names from data |
| Description | Optional `aria-describedby` + docs table/summary pattern | Built-in data-table part |
| Keyboard | Focusable explorer; arrows move active index; same tooltip model | Per-mark roving tabindex |
| Live region | Polite status for keyboard-driven active point | Pointer scrub announcements; verbosity settings |
| Motion | Honor `prefers-reduced-motion` + `animate={false}` | User-level chart motion prefs beyond OS |

---

## Out of scope for this note

- Locking the compound API prop names (grilling #34)  
- Implementing the baseline  
- WCAG conformance claims for the whole docs site  
