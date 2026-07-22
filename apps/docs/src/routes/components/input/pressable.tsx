import { Flex, Pressable, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/pressable')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Pressable
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Generic pressable surface with inset hover highlight and motion whileTap.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Inset variants
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Pressable inset='s4'>
            <Text size='bodySm'>Inset s4</Text>
          </Pressable>
          <Pressable inset='s8'>
            <Text size='bodySm'>Inset s8</Text>
          </Pressable>
          <Pressable inset='s12'>
            <Text size='bodySm'>Inset s12</Text>
          </Pressable>
          <Pressable inset='s16'>
            <Text size='bodySm'>Inset s16</Text>
          </Pressable>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Polymorphic usage
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Pressable as='button' role='button' inset='s8'>
            <Flex direction='row' gap='s8' align='center'>
              <Text size='bodySm' weight='medium'>
                As button element
              </Text>
            </Flex>
          </Pressable>
          <Pressable disabled inset='s8'>
            <Text size='bodySm' color='secondary'>
              Disabled state
            </Text>
          </Pressable>
        </div>
      </section>
    </>
  );
}
