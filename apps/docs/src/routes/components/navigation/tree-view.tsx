import { Text, TreeView } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/navigation/tree-view')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Tree View
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Collapsible tree navigation with nested groups and items.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <TreeView.Root activeHref='/components'>
            <TreeView.Group label='Getting Started' defaultOpen>
              <TreeView.Item href='/introduction'>Introduction</TreeView.Item>
              <TreeView.Item href='/installation'>Installation</TreeView.Item>
            </TreeView.Group>
            <TreeView.Group label='Components' defaultOpen>
              <TreeView.Item href='/components'>Overview</TreeView.Item>
              <TreeView.Group label='Input'>
                <TreeView.Item href='/components/button'>Button</TreeView.Item>
                <TreeView.Item href='/components/input'>Input</TreeView.Item>
                <TreeView.Item href='/components/select'>Select</TreeView.Item>
              </TreeView.Group>
              <TreeView.Group label='Layout'>
                <TreeView.Item href='/components/card'>Card</TreeView.Item>
                <TreeView.Item href='/components/flex'>Flex</TreeView.Item>
              </TreeView.Group>
            </TreeView.Group>
          </TreeView.Root>
        </div>
      </section>
    </>
  );
}
