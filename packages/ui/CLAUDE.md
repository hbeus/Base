# @base/ui

## Structure

```
src/
  components/
    input/        Button, Input, Toggle, Pressable
    layout/       Card
    typography/   Text
    overlays/     Dialog
    alpha/        Unstable — deep-import only, not in barrel
  tokens/         spacing, size, elementSize, colors, radii, typography
  types/          polymorphic.ts (read before creating polymorphic components)
  utils/          styleArray, mergeRefs
```

## Key decisions

- **Token split**: `spacing` = padding/margin/gap, `size` = arbitrary dimensions, `elementSize` = component heights (sm/md/lg). Read the token files to see the scales.
- **No hardcoded values**: all colors, spacing, radii, and typography come from tokens. No raw px, hex, or font sizes.
- **Components import from barrel** (`@base/ui`), **tokens use deep imports** (`@base/ui/tokens/colors.stylex`).
- **Theming via `stylex.createTheme()`**: dark values are defaults in `defineVars()`, light overrides in `lightTheme` via `createTheme()`. Applied as a className on `<html>`. Do not use `light-dark()` CSS function — LightningCSS mangles it.
