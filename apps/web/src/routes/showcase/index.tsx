import { Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/showcase/')({
  component: ShowcaseIndex,
});

const components = [
  {
    id: 'buttons',
    label: 'Buttons',
    description: 'Primary, secondary, ghost, and destructive variants',
  },
  { id: 'inputs', label: 'Inputs', description: 'Text inputs with size variants' },
  { id: 'dialog', label: 'Dialog', description: 'Modal dialog with compound component pattern' },
  { id: 'toggle', label: 'Toggle', description: 'Switch control with spring animation' },
];

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
    paddingBlock: spacing.s12,
    paddingInline: spacing.s12,
    marginInline: `-${spacing.s12}`,
    borderRadius: radii.r8,
    textDecoration: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
  },
});

function ShowcaseIndex() {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='hero'>
          Components
        </Text>
        <Text as='p' color='secondary'>
          Styled atoms built on Base UI primitives, styled with StyleX tokens, and animated with
          Motion.
        </Text>
      </header>
      <nav {...stylex.props(styles.list)}>
        {components.map(c => (
          <Link key={c.id} to='/showcase/$id' params={{ id: c.id }} {...stylex.props(styles.link)}>
            <Text size='bodySm'>{c.label}</Text>
            <Text size='caption' color='secondary'>
              {c.description}
            </Text>
          </Link>
        ))}
      </nav>
    </>
  );
}
