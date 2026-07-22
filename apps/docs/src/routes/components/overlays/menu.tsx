import { Button, Menu, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconCopy, IconShare, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/menu')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Menu
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Dropdown menu with items, icons, and separators.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Dropdown menu
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Menu.Root>
            <Menu.Trigger render={<Button variant='primary' />}>Actions</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item>
                    <IconCopy size={14} />
                    Copy
                  </Menu.Item>
                  <Menu.Item>
                    <IconShare size={14} />
                    Share
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>
                    <IconTrash size={14} />
                    Delete
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>
      </section>
    </>
  );
}
