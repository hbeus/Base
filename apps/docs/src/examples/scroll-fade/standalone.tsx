import { Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  viewport: {
    height: 200,
    overflowY: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    padding: spacing.s8,
  },
});

export default function ScrollFadeStandalone() {
  const { className, ...stylexProps } = stylex.props(styles.viewport);

  return (
    <div className={['scroll-fade', className].filter(Boolean).join(' ')} {...stylexProps}>
      <div {...stylex.props(styles.content)}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i} size='bodySm' color='secondary'>
            Standalone scroll-fade item {i + 1}
          </Text>
        ))}
      </div>
    </div>
  );
}
