import { createFileRoute } from '@tanstack/react-router';
import { Link } from '~/components/Link';
import * as stylex from '@stylexjs/stylex';
import { colors } from '@base/ui/tokens/colors.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';

export const Route = createFileRoute('/showcase/')({
  component: ShowcaseIndex,
});

const components = [
  { id: 'buttons', label: 'Buttons', description: 'Primary, secondary, ghost, and destructive variants' },
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
  heading: {
    fontSize: typography.headlineSize,
    lineHeight: typography.headlineLineHeight,
    letterSpacing: typography.headlineLetterSpacing,
    fontWeight: 600,
    color: colors.foregroundPrimary,
  },
  description: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
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
  linkLabel: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
  },
  linkDescription: {
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    color: colors.foregroundSecondary,
  },
});

function ShowcaseIndex() {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>Components</h1>
        <p {...stylex.props(styles.description)}>
          Styled atoms from @base/ui — Base UI + StyleX + motion.dev.
        </p>
      </header>
      <nav {...stylex.props(styles.list)}>
        {components.map((c) => (
          <Link
            key={c.id}
            to='/showcase/$id'
            params={{ id: c.id }}
            {...stylex.props(styles.link)}
          >
            <span {...stylex.props(styles.linkLabel)}>{c.label}</span>
            <span {...stylex.props(styles.linkDescription)}>{c.description}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
