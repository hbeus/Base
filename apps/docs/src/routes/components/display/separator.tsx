import { Flex, Separator, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/display/separator')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Separator
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Horizontal and vertical dividers.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Horizontal
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Text size='bodySm'>Content above</Text>
          <Separator />
          <Text size='bodySm'>Content below</Text>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Vertical
        </Text>
        <Flex direction='row' align='center' gap='s4' style={docStyles.preview}>
          <Text size='bodySm'>Left</Text>
          <Separator orientation='vertical' />
          <Text size='bodySm'>Right</Text>
        </Flex>
      </section>
    </>
  );
}
