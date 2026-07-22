import { Flex, Slider, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/slider')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Slider
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Range slider with label, value output, and range mode.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Slider.Root defaultValue={50}>
            <Flex direction='row' justify='between'>
              <Slider.Label>Volume</Slider.Label>
              <Slider.Value />
            </Flex>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Range
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Slider.Root defaultValue={[25, 75]}>
            <Flex direction='row' justify='between'>
              <Slider.Label>Price range</Slider.Label>
              <Slider.Value />
            </Flex>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </section>
    </>
  );
}
