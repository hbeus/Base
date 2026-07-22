import { Accordion, Button, Card, Dialog, Flex, Input, Pressable, Switch, Text } from '@base/ui';
import { elementSize } from '@base/ui/tokens/elementSize.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const Route = createFileRoute('/tokens/overview')({
  component: OverviewPage,
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
  subsection: {
    marginBottom: spacing.s32,
  },
  subsectionTitle: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
  },
  swatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: spacing.s8,
  },
  swatch: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
    alignItems: 'center',
  },
  swatchBox: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  swatchBoxSmall: {
    width: '100%',
    height: spacing.s40,
    borderRadius: radii.r8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  rampGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: spacing.s8,
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s12,
    alignItems: 'center',
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  previewColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mono: {
    fontFamily: typography.fontMono,
  },
  radiiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: spacing.s12,
  },
  radiiBox: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: colors.lighten8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s12,
  },
  spacingLabel: {
    minWidth: '48px',
  },
  spacingBar: {
    height: spacing.s16,
    backgroundColor: colors.highlight,
    borderRadius: radii.r4,
  },
  elementSizeBar: {
    backgroundColor: colors.lighten8,
    borderRadius: radii.r8,
    display: 'flex',
    alignItems: 'center',
    paddingInline: spacing.s12,
  },
});

const swatchColors = stylex.create({
  background: { backgroundColor: colors.background },
  foregroundPrimary: { backgroundColor: colors.foregroundPrimary },
  foregroundPrimaryHover: { backgroundColor: colors.foregroundPrimaryHover },
  foregroundPrimaryInverse: { backgroundColor: colors.foregroundPrimaryInverse },
  foregroundSecondary: { backgroundColor: colors.foregroundSecondary },
  foregroundSecondaryHover: { backgroundColor: colors.foregroundSecondaryHover },
  foregroundSecondaryInverse: { backgroundColor: colors.foregroundSecondaryInverse },
  foregroundDisabled: { backgroundColor: colors.foregroundDisabled },
  border: { backgroundColor: colors.border },
  highlight: { backgroundColor: colors.highlight },
  highlightForeground: { backgroundColor: colors.highlightForeground },
  statePositive: { backgroundColor: colors.statePositive },
  stateNegative: { backgroundColor: colors.stateNegative },
  surface300: { backgroundColor: colors.surface300 },
  focusOutline: { backgroundColor: colors.focusOutline },
  lighten4: { backgroundColor: colors.lighten4 },
  lighten6: { backgroundColor: colors.lighten6 },
  lighten8: { backgroundColor: colors.lighten8 },
  lighten12: { backgroundColor: colors.lighten12 },
  lighten16: { backgroundColor: colors.lighten16 },
  lighten50: { backgroundColor: colors.lighten50 },
  darken4: { backgroundColor: colors.darken4 },
  darken6: { backgroundColor: colors.darken6 },
  darken8: { backgroundColor: colors.darken8 },
  darken12: { backgroundColor: colors.darken12 },
  darken16: { backgroundColor: colors.darken16 },
  darken50: { backgroundColor: colors.darken50 },
  hover4: { backgroundColor: colors.hover4 },
  hover6: { backgroundColor: colors.hover6 },
  hover8: { backgroundColor: colors.hover8 },
  hover12: { backgroundColor: colors.hover12 },
  hover16: { backgroundColor: colors.hover16 },
  buttonAccentBg: { backgroundColor: colors.buttonAccentBg },
  buttonAccentFg: { backgroundColor: colors.buttonAccentFg },
  buttonAccentHover: { backgroundColor: colors.buttonAccentHover },
  buttonPrimaryBg: { backgroundColor: colors.buttonPrimaryBg },
  buttonPrimaryFg: { backgroundColor: colors.buttonPrimaryFg },
  buttonPrimaryHover: { backgroundColor: colors.buttonPrimaryHover },
});

const spacingBarWidths = stylex.create({
  s1: { width: spacing.s1 },
  s2: { width: spacing.s2 },
  s4: { width: spacing.s4 },
  s6: { width: spacing.s6 },
  s8: { width: spacing.s8 },
  s10: { width: spacing.s10 },
  s12: { width: spacing.s12 },
  s14: { width: spacing.s14 },
  s16: { width: spacing.s16 },
  s18: { width: spacing.s18 },
  s20: { width: spacing.s20 },
  s24: { width: spacing.s24 },
  s28: { width: spacing.s28 },
  s32: { width: spacing.s32 },
  s40: { width: spacing.s40 },
  s48: { width: spacing.s48 },
  s56: { width: spacing.s56 },
  s64: { width: spacing.s64 },
  s72: { width: spacing.s72 },
  s80: { width: spacing.s80 },
  s96: { width: spacing.s96 },
  s112: { width: spacing.s112 },
  s128: { width: spacing.s128 },
});

const elementSizeHeights = stylex.create({
  xs: { height: elementSize.xs },
  sm: { height: elementSize.sm },
  md: { height: elementSize.md },
  lg: { height: elementSize.lg },
  xl: { height: elementSize.xl },
});

const radiiBoxStyles = stylex.create({
  r2: { borderRadius: radii.r2 },
  r4: { borderRadius: radii.r4 },
  r6: { borderRadius: radii.r6 },
  r8: { borderRadius: radii.r8 },
  r10: { borderRadius: radii.r10 },
  r12: { borderRadius: radii.r12 },
  r16: { borderRadius: radii.r16 },
  r20: { borderRadius: radii.r20 },
  r24: { borderRadius: radii.r24 },
  r32: { borderRadius: radii.r32 },
  full: { borderRadius: radii.full },
});

function Swatch({
  name,
  colorStyle,
  small,
}: {
  name: string;
  colorStyle: stylex.StyleXStyles;
  small?: boolean;
}) {
  return (
    <div {...stylex.props(styles.swatch)}>
      <div {...stylex.props(small ? styles.swatchBoxSmall : styles.swatchBox, colorStyle)} />
      <Text size='caption' color='secondary' style={styles.mono}>
        {name}
      </Text>
    </div>
  );
}

function ColorTokensSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Color Tokens
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Core
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='background' colorStyle={swatchColors.background} />
          <Swatch name='surface300' colorStyle={swatchColors.surface300} />
          <Swatch name='border' colorStyle={swatchColors.border} />
          <Swatch name='highlight' colorStyle={swatchColors.highlight} />
          <Swatch name='highlightFg' colorStyle={swatchColors.highlightForeground} />
          <Swatch name='focusOutline' colorStyle={swatchColors.focusOutline} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Foreground
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='primary' colorStyle={swatchColors.foregroundPrimary} />
          <Swatch name='primaryHover' colorStyle={swatchColors.foregroundPrimaryHover} />
          <Swatch name='primaryInverse' colorStyle={swatchColors.foregroundPrimaryInverse} />
          <Swatch name='secondary' colorStyle={swatchColors.foregroundSecondary} />
          <Swatch name='secondaryHover' colorStyle={swatchColors.foregroundSecondaryHover} />
          <Swatch name='secondaryInverse' colorStyle={swatchColors.foregroundSecondaryInverse} />
          <Swatch name='disabled' colorStyle={swatchColors.foregroundDisabled} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          State
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='positive' colorStyle={swatchColors.statePositive} />
          <Swatch name='negative' colorStyle={swatchColors.stateNegative} />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Lighten Ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.lighten4} small />
          <Swatch name='6' colorStyle={swatchColors.lighten6} small />
          <Swatch name='8' colorStyle={swatchColors.lighten8} small />
          <Swatch name='12' colorStyle={swatchColors.lighten12} small />
          <Swatch name='16' colorStyle={swatchColors.lighten16} small />
          <Swatch name='50' colorStyle={swatchColors.lighten50} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Darken Ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.darken4} small />
          <Swatch name='6' colorStyle={swatchColors.darken6} small />
          <Swatch name='8' colorStyle={swatchColors.darken8} small />
          <Swatch name='12' colorStyle={swatchColors.darken12} small />
          <Swatch name='16' colorStyle={swatchColors.darken16} small />
          <Swatch name='50' colorStyle={swatchColors.darken50} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Hover Ramp
        </Text>
        <div {...stylex.props(styles.rampGrid)}>
          <Swatch name='4' colorStyle={swatchColors.hover4} small />
          <Swatch name='6' colorStyle={swatchColors.hover6} small />
          <Swatch name='8' colorStyle={swatchColors.hover8} small />
          <Swatch name='12' colorStyle={swatchColors.hover12} small />
          <Swatch name='16' colorStyle={swatchColors.hover16} small />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Button
        </Text>
        <div {...stylex.props(styles.swatchGrid)}>
          <Swatch name='accentBg' colorStyle={swatchColors.buttonAccentBg} />
          <Swatch name='accentFg' colorStyle={swatchColors.buttonAccentFg} />
          <Swatch name='accentHover' colorStyle={swatchColors.buttonAccentHover} />
          <Swatch name='primaryBg' colorStyle={swatchColors.buttonPrimaryBg} />
          <Swatch name='primaryFg' colorStyle={swatchColors.buttonPrimaryFg} />
          <Swatch name='primaryHover' colorStyle={swatchColors.buttonPrimaryHover} />
        </div>
      </div>
    </section>
  );
}

function ButtonSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Button
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Variants
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button variant='accent'>Accent</Button>
          <Button>Primary</Button>
          <Button variant='ghost'>Ghost</Button>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button size='xs'>Extra Small</Button>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Rounded
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button variant='accent' rounded>
            Accent
          </Button>
          <Button rounded>Primary</Button>
          <Button variant='ghost' rounded>
            Ghost
          </Button>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Fill
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button variant='accent' fill>
            Accent Fill
          </Button>
          <Button fill>Primary Fill</Button>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Disabled
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button variant='accent' disabled>
            Accent
          </Button>
          <Button disabled>Primary</Button>
          <Button variant='ghost' disabled>
            Ghost
          </Button>
        </div>
      </div>
    </section>
  );
}

function InputSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Input
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input size='sm' placeholder='Small input' />
          <Input size='md' placeholder='Medium input' />
          <Input size='lg' placeholder='Large input' />
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          States
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input placeholder='Default' />
          <Input placeholder='Disabled' disabled />
        </div>
      </div>
    </section>
  );
}

function ToggleSection() {
  const [checked, setChecked] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Switch
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Small</Text>
            <Switch size='sm' checked={checked} onCheckedChange={setChecked} />
          </div>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Medium</Text>
            <Switch size='md' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Disabled
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Disabled off</Text>
            <Switch disabled checked={false} onCheckedChange={() => {}} />
          </div>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Disabled on</Text>
            <Switch disabled checked onCheckedChange={() => {}} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PressableSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Pressable
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Inset (hover to see)
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Pressable inset='s4'>
            <Text size='bodySm'>Inset s4</Text>
          </Pressable>
          <Pressable inset='s8'>
            <Text size='bodySm'>Inset s8</Text>
          </Pressable>
          <Pressable inset='s12'>
            <Text size='bodySm'>Inset s12</Text>
          </Pressable>
          <Pressable inset='s16'>
            <Text size='bodySm'>Inset s16</Text>
          </Pressable>
        </div>
      </div>
    </section>
  );
}

function CardSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Card
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Variants
        </Text>
        <Flex direction='column' gap='s16'>
          <Card variant='filled'>
            <Text size='bodySm' weight='medium'>
              Filled (default)
            </Text>
            <Text size='caption' color='secondary'>
              Uses lighten4 background
            </Text>
          </Card>
          <Card variant='outline'>
            <Text size='bodySm' weight='medium'>
              Outline
            </Text>
            <Text size='caption' color='secondary'>
              Transparent background with border
            </Text>
          </Card>
          <Card darken>
            <Text size='bodySm' weight='medium'>
              Darken
            </Text>
            <Text size='caption' color='secondary'>
              Uses darken4 background
            </Text>
          </Card>
        </Flex>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Padding
        </Text>
        <Flex direction='column' gap='s16'>
          <Card padding='none'>
            <Text size='caption' color='secondary'>
              padding: none
            </Text>
          </Card>
          <Card padding='sm'>
            <Text size='caption' color='secondary'>
              padding: sm
            </Text>
          </Card>
          <Card padding='md'>
            <Text size='caption' color='secondary'>
              padding: md (default)
            </Text>
          </Card>
          <Card padding='lg'>
            <Text size='caption' color='secondary'>
              padding: lg
            </Text>
          </Card>
        </Flex>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Direction & Gap
        </Text>
        <Flex direction='column' gap='s16'>
          <Card direction='row' gap='s8'>
            <Card>
              <Text size='caption'>Row 1</Text>
            </Card>
            <Card>
              <Text size='caption'>Row 2</Text>
            </Card>
            <Card>
              <Text size='caption'>Row 3</Text>
            </Card>
          </Card>
          <Card direction='column' gap='s8'>
            <Card>
              <Text size='caption'>Column 1</Text>
            </Card>
            <Card>
              <Text size='caption'>Column 2</Text>
            </Card>
          </Card>
        </Flex>
      </div>
    </section>
  );
}

function AccordionSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Accordion
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Default (single)
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='First item'>
            <Text weight='regular' color='secondary'>
              Only one item can be open at a time in single mode.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Second item'>
            <Text weight='regular' color='secondary'>
              Opening this item closes the previous one.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Third item'>
            <Text weight='regular' color='secondary'>
              Panels animate with spring physics via motion.dev.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Multiple
        </Text>
        <Accordion.Root multiple>
          <Accordion.Item trigger='Section A'>
            <Text weight='regular' color='secondary'>
              Multiple items can be expanded simultaneously.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Section B'>
            <Text weight='regular' color='secondary'>
              Try opening both sections at once.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Disabled
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='Enabled'>
            <Text weight='regular' color='secondary'>
              This item works normally.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Disabled' disabled>
            <Text weight='regular' color='secondary'>
              This item cannot be toggled.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </section>
  );
}

function DialogSection() {
  const [open, setOpen] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Dialog
      </Text>

      <div {...stylex.props(styles.preview)}>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={<Button variant='primary' />}>Open dialog</Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Content>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                  <Dialog.Description>
                    A compound component dialog with backdrop, animated enter/exit, title,
                    description, and footer with action buttons.
                  </Dialog.Description>
                  <Dialog.Footer>
                    <Dialog.Close render={<Button variant='ghost' size='sm' />}>
                      Cancel
                    </Dialog.Close>
                    <Dialog.Close render={<Button size='sm' />}>Confirm</Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </section>
  );
}

function TextSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Text
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Scale
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Text size='hero'>Hero — 32px</Text>
          <Text size='display'>Display — 28px</Text>
          <Text size='headline'>Headline — 22px</Text>
          <Text size='title'>Title — 18px</Text>
          <Text size='body'>Body — 15px</Text>
          <Text size='bodySm'>Body Sm — 13px</Text>
          <Text size='label'>Label — 12px</Text>
          <Text size='caption'>Caption — 11px</Text>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Weights
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Text size='title' weight='regular'>
            Regular
          </Text>
          <Text size='title' weight='medium'>
            Medium
          </Text>
          <Text size='title' weight='semibold'>
            Semibold
          </Text>
          <Text size='title' weight='bold'>
            Bold
          </Text>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Colors
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Text size='body' color='primary'>
            Primary color
          </Text>
          <Text size='body' color='secondary'>
            Secondary color
          </Text>
        </div>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Modifiers
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Text size='body' uppercase>
            Uppercase text
          </Text>
          <Text size='body' capitalize>
            capitalize text
          </Text>
          <Text size='body' mono>
            Monospace text
          </Text>
          <Text size='body' tight>
            Tight line-height for compact layouts
          </Text>
        </div>
      </div>
    </section>
  );
}

function FlexSection() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Flex
      </Text>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Direction & Alignment
        </Text>
        <Flex direction='column' gap='s16'>
          <Card>
            <Text size='caption' color='secondary'>
              row / center / between
            </Text>
            <Flex direction='row' align='center' justify='between'>
              <Card padding='sm'>
                <Text size='caption'>A</Text>
              </Card>
              <Card padding='sm'>
                <Text size='caption'>B</Text>
              </Card>
              <Card padding='sm'>
                <Text size='caption'>C</Text>
              </Card>
            </Flex>
          </Card>
          <Card>
            <Text size='caption' color='secondary'>
              row / center / center / gap s8
            </Text>
            <Flex direction='row' align='center' justify='center' gap='s8'>
              <Card padding='sm'>
                <Text size='caption'>A</Text>
              </Card>
              <Card padding='sm'>
                <Text size='caption'>B</Text>
              </Card>
              <Card padding='sm'>
                <Text size='caption'>C</Text>
              </Card>
            </Flex>
          </Card>
          <Card>
            <Text size='caption' color='secondary'>
              column / stretch / gap s8
            </Text>
            <Flex direction='column' gap='s8'>
              <Card padding='sm'>
                <Text size='caption'>Row 1</Text>
              </Card>
              <Card padding='sm'>
                <Text size='caption'>Row 2</Text>
              </Card>
            </Flex>
          </Card>
        </Flex>
      </div>

      <div {...stylex.props(styles.subsection)}>
        <Text as='h3' size='label' weight='medium' color='secondary' style={styles.subsectionTitle}>
          Wrap
        </Text>
        <Card>
          <Flex direction='row' gap='s8' wrap>
            {Array.from({ length: 12 }, (_, i) => (
              <Card key={i} padding='sm'>
                <Text size='caption'>Item {i + 1}</Text>
              </Card>
            ))}
          </Flex>
        </Card>
      </div>
    </section>
  );
}

function RadiiSection() {
  const radiiValues = [
    'r2',
    'r4',
    'r6',
    'r8',
    'r10',
    'r12',
    'r16',
    'r20',
    'r24',
    'r32',
    'full',
  ] as const;

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Radii
      </Text>
      <div {...stylex.props(styles.radiiGrid)}>
        {radiiValues.map(r => (
          <div key={r} {...stylex.props(styles.swatch)}>
            <div {...stylex.props(styles.radiiBox, radiiBoxStyles[r])} />
            <Text size='caption' color='secondary' style={styles.mono}>
              {r}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpacingSection() {
  const spacingValues = [
    { name: 's1', px: 1 },
    { name: 's2', px: 2 },
    { name: 's4', px: 4 },
    { name: 's6', px: 6 },
    { name: 's8', px: 8 },
    { name: 's10', px: 10 },
    { name: 's12', px: 12 },
    { name: 's14', px: 14 },
    { name: 's16', px: 16 },
    { name: 's18', px: 18 },
    { name: 's20', px: 20 },
    { name: 's24', px: 24 },
    { name: 's28', px: 28 },
    { name: 's32', px: 32 },
    { name: 's40', px: 40 },
    { name: 's48', px: 48 },
    { name: 's56', px: 56 },
    { name: 's64', px: 64 },
    { name: 's72', px: 72 },
    { name: 's80', px: 80 },
    { name: 's96', px: 96 },
    { name: 's112', px: 112 },
    { name: 's128', px: 128 },
  ] as const;

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Spacing
      </Text>
      <Flex direction='column' gap='s4'>
        {spacingValues.map(s => (
          <div key={s.name} {...stylex.props(styles.spacingRow)}>
            <Text size='caption' color='secondary' style={[styles.mono, styles.spacingLabel]}>
              {s.name}
            </Text>
            <div {...stylex.props(styles.spacingBar, spacingBarWidths[s.name])} />
            <Text size='caption' color='secondary' style={styles.mono}>
              {s.px}px
            </Text>
          </div>
        ))}
      </Flex>
    </section>
  );
}

function ElementSizeSection() {
  const sizes = [
    { name: 'xs', px: 28 },
    { name: 'sm', px: 32 },
    { name: 'md', px: 36 },
    { name: 'lg', px: 40 },
    { name: 'xl', px: 44 },
  ] as const;

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='display' weight='semibold' style={styles.sectionTitle}>
        Element Sizes
      </Text>
      <Flex direction='column' gap='s8'>
        {sizes.map(s => (
          <div key={s.name} {...stylex.props(styles.elementSizeBar, elementSizeHeights[s.name])}>
            <Text size='caption' color='secondary' style={styles.mono}>
              {s.name} — {s.px}px
            </Text>
          </div>
        ))}
      </Flex>
    </section>
  );
}

function OverviewPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='hero' weight='semibold' style={styles.headerTitle}>
          Overview
        </Text>
        <Text as='p' size='body' color='secondary'>
          All design tokens and components at a glance. Switch palette and color scheme to compare.
        </Text>
      </header>

      <ColorTokensSection />
      <RadiiSection />
      <SpacingSection />
      <ElementSizeSection />
      <TextSection />
      <ButtonSection />
      <InputSection />
      <ToggleSection />
      <PressableSection />
      <CardSection />
      <FlexSection />
      <AccordionSection />
      <DialogSection />
    </div>
  );
}
