import { Flex, Meter, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/display/meter')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Meter
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Meter gauge for displaying measured values.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Meter.Root value={72}>
            <Flex direction='row' justify='between'>
              <Meter.Label>Storage used</Meter.Label>
              <Meter.Value />
            </Flex>
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
          <Meter.Root value={30}>
            <Flex direction='row' justify='between'>
              <Meter.Label>CPU usage</Meter.Label>
              <Meter.Value />
            </Flex>
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
      </section>
    </>
  );
}
