import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute, Outlet } from '@tanstack/react-router';

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
});

function ShowcaseLayout() {
  return (
    <div {...stylex.props(styles.page)}>
      <Outlet />
    </div>
  );
}
