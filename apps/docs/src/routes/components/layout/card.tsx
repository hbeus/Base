import { Card, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/card')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Card
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Container with variant, padding, direction, and gap props.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Variants
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Card variant='filled'>
            <Text size='bodySm'>Filled variant (default)</Text>
          </Card>
          <Card variant='outline'>
            <Text size='bodySm'>Outline variant</Text>
          </Card>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Padding
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Card padding='sm'>
            <Text size='bodySm'>Small padding</Text>
          </Card>
          <Card padding='md'>
            <Text size='bodySm'>Medium padding (default)</Text>
          </Card>
          <Card padding='lg'>
            <Text size='bodySm'>Large padding</Text>
          </Card>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Direction
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Card direction='row' gap='s8'>
            <Text size='bodySm'>Row item 1</Text>
            <Text size='bodySm'>Row item 2</Text>
            <Text size='bodySm'>Row item 3</Text>
          </Card>
        </div>
      </section>
    </>
  );
}
