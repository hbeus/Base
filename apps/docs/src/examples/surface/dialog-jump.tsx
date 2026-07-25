import { Card, Text } from '@base/ui';

export default function SurfaceDialogJump() {
  return (
    <Card level={300} padding='lg' gap='s12'>
      <Text size='body' weight='medium'>
        Dialog Surface (Level 300)
      </Text>
      <Card padding='md' gap='s12'>
        <Text size='bodySm'>Inner card (Level 400)</Text>
        <Card padding='md' gap='s8'>
          <Text size='bodySm'>Deep card (Level 500)</Text>
        </Card>
      </Card>
    </Card>
  );
}
