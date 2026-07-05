import { Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    display: 'flex',
    gap: spacing.s48,
    flexDirection: 'column',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: spacing.s16,
    textDecoration: 'none',
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -16',
      backgroundColor: colors.lighten4,
      borderRadius: radii.r20,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': {
      opacity: 1,
    },
  },
});

function HomePage() {
  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='hero'>
          Base
        </Text>
        <Text as='p' size='body' color='secondary'>
          A monorepo starter with TanStack Start, StyleX, and Base UI.
        </Text>
      </header>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Components
        </Text>
        <nav {...stylex.props(styles.nav)}>
          <Link to='/showcase' {...stylex.props(styles.navLink)}>
            <Text>Components</Text>
            <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
          </Link>
          <Link to='/typography' {...stylex.props(styles.navLink)}>
            <Text>Typography</Text>
            <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
          </Link>
        </nav>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Patterns
        </Text>
        <nav {...stylex.props(styles.nav)}>
          <Link to='/data' {...stylex.props(styles.navLink)}>
            <Text>Data</Text>
            <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
          </Link>
        </nav>
      </section>
    </div>
  );
}
