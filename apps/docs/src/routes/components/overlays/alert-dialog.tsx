import { AlertDialog, Button, Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/alert-dialog')({
  component: PageComponent,
});

function PageComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Alert Dialog
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Confirmation dialog for destructive or irreversible actions.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Destructive confirmation
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger render={<Button variant='primary' />}>
              Delete item
            </AlertDialog.Trigger>
            <AnimatePresence>
              {open && (
                <AlertDialog.Portal>
                  <AlertDialog.Backdrop />
                  <AlertDialog.Content>
                    <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This action cannot be undone. The item will be permanently deleted.
                    </AlertDialog.Description>
                    <Flex direction='row' gap='s8' justify='end'>
                      <AlertDialog.Close render={<Button variant='ghost' size='sm' />}>
                        Cancel
                      </AlertDialog.Close>
                      <AlertDialog.Close render={<Button size='sm' />}>Delete</AlertDialog.Close>
                    </Flex>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              )}
            </AnimatePresence>
          </AlertDialog.Root>
        </div>
      </section>
    </>
  );
}
