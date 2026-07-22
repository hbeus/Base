import { Input, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/input')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Input
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Wraps Base UI Input with size variants.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Input size='sm' placeholder='Small input' />
          <Input size='md' placeholder='Medium input' />
          <Input size='lg' placeholder='Large input' />
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          States
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Input placeholder='Default' />
          <Input disabled placeholder='Disabled' />
        </div>
      </section>
    </>
  );
}
