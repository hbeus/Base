import { SurfaceLevel, Text, useSurface } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import {
  type SurfaceLevel as SurfaceLevelType,
  surfaceLight,
} from '@base/ui/tokens/surface.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { useTheme } from '~/providers/ThemeProvider';

export const Route = createFileRoute('/surface')({
  component: SurfacePage,
});

const styles = stylex.create({
  page: {
    maxWidth: '960px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    marginBottom: spacing.s48,
  },
  headerTitle: {
    marginBottom: spacing.s8,
  },
  section: {
    marginBottom: spacing.s64,
  },
  sectionTitle: {
    marginBottom: spacing.s24,
    paddingBottom: spacing.s12,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  box: {
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  nested: {
    marginTop: spacing.s12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: spacing.s8,
  },
  gridItem: {
    padding: spacing.s16,
    borderRadius: radii.r12,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
    aspectRatio: '1',
    justifyContent: 'flex-end',
  },
  dialogDemo: {
    padding: spacing.s24,
    borderRadius: radii.r16,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  dialogInner: {
    padding: spacing.s16,
    borderRadius: radii.r12,
    marginTop: spacing.s12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
});

function SurfaceBox({ label, children }: { label: string; children?: ReactNode }) {
  const bg = useSurface();
  return (
    <div {...stylex.props(bg, styles.box, children != null && styles.nested)}>
      <Text size='bodySm' weight='medium'>
        {label}
      </Text>
      {children}
    </div>
  );
}

function SurfaceGridItem({ level }: { level: SurfaceLevelType }) {
  return (
    <SurfaceLevel level={level}>
      <SurfaceGridItemInner level={level} />
    </SurfaceLevel>
  );
}

function SurfaceGridItemInner({ level }: { level: SurfaceLevelType }) {
  const bg = useSurface();
  return (
    <div {...stylex.props(bg, styles.gridItem)}>
      <Text size='title' weight='bold'>
        {level}
      </Text>
      <Text size='caption'>bgSurface-{level}</Text>
    </div>
  );
}

function SurfacePage() {
  const { colorScheme } = useTheme();

  return (
    <div {...stylex.props(styles.page, colorScheme === 'light' && surfaceLight)}>
      <div {...stylex.props(styles.header)}>
        <Text as='h1' size='headline' weight='bold' style={styles.headerTitle}>
          Surface Levels
        </Text>
        <Text size='body' color='secondary'>
          Proof of concept: 6 opaque surface levels (0-500) via React context.
        </Text>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text as='h2' size='title' weight='semibold' style={styles.sectionTitle}>
          All Levels
        </Text>
        <div {...stylex.props(styles.grid)}>
          <SurfaceGridItem level={0} />
          <SurfaceGridItem level={100} />
          <SurfaceGridItem level={200} />
          <SurfaceGridItem level={300} />
          <SurfaceGridItem level={400} />
          <SurfaceGridItem level={500} />
        </div>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text as='h2' size='title' weight='semibold' style={styles.sectionTitle}>
          Nested Auto-Increment
        </Text>
        <SurfaceBox label='Level 0 (page)'>
          <SurfaceLevel>
            <SurfaceBox label='Level 100 (auto)'>
              <SurfaceLevel>
                <SurfaceBox label='Level 200 (auto)'>
                  <SurfaceLevel>
                    <SurfaceBox label='Level 300 (auto)'>
                      <SurfaceLevel>
                        <SurfaceBox label='Level 400 (auto)'>
                          <SurfaceLevel>
                            <SurfaceBox label='Level 500 (auto)' />
                          </SurfaceLevel>
                        </SurfaceBox>
                      </SurfaceLevel>
                    </SurfaceBox>
                  </SurfaceLevel>
                </SurfaceBox>
              </SurfaceLevel>
            </SurfaceBox>
          </SurfaceLevel>
        </SurfaceBox>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text as='h2' size='title' weight='semibold' style={styles.sectionTitle}>
          Absolute Jump (Dialog Pattern)
        </Text>
        <Text size='bodySm' color='secondary' style={styles.nested}>
          Simulates a dialog that jumps to level 300, with inner surfaces at 400 and 500.
        </Text>
        <SurfaceLevel level={300}>
          <DialogDemo />
        </SurfaceLevel>
      </div>

      <div {...stylex.props(styles.section)}>
        <Text as='h2' size='title' weight='semibold' style={styles.sectionTitle}>
          Clamping at Max
        </Text>
        <Text size='bodySm' color='secondary' style={styles.nested}>
          Nesting beyond level 500 clamps — no crash, same shade.
        </Text>
        <SurfaceLevel level={500}>
          <SurfaceBox label='Level 500'>
            <SurfaceLevel>
              <SurfaceBox label='Level 500 (clamped)'>
                <SurfaceLevel>
                  <SurfaceBox label='Level 500 (still clamped)' />
                </SurfaceLevel>
              </SurfaceBox>
            </SurfaceLevel>
          </SurfaceBox>
        </SurfaceLevel>
      </div>
    </div>
  );
}

function DialogDemo() {
  const bg = useSurface();
  return (
    <div {...stylex.props(bg, styles.dialogDemo, styles.nested)}>
      <Text size='body' weight='medium'>
        Dialog Surface (Level 300)
      </Text>
      <SurfaceLevel>
        <DialogInnerCard />
      </SurfaceLevel>
    </div>
  );
}

function DialogInnerCard() {
  const bg = useSurface();
  return (
    <div {...stylex.props(bg, styles.dialogInner)}>
      <Text size='bodySm'>Inner card (Level 400)</Text>
      <SurfaceLevel>
        <DialogDeepCard />
      </SurfaceLevel>
    </div>
  );
}

function DialogDeepCard() {
  const bg = useSurface();
  return (
    <div {...stylex.props(bg, styles.dialogInner)}>
      <Text size='bodySm'>Deep card (Level 500)</Text>
    </div>
  );
}
