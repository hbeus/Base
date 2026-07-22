import { Button, Popover, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/overlays/popover')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Popover
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Positioned popup with arrow, title, and description.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Popover.Root>
            <Popover.Trigger render={<Button variant='primary' />}>Open popover</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup>
                  <Popover.Arrow />
                  <Popover.Title>Popover title</Popover.Title>
                  <Popover.Description>
                    This is a popover with an arrow pointing to its trigger element.
                  </Popover.Description>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </section>
    </>
  );
}
