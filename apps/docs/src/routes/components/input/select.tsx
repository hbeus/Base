import { Select, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconChevronDown } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/select')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Select
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Dropdown select with animated popup and size variants.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Select.Root defaultValue='apple'>
            <Select.Trigger>
              <Select.Value placeholder='Select a fruit...' />
              <Select.Icon>
                <IconChevronDown size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='apple'>
                    <Select.ItemText>Apple</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='banana'>
                    <Select.ItemText>Banana</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='cherry'>
                    <Select.ItemText>Cherry</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='grape'>
                    <Select.ItemText>Grape</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Select.Root>
            <Select.Trigger size='sm'>
              <Select.Value placeholder='Small' />
              <Select.Icon>
                <IconChevronDown size={14} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='a'>
                    <Select.ItemText>Option A</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='b'>
                    <Select.ItemText>Option B</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Select.Root>
            <Select.Trigger size='lg'>
              <Select.Value placeholder='Large' />
              <Select.Icon>
                <IconChevronDown size={18} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='a'>
                    <Select.ItemText>Option A</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='b'>
                    <Select.ItemText>Option B</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </section>
    </>
  );
}
