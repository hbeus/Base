import { Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/guides/theming')({
  component: DocsPage,
});

const styles = stylex.create({
  page: {
    maxWidth: '720px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    marginBottom: spacing.s32,
  },
  section: {
    marginBottom: spacing.s32,
  },
  code: {
    fontFamily: "'SF Mono', 'Cascadia Code', 'Fira Code', monospace",
    fontSize: '0.8rem',
    lineHeight: 1.5,
    padding: spacing.s16,
    borderRadius: '8px',
    backgroundColor: colors.lighten4,
    overflowX: 'auto',
    whiteSpace: 'pre',
    display: 'block',
  },
  inlineCode: {
    fontFamily: "'SF Mono', 'Cascadia Code', 'Fira Code', monospace",
    fontSize: '0.85em',
    paddingInline: spacing.s4,
    paddingBlock: '2px',
    borderRadius: '4px',
    backgroundColor: colors.lighten6,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.8rem',
    fontVariantNumeric: 'tabular-nums',
  },
  th: {
    textAlign: 'left',
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    fontWeight: 600,
  },
  td: {
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  swatch: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  list: {
    paddingInlineStart: spacing.s20,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='heading' weight='semibold' style={{ marginBottom: spacing.s12 }}>
        {title}
      </Text>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return <code {...stylex.props(styles.code)}>{children}</code>;
}

function IC({ children }: { children: string }) {
  return <code {...stylex.props(styles.inlineCode)}>{children}</code>;
}

function DocsPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Flex direction='column' gap='s8'>
          <Text as='h1' size='display' weight='semibold'>
            Theme Builder
          </Text>
          <Text as='p' color='secondary'>
            OKLCH-based color theme generator with relative chroma for consistent perceived
            vividness across hues.
          </Text>
        </Flex>
      </header>

      <Section title='How it works'>
        <Flex direction='column' gap='s12'>
          <Text as='p' size='bodySm' color='secondary'>
            Every color token is generated from two parameters: <IC>lightness</IC> (0-1) and{' '}
            <IC>vividness</IC> (0-1, fraction of max chroma). The generator computes the maximum
            displayable chroma for a given lightness and hue within the sRGB gamut, then multiplies
            by vividness. This guarantees all colors are in-gamut regardless of what values you set.
          </Text>
          <Code>{`chroma = maxChroma(lightness, hue) × vividness

// maxChroma uses binary search to find the sRGB boundary
// vividness is clamped to [0, 1] — you can never go out of gamut`}</Code>
          <Text as='p' size='bodySm' color='secondary'>
            The problem this solves: in OKLCH, the maximum displayable chroma varies wildly by hue.
            Green (H=145) can reach chroma ~0.21 at L=0.67, while yellow (H=90) maxes out at ~0.14.
            Without relative chroma, you'd need to hand-tune every color to avoid clipping.
          </Text>
        </Flex>
      </Section>

      <Section title='Theme parameters'>
        <Flex direction='column' gap='s12'>
          <Text as='p' size='bodySm' color='secondary'>
            Each theme is defined by three parameters in <IC>CONFIGS</IC>:
          </Text>
          <div style={{ overflowX: 'auto' }}>
            <table {...stylex.props(styles.table)}>
              <thead>
                <tr>
                  <th {...stylex.props(styles.th)}>Parameter</th>
                  <th {...stylex.props(styles.th)}>Type</th>
                  <th {...stylex.props(styles.th)}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td {...stylex.props(styles.td)}>
                    <IC>brandHue</IC>
                  </td>
                  <td {...stylex.props(styles.td)}>number | null</td>
                  <td {...stylex.props(styles.td)}>
                    Hue angle (0-360) for accent, highlight, and hue harmonization. Null =
                    achromatic theme.
                  </td>
                </tr>
                <tr>
                  <td {...stylex.props(styles.td)}>
                    <IC>neutralTint</IC>
                  </td>
                  <td {...stylex.props(styles.td)}>number</td>
                  <td {...stylex.props(styles.td)}>
                    Tiny chroma added to foreground/background tokens for warmth or coolness.
                  </td>
                </tr>
                <tr>
                  <td {...stylex.props(styles.td)}>
                    <IC>stateHarmony</IC>
                  </td>
                  <td {...stylex.props(styles.td)}>number</td>
                  <td {...stylex.props(styles.td)}>
                    How much state hues rotate toward the brand hue (0 = canonical, 1 = fully
                    brand).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code>{`// Example theme configs
default:   { brandHue: null, neutralTint: 0,     stateHarmony: 0 }
blueberry: { brandHue: 275,  neutralTint: 0.015, stateHarmony: 0.15 }
warm:      { brandHue: 65,   neutralTint: 0.02,  stateHarmony: 0.12 }`}</Code>
        </Flex>
      </Section>

      <Section title='Two chroma strategies'>
        <Flex direction='column' gap='s12'>
          <Text as='p' size='bodySm' color='secondary'>
            The system uses two different approaches to chroma depending on the token's role:
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            Relative chroma (vividness)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Used by tokens where perceived saturation matters: state colors, highlight, accent
            buttons. Chroma is computed as <IC>maxChroma(L, H) × vividness</IC>, normalizing
            perceived vividness across different hues.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            Fixed chroma (neutralTint)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Used by foreground and background tokens. A tiny fixed chroma value (e.g. 0.015) is
            applied uniformly at every lightness level, giving the theme a consistent warm/cool
            temperature. Using vividness here would produce different absolute chroma at different
            lightness values, breaking the uniform tint.
          </Text>
        </Flex>
      </Section>

      <Section title='Color configs'>
        <Flex direction='column' gap='s12'>
          <Text as='p' size='bodySm' color='secondary'>
            Every token value is derived from an exported config in <IC>theme-config.ts</IC>. Edit
            any value and run <IC>pnpm generate:themes</IC> to regenerate.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            STATE_CONFIG — state colors (relative chroma)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Controls the 6 state colors. Each state has its own canonical hue, plus per-mode
            lightness and vividness. Warm hues use adjusted lightness/vividness to compensate for
            gamut constraints and the Helmholtz-Kohlrausch effect.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            HIGHLIGHT_CONFIG — focus ring (relative chroma)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Controls the highlight/focus color. Uses the brand hue (or blue H=240 for achromatic).
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            ACCENT_CONFIG — accent button (relative chroma)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Controls accent button bg, hover, and fg lightness. Includes explicit achromatic
            overrides for white/black accent buttons.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            PRIMARY_BUTTON_CONFIG — primary button (semi-transparent overlay)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Controls the brand-tinted overlay color (lightness + vividness) and opacity values for
            bg and hover states in both branded and achromatic modes.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            FOREGROUND_CONFIG — text colors (neutralTint)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Lightness-only config for primary, hover, and inverse text. Chroma comes from{' '}
            <IC>neutralTint</IC>, not vividness.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            BACKGROUND_CONFIG — surfaces (neutralTint)
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Lightness-only config for base and surface backgrounds. Same as foreground — chroma from{' '}
            <IC>neutralTint</IC>.
          </Text>
          <Text as='p' size='bodySm' weight='medium'>
            OPACITY_CONFIG — transparency multipliers
          </Text>
          <Text as='p' size='bodySm' color='secondary'>
            Controls opacity for secondary text (0.6), disabled elements (0.3), borders (0.08),
            inner shadows, and the elevated shadow composite layers.
          </Text>
        </Flex>
      </Section>

      <Section title='Editing and regenerating'>
        <Flex direction='column' gap='s12'>
          <Text as='p' size='bodySm' color='secondary'>
            The theme config lives at <IC>packages/ui/src/utils/theme-config.ts</IC>. The codegen
            script at <IC>packages/ui/scripts/generate-themes.ts</IC> runs the generator and writes
            static values to <IC>themes.stylex.ts</IC>. This two-step process exists because StyleX
            requires fully static string values in <IC>defineVars()</IC> and <IC>createTheme()</IC>{' '}
            — no function calls allowed at compile time.
          </Text>
          <Code>{`# Edit any config (STATE_CONFIG, HIGHLIGHT_CONFIG, ACCENT_CONFIG,
# PRIMARY_BUTTON_CONFIG, FOREGROUND_CONFIG, BACKGROUND_CONFIG,
# OPACITY_CONFIG) in packages/ui/src/utils/theme-config.ts
# Then regenerate:
pnpm generate:themes

# Preview at /showcase/themes`}</Code>
          <Text as='p' size='bodySm' color='secondary'>
            The safety guarantee: <IC>maxChroma(L, H)</IC> binary-searches for the sRGB boundary, so
            the output is always a valid sRGB color. You can freely change any lightness or
            vividness value without risk of gamut clipping.
          </Text>
        </Flex>
      </Section>

      <Section title='Adding a new theme'>
        <Flex direction='column' gap='s12'>
          <Code>{`// 1. Add to CONFIGS in theme-config.ts:
export const CONFIGS = {
  ...existing,
  ocean: { brandHue: 210, neutralTint: 0.01, stateHarmony: 0.1 },
};

// 2. Regenerate:
pnpm generate:themes

// 3. The codegen creates defineVars/createTheme exports
//    and adds entries to themeMap and themeBackgrounds.`}</Code>
        </Flex>
      </Section>
    </div>
  );
}
