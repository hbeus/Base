import { Card, Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/flex')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Flex
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Flexbox layout primitive with direction, gap, align, justify, and wrap props.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Direction and gap
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Flex direction='row' gap='s8'>
            <Card padding='sm'>
              <Text size='bodySm'>Row 1</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Row 2</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Row 3</Text>
            </Card>
          </Flex>
          <Flex direction='column' gap='s8'>
            <Card padding='sm'>
              <Text size='bodySm'>Column 1</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Column 2</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Column 3</Text>
            </Card>
          </Flex>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Alignment and justification
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Flex direction='row' gap='s8' align='center' justify='between'>
            <Card padding='sm'>
              <Text size='bodySm'>Start</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Center</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>End</Text>
            </Card>
          </Flex>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Wrap
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Flex direction='row' gap='s8' wrap>
            <Card padding='sm'>
              <Text size='bodySm'>Item 1</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Item 2</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Item 3</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Item 4</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Item 5</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>Item 6</Text>
            </Card>
          </Flex>
        </div>
      </section>
    </>
  );
}
