import { Button, Dialog, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/dialog')({
  component: PageComponent,
});

function PageComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Dialog
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Compound component pattern -- Dialog.Root, Dialog.Trigger, Dialog.Content, etc.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Modal
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger render={<Button variant='primary' />}>Open dialog</Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal>
                  <Dialog.Backdrop />
                  <Dialog.Content>
                    <Dialog.Title>Dialog title</Dialog.Title>
                    <Dialog.Description>
                      This is a compound component dialog built with Base UI, styled with StyleX,
                      and animated with motion.dev.
                    </Dialog.Description>
                    <Dialog.Footer>
                      <Dialog.Close render={<Button variant='ghost' size='sm' />}>
                        Cancel
                      </Dialog.Close>
                      <Dialog.Close render={<Button size='sm' />}>Confirm</Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </section>
    </>
  );
}
