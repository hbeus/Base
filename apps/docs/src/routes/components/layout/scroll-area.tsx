import { ScrollArea, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/scroll-area')({
  component: PageComponent,
});

const localStyles = stylex.create({
  scrollRoot: {
    height: 200,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    padding: spacing.s8,
  },
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Scroll Area
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Custom scrollbar overlay with viewport, scrollbar, and thumb subcomponents.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Vertical scroll
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <ScrollArea.Root style={localStyles.scrollRoot}>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <div {...stylex.props(localStyles.content)}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <Text key={i} size='bodySm' color='secondary'>
                      Scrollable item {i + 1}
                    </Text>
                  ))}
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </section>
    </>
  );
}
