import * as stylex from '@stylexjs/stylex';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { size } from '@base/ui/tokens/size.stylex';

export const Route = createFileRoute('/showcase')({
  component: ShowcaseLayout,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: size.s24,
    paddingBlock: size.s64,
  },
});

function ShowcaseLayout() {
  return (
    <div {...stylex.props(styles.page)}>
      <Outlet />
    </div>
  );
}
