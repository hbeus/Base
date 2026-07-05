import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { size } from '@base/ui/tokens/size.stylex';
import { IconChevronRight } from '@tabler/icons-react';

import { Link } from '~/components/Link';
import { usersListOptions } from '~/features/users/queries';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: size.s24,
    paddingBlock: size.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s8,
    marginBottom: size.s48,
  },
  section: {
    marginBottom: size.s40,
  },
  sectionTitle: {
    marginBottom: size.s16,
    paddingInline: size.s12,
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: size.s10,
  },
  userRowBorder: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
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
  const { data: users } = useSuspenseQuery(usersListOptions());

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='hero' weight='semibold'>
          base
        </Text>
        <Text as='p' size='body' color='secondary'>
          A monorepo starter with TanStack Start, StyleX, Base UI, and motion.dev.
        </Text>
      </header>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
        </nav>
      </section>

      <section {...stylex.props(styles.section)}>
        <Text size='title' as='h2' style={styles.sectionTitle}>
          Data (server function → React Query)
        </Text>
        <Card>
          {users.map((user, i) => (
            <div
              key={user.id}
              {...stylex.props(styles.userRow, i < users.length - 1 && styles.userRowBorder)}
            >
              <div>
                <Text as='div' size='bodySm'>
                  {user.name}
                </Text>
                <Text as='div' size='caption' color='secondary'>
                  {user.email}
                </Text>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
