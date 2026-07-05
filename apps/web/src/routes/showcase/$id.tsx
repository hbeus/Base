import { useState } from 'react';

import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';

import { Button, Dialog, Input, Text, Toggle } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';

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
  capitalize: {
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: spacing.s32,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: spacing.s12,
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
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Variants
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          States
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </>
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
          <Input inputSize='sm' placeholder='Small input' />
          <Input inputSize='md' placeholder='Medium input' />
          <Input inputSize='lg' placeholder='Large input' />
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
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Modal
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant='secondary' />}>Open dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Title>Dialog title</Dialog.Title>
              <Dialog.Description>
                This is a compound component dialog built with Base UI, styled with StyleX, and
                animated with motion.dev.
              </Dialog.Description>
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                }}
              >
                <Dialog.Close render={<Button variant='ghost' size='sm' />}>Cancel</Dialog.Close>
                <Dialog.Close render={<Button size='sm' />}>Confirm</Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
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

const showcases: Record<
  string,
  { title: string; description: string; component: () => React.JSX.Element }
> = {
  buttons: {
    title: 'Buttons',
    description: 'Wraps Base UI Button with variant and size props, motion whileTap.',
    component: ButtonsShowcase,
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
        <Text as='h1' size='display' weight='semibold' style={styles.capitalize}>
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
