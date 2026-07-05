import { Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Link } from '~/components/Link';

export const Route = createFileRoute('/showcase')({
  component: ShowcaseLayout,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s6,
    textDecoration: 'none',
    marginBottom: spacing.s32,
    transition: 'color 0.1s',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
});

function ShowcaseLayout() {
  return (
    <div {...stylex.props(styles.page)}>
      <Link to='/' {...stylex.props(styles.backLink)}>
        <Text size='bodySm' color='secondary'>
          ← Home
        </Text>
      </Link>
      <Outlet />
    </div>
  );
}
