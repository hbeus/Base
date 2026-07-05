# @base/ui

## Structure

```
src/
  input/        Button, Input, Toggle, Pressable
  layout/       Card
  typography/   Text
  overlays/     Dialog
  alpha/        Unstable — deep-import only, not in barrel
  tokens/       spacing, size, elementSize, colors, radii, typography
  types/        polymorphic.ts (read before creating polymorphic components)
  utils/        styleArray, mergeProps, mergeRefs
  providers/    ComponentConfigProvider
```

## Key decisions

- **Token split**: `spacing` = padding/margin/gap, `size` = arbitrary dimensions, `elementSize` = component heights (sm/md/lg). Read the token files to see the scales.
- **No hardcoded values**: all colors, spacing, radii, and typography come from tokens. No raw px, hex, or font sizes.
- **Components import from barrel** (`@base/ui`), **tokens use deep imports** (`@base/ui/tokens/colors.stylex`).
- **`light-dark()` CSS function** for theming — single token set, no class swapping. Theme is controlled via `color-scheme` on `<html>`.
