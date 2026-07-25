import { Button, Card, Flex, Text } from '@base/ui';
import type { ReactNode } from 'react';

function SurfaceCard({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <Card padding='md' gap='s12'>
      <Text size='bodySm' weight='medium'>
        {label}
      </Text>
      <Flex direction='row' gap='s8' wrap>
        <Button variant='primary'>Primary</Button>
        <Button variant='accent'>Accent</Button>
        <Button variant='ghost'>Ghost</Button>
      </Flex>
      {children}
    </Card>
  );
}

export default function SurfaceButtons() {
  return (
    <Card level={0} padding='md' gap='s12'>
      <Text size='bodySm' weight='medium'>
        Level 0 (page)
      </Text>
      <Flex direction='row' gap='s8' wrap>
        <Button variant='primary'>Primary</Button>
        <Button variant='accent'>Accent</Button>
        <Button variant='ghost'>Ghost</Button>
      </Flex>
      <SurfaceCard label='Level 100'>
        <SurfaceCard label='Level 200'>
          <SurfaceCard label='Level 300' />
        </SurfaceCard>
      </SurfaceCard>
    </Card>
  );
}
