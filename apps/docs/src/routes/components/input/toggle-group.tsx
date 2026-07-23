import { Icon, Text, ToggleGroup } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/toggle-group')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Toggle Group
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Segmented control with size variants. Use leading and trailing slots
          for icons beside item labels.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <ToggleGroup.Root defaultValue={['center']}>
            <ToggleGroup.Item value='left'>Left</ToggleGroup.Item>
            <ToggleGroup.Item value='center'>Center</ToggleGroup.Item>
            <ToggleGroup.Item value='right'>Right</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Leading slots
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <ToggleGroup.Root defaultValue={['center']}>
            <ToggleGroup.Item value='left' leading={<Icon icon={IconAlignLeft} />}>
              Left
            </ToggleGroup.Item>
            <ToggleGroup.Item value='center' leading={<Icon icon={IconAlignCenter} />}>
              Center
            </ToggleGroup.Item>
            <ToggleGroup.Item value='right' leading={<Icon icon={IconAlignRight} />}>
              Right
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='sm'>
              Small
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='sm'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='md'>
              Medium
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='md'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='lg'>
              Large
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='lg'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </section>
    </>
  );
}

