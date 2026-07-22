import { Button, Text, Tooltip } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconCopy, IconShare, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/tooltip')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Tooltip
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Hover-triggered informational popup with arrow.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Hover to reveal
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant='primary' />}>
                <IconCopy size={16} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>
                    <Tooltip.Arrow />
                    Copy to clipboard
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant='primary' />}>
                <IconShare size={16} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>
                    <Tooltip.Arrow />
                    Share
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger render={<Button variant='primary' />}>
                <IconTrash size={16} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner>
                  <Tooltip.Popup>
                    <Tooltip.Arrow />
                    Delete
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </section>
    </>
  );
}
