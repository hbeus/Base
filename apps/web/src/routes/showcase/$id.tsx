import { Accordion, Button, ButtonState, Card, Dialog, Flex, Input, Text, Toggle } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const Route = createFileRoute('/showcase/$id')({
  component: ShowcaseDetail,
});

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  section: {
    marginBottom: spacing.s32,
  },
  sectionTitle: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
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
});

function ButtonsShowcase() {
  return (
    <Flex direction='column' gap='s32'>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Variants
        </Text>
        <Card>
          <Flex direction='column' gap='s40'>
            <Flex direction='row' gap='s8'>
              <Button variant='accent'>Accent</Button>
              <Button variant='primary'>Primary</Button>
              <Button variant='ghost'>Ghost</Button>
            </Flex>
            <Flex direction='column' gap='s12'>
              <Button variant='accent'>Accent</Button>
              <Button variant='primary'>Primary</Button>
              <Button variant='ghost'>Ghost</Button>
            </Flex>
          </Flex>
        </Card>
      </section>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <Card>
          <Flex direction='row' gap='s8' align='center'>
            <Button size='xs'>Extra Small</Button>
            <Button size='sm'>Small</Button>
            <Button size='md'>Medium</Button>
            <Button size='lg'>Large</Button>
          </Flex>
        </Card>
      </section>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Disabled
        </Text>
        <Card>
          <Card>
            <Flex direction='row' gap='s8'>
              <Button variant='accent' disabled>
                Accent
              </Button>
              <Button variant='primary' disabled>
                Primary
              </Button>
              <Button variant='ghost' disabled>
                Ghost
              </Button>
            </Flex>
          </Card>
        </Card>
      </section>
    </Flex>
  );
}

function ButtonStatesShowcase() {
  return (
    <Flex direction='column' gap='s32'>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          States
        </Text>
        <Card>
          <Flex direction='row' gap='s8' wrap>
            <ButtonState variant='positive'>Positive</ButtonState>
            <ButtonState variant='negative'>Negative</ButtonState>
            <ButtonState variant='semiNegative'>Semi Negative</ButtonState>
            <ButtonState variant='semiPositive'>Semi Positive</ButtonState>
            <ButtonState variant='neutral'>Neutral</ButtonState>
            <ButtonState variant='highlight'>Highlight</ButtonState>
          </Flex>
        </Card>
      </section>
    </Flex>
  );
}

function InputsShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input size='sm' placeholder='Small input' />
          <Input size='md' placeholder='Medium input' />
          <Input size='lg' placeholder='Large input' />
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          States
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input placeholder='Default' />
          <Input disabled placeholder='Disabled' />
        </div>
      </section>
    </>
  );
}

function DialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Modal
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={<Button variant='primary' />}>Open dialog</Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Content>
                  <Dialog.Title>Dialog title</Dialog.Title>
                  <Dialog.Description>
                    This is a compound component dialog built with Base UI, styled with StyleX, and
                    animated with motion.dev.
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

function ToggleShowcase() {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Small</Text>
            <Toggle size='sm' checked={checked} onCheckedChange={setChecked} />
          </div>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Medium</Text>
            <Toggle size='md' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Example
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Enable notifications</Text>
            <Toggle checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </section>
    </>
  );
}

function AccordionShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Default
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='What is Base UI?'>
            <Text weight='regular' color='secondary'>
              Base UI is an unstyled component library from the MUI team. It provides accessible,
              headless primitives that you style yourself.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Why StyleX?'>
            <Text weight='regular' color='secondary'>
              StyleX provides atomic CSS with type-safe design tokens, co-located styles, and
              zero-runtime overhead in production.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='How are animations handled?'>
            <Text weight='regular' color='secondary'>
              Animations use motion.dev for declarative enter/exit transitions and spring physics.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Multiple
        </Text>
        <Accordion.Root multiple>
          <Accordion.Item trigger='Section one'>
            <Text weight='regular' color='secondary'>
              Multiple items can be open at the same time when the multiple prop is set.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Section two'>
            <Text weight='regular' color='secondary'>
              Try opening this while the first section is still expanded.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Disabled
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='Enabled item'>
            <Text weight='regular' color='secondary'>
              This item can be toggled.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Disabled item' disabled>
            <Text weight='regular' color='secondary'>
              This item cannot be toggled.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </>
  );
}

const showcases: Record<
  string,
  { title: string; description: string; component: () => React.JSX.Element }
> = {
  accordion: {
    title: 'Accordion',
    description:
      'Compound component — Accordion.Root wraps Accordion.Item children with animated panels.',
    component: AccordionShowcase,
  },
  buttons: {
    title: 'Buttons',
    description: 'Wraps Base UI Button with variant and size props, motion whileTap.',
    component: ButtonsShowcase,
  },
  'button-states': {
    title: 'Button States',
    description: 'Wraps Base UI ButtonState with color variants.',
    component: ButtonStatesShowcase,
  },
  inputs: {
    title: 'Inputs',
    description: 'Wraps Base UI Input with size variants.',
    component: InputsShowcase,
  },
  dialog: {
    title: 'Dialog',
    description: 'Compound component pattern — Dialog.Root, Dialog.Trigger, Dialog.Content, etc.',
    component: DialogShowcase,
  },
  toggle: {
    title: 'Toggle',
    description: 'Wraps Base UI Switch with spring-animated thumb.',
    component: ToggleShowcase,
  },
};

function ShowcaseDetail() {
  const { id } = Route.useParams();
  const showcase = showcases[id];

  if (!showcase) {
    return (
      <Text as='p' size='bodySm' color='secondary'>
        Component "{id}" not found.
      </Text>
    );
  }

  const Component = showcase.component;

  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='display' weight='semibold' capitalize>
          {showcase.title}
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          {showcase.description}
        </Text>
      </header>
      <Component />
    </>
  );
}
