import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';

import { Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { size } from '@base/ui/tokens/size.stylex';
import { IconChevronRight } from '@tabler/icons-react';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    display: 'flex',
    gap: size.s48,
    flexDirection: 'column',
    marginInline: 'auto',
    paddingInline: size.s24,
    paddingBlock: size.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s8,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s16,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s2,
  },
  navLink: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: size.s16,
    textDecoration: 'none',
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -16',
      backgroundColor: colors.lighten4,
      borderRadius: radii.r12,
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
          A monorepo starter with TanStack Start, StyleX, Base UI, and motion.dev.
        </Text>
      </header>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Components & tokens
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
          <Link to='/data' {...stylex.props(styles.navLink)}>
            <Text>Data</Text>
            <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
          </Link>
        </nav>
      </section>
    </div>
  );
}
