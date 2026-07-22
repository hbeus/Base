import { Text, Toolbar } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconBold, IconCopy, IconItalic, IconShare, IconUnderline } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/navigation/toolbar')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Toolbar
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Grouped action buttons with separators.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Formatting toolbar
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Toolbar.Root>
            <Toolbar.Group>
              <Toolbar.Button>
                <IconBold size={16} />
              </Toolbar.Button>
              <Toolbar.Button>
                <IconItalic size={16} />
              </Toolbar.Button>
              <Toolbar.Button>
                <IconUnderline size={16} />
              </Toolbar.Button>
            </Toolbar.Group>
            <Toolbar.Separator />
            <Toolbar.Group>
              <Toolbar.Button>
                <IconCopy size={16} />
              </Toolbar.Button>
              <Toolbar.Button>
                <IconShare size={16} />
              </Toolbar.Button>
            </Toolbar.Group>
          </Toolbar.Root>
        </div>
      </section>
    </>
  );
}
