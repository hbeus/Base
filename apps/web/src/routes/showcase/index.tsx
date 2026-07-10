import { Flex, Pressable, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/showcase/')({
  component: ShowcaseIndex,
});

const components = [
  { id: 'accordion', label: 'Accordion', description: 'Collapsible sections with animated reveal' },
  {
    id: 'buttons',
    label: 'Buttons',
    description: 'Primary, secondary, ghost, and destructive variants',
  },
  { id: 'button-states', label: 'Button States', description: 'Positive and negative states' },
  { id: 'inputs', label: 'Inputs', description: 'Text inputs with size variants' },
  { id: 'dialog', label: 'Dialog', description: 'Modal dialog with compound component pattern' },
  { id: 'toggle', label: 'Toggle', description: 'Switch control with spring animation' },
  { id: 'themes', label: 'Themes', description: 'OKLCH-generated color themes with relative chroma' },
];

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    paddingBlock: spacing.s16,
    textDecoration: 'none',
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
      <nav {...stylex.props(styles.nav)}>
        {components.map(c => (
          <Pressable key={c.id} inset='s16' role='link'>
            <Link to='/showcase/$id' params={{ id: c.id }}>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Flex direction='column' gap='s4'>
                  <Text size='body'>{c.label}</Text>
                  <Text size='bodySm' color='secondary'>
                    {c.description}
                  </Text>
                </Flex>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
        ))}
      </nav>
    </>
  );
}
