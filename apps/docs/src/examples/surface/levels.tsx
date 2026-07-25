import { Card, type SurfaceLevelValue, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: spacing.s8,
    width: '100%',
  },
  gridItem: {
    aspectRatio: '1',
    justifyContent: 'flex-end',
  },
});

function SurfaceGridItem({ level }: { level: SurfaceLevelValue }) {
  return (
    <Card level={level} padding='md' gap='s4' style={styles.gridItem}>
      <Text size='title' weight='bold'>
        {level}
      </Text>
      <Text size='caption'>bgSurface-{level}</Text>
    </Card>
  );
}

export default function SurfaceLevels() {
  return (
    <div {...stylex.props(styles.grid)}>
      <SurfaceGridItem level={0} />
      <SurfaceGridItem level={100} />
      <SurfaceGridItem level={200} />
      <SurfaceGridItem level={300} />
      <SurfaceGridItem level={400} />
      <SurfaceGridItem level={500} />
    </div>
  );
}
