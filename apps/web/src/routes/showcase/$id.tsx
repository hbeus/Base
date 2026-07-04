import { createFileRoute } from '@tanstack/react-router';
import { Link } from '~/components/Link';
import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, Input, Dialog, Toggle } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';

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
  heading: {
    fontSize: typography.headlineSize,
    lineHeight: typography.headlineLineHeight,
    letterSpacing: typography.headlineLetterSpacing,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
  section: {
    marginBottom: spacing.s32,
  },
  sectionTitle: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundSecondary,
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
  toggleLabel: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
  },
  backLink: {
    fontSize: typography.bodySmSize,
    color: colors.foregroundSecondary,
    textDecoration: 'none',
    transition: 'color 0.1s',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
});

function ButtonsShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Variants</h2>
        <div {...stylex.props(styles.preview)}>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Sizes</h2>
        <div {...stylex.props(styles.preview)}>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>States</h2>
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
        <h2 {...stylex.props(styles.sectionTitle)}>Sizes</h2>
        <div {...stylex.props(styles.previewColumn)}>
          <Input inputSize='sm' placeholder='Small input' />
          <Input inputSize='md' placeholder='Medium input' />
          <Input inputSize='lg' placeholder='Large input' />
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>States</h2>
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
      <h2 {...stylex.props(styles.sectionTitle)}>Modal</h2>
      <div {...stylex.props(styles.preview)}>
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant='secondary' />}>
            Open dialog
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Title>Dialog title</Dialog.Title>
              <Dialog.Description>
                This is a compound component dialog built with Base UI, styled with StyleX,
                and animated with motion.dev.
              </Dialog.Description>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Dialog.Close render={<Button variant='ghost' size='sm' />}>
                  Cancel
                </Dialog.Close>
                <Dialog.Close render={<Button size='sm' />}>
                  Confirm
                </Dialog.Close>
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
        <h2 {...stylex.props(styles.sectionTitle)}>Sizes</h2>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <span {...stylex.props(styles.toggleLabel)}>Small</span>
            <Toggle size='sm' checked={checked} onCheckedChange={setChecked} />
          </div>
          <div {...stylex.props(styles.toggleRow)}>
            <span {...stylex.props(styles.toggleLabel)}>Medium</span>
            <Toggle size='md' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Example</h2>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <span {...stylex.props(styles.toggleLabel)}>Enable notifications</span>
            <Toggle checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </section>
    </>
  );
}

const showcases: Record<string, { title: string; description: string; component: () => React.JSX.Element }> = {
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
      <div>
        <p {...stylex.props(styles.description)}>Component "{id}" not found.</p>
        <Link to='/showcase' {...stylex.props(styles.backLink)}>← Back to components</Link>
      </div>
    );
  }

  const Component = showcase.component;

  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>{showcase.title}</h1>
        <p {...stylex.props(styles.description)}>{showcase.description}</p>
      </header>
      <Component />
    </>
  );
}
