import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import * as stylex from '@stylexjs/stylex';
import { colors } from '@base/ui/tokens/colors.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { usersListOptions } from '~/features/users/queries';
import { Card, Text } from '@base/ui';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s48,
  },
  heading: {
    fontSize: typography.displaySize,
    lineHeight: typography.displayLineHeight,
    letterSpacing: typography.displayLetterSpacing,
    fontWeight: 600,
    color: colors.foregroundPrimary,
  },
  subtitle: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight,
    color: colors.foregroundSecondary,
  },
  section: {
    marginBottom: spacing.s40,
  },
  sectionTitle: {
    marginBottom: spacing.s16,
    backgroundColor: 'red',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: spacing.s10,
  },
  userRowBorder: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  userName: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
  },
  userEmail: {
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    color: colors.foregroundSecondary,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: spacing.s10,
    paddingInline: spacing.s12,
    marginInline: `-${spacing.s12}`,
    borderRadius: radii.r8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    textDecoration: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
  },
  navArrow: {
    color: colors.foregroundSecondary,
    fontSize: typography.captionSize,
  },
});

function HomePage() {
  const { data: users } = useSuspenseQuery(usersListOptions());

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>base</h1>
        <p {...stylex.props(styles.subtitle)}>
          A monorepo starter with TanStack Start, StyleX, Base UI, and motion.dev.
        </p>
      </header>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Pages</h2>
        <nav {...stylex.props(styles.nav)}>
          <Link to='/showcase' {...stylex.props(styles.navLink)}>
            Component showcase
            <span {...stylex.props(styles.navArrow)}>→</span>
          </Link>
        </nav>
      </section>

      <section {...stylex.props(styles.section)}>
      <Text size="bodyLg" style={styles.sectionTitle}>Data (server function → React Query)</Text>
        <Card>
          {users.map((user, i) => (
            <div
              key={user.id}
              {...stylex.props(
                styles.userRow,
                i < users.length - 1 && styles.userRowBorder,
              )}
            >
              <div>
                <div {...stylex.props(styles.userName)}>{user.name}</div>
                <div {...stylex.props(styles.userEmail)}>{user.email}</div>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
