import { Text, Toggle } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconBold, IconItalic } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/toggle')({
  component: PageComponent,
});

function PageComponent() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Toggle
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Pressable two-state toggle button.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Toggle buttons
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Toggle pressed={bold} onPressedChange={setBold}>
            <IconBold size={16} />
          </Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic}>
            <IconItalic size={16} />
          </Toggle>
        </div>
      </section>
    </>
  );
}
