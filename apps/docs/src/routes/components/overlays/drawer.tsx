import { Button, Drawer, Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/drawer')({
  component: PageComponent,
});

function PageComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Drawer
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Side panel overlay that slides in from the edge.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Side panel
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger render={<Button variant='primary' />}>Open drawer</Drawer.Trigger>
            <AnimatePresence>
              {open && (
                <Drawer.Portal>
                  <Drawer.Backdrop />
                  <Drawer.Popup>
                    <Drawer.Content>
                      <Drawer.Title>Drawer title</Drawer.Title>
                      <Drawer.Description>
                        This is a side panel drawer. It slides in from the right edge of the screen.
                      </Drawer.Description>
                      <Flex direction='row' gap='s8'>
                        <Drawer.Close render={<Button variant='ghost' size='sm' />}>
                          Close
                        </Drawer.Close>
                      </Flex>
                    </Drawer.Content>
                  </Drawer.Popup>
                </Drawer.Portal>
              )}
            </AnimatePresence>
          </Drawer.Root>
        </div>
      </section>
    </>
  );
}
