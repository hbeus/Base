import { Button, Flex, Progress, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/display/progress')({
  component: PageComponent,
});

function PageComponent() {
  const [value, setValue] = useState(65);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Progress
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Progress bar with label and value display.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Progress.Root value={value}>
            <Flex direction='row' justify='between'>
              <Progress.Label>Uploading...</Progress.Label>
              <Progress.Value />
            </Flex>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
          <Flex direction='row' gap='s8'>
            <Button variant='ghost' size='xs' onClick={() => setValue(v => Math.max(0, v - 10))}>
              -10
            </Button>
            <Button variant='ghost' size='xs' onClick={() => setValue(v => Math.min(100, v + 10))}>
              +10
            </Button>
          </Flex>
        </div>
      </section>
    </>
  );
}
