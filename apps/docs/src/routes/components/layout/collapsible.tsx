import { Button, Collapsible, Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/collapsible')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Collapsible
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Single collapsible section with animated height transition.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Collapsible.Root>
            <Collapsible.Trigger render={<Button variant='ghost' size='sm' />}>
              Toggle content
            </Collapsible.Trigger>
            <Collapsible.Panel>
              <Flex direction='column' gap='s8'>
                <Text size='bodySm' color='secondary'>
                  This content can be collapsed and expanded. The panel animates its height using
                  Base UI&apos;s built-in height transition.
                </Text>
                <Text size='bodySm' color='secondary'>
                  Additional content that is hidden when collapsed.
                </Text>
              </Flex>
            </Collapsible.Panel>
          </Collapsible.Root>
        </div>
      </section>
    </>
  );
}
