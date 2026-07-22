import { Card, Grid, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/grid')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Grid
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          CSS grid layout primitive with columns, rows, and gap props.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Columns
        </Text>
        <Grid columns={3} gap='s8'>
          <Card padding='sm'>
            <Text size='bodySm'>Col 1</Text>
          </Card>
          <Card padding='sm'>
            <Text size='bodySm'>Col 2</Text>
          </Card>
          <Card padding='sm'>
            <Text size='bodySm'>Col 3</Text>
          </Card>
          <Card padding='sm'>
            <Text size='bodySm'>Col 4</Text>
          </Card>
          <Card padding='sm'>
            <Text size='bodySm'>Col 5</Text>
          </Card>
          <Card padding='sm'>
            <Text size='bodySm'>Col 6</Text>
          </Card>
        </Grid>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Gap sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Grid columns={4} gap='s4'>
            <Card padding='sm'>
              <Text size='bodySm'>s4</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s4</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s4</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s4</Text>
            </Card>
          </Grid>
          <Grid columns={4} gap='s16'>
            <Card padding='sm'>
              <Text size='bodySm'>s16</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s16</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s16</Text>
            </Card>
            <Card padding='sm'>
              <Text size='bodySm'>s16</Text>
            </Card>
          </Grid>
        </div>
      </section>
    </>
  );
}
