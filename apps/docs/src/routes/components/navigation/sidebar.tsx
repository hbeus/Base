import { Sidebar, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/navigation/sidebar')({
  component: PageComponent,
});

const localStyles = stylex.create({
  wrapper: {
    position: 'relative',
    height: 300,
    overflow: 'hidden',
  },
  sidebar: {
    position: 'absolute',
    display: 'flex',
    paddingBlock: spacing.s16,
  },
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Sidebar
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Fixed sidebar navigation with animated bar indicators and responsive compact mode.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.preview, localStyles.wrapper)}>
          <Sidebar.Root activeId='overview' style={localStyles.sidebar}>
            <Sidebar.Anchor id='overview' href='#overview'>
              Overview
            </Sidebar.Anchor>
            <Sidebar.Anchor id='features' href='#features'>
              Features
            </Sidebar.Anchor>
            <Sidebar.Anchor id='api' href='#api'>
              API
            </Sidebar.Anchor>
            <Sidebar.Anchor id='examples' href='#examples'>
              Examples
            </Sidebar.Anchor>
          </Sidebar.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Right position
        </Text>
        <div {...stylex.props(docStyles.preview, localStyles.wrapper)}>
          <Sidebar.Root activeId='intro' position='right' style={localStyles.sidebar}>
            <Sidebar.Anchor id='intro' href='#intro'>
              Introduction
            </Sidebar.Anchor>
            <Sidebar.Anchor id='setup' href='#setup'>
              Setup
            </Sidebar.Anchor>
            <Sidebar.Anchor id='usage' href='#usage'>
              Usage
            </Sidebar.Anchor>
          </Sidebar.Root>
        </div>
      </section>
    </>
  );
}
