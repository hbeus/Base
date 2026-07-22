import { Switch, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/switch')({
  component: PageComponent,
});

function PageComponent() {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Switch
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Toggle switch with spring-animated thumb.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <div {...stylex.props(docStyles.toggleRow)}>
            <Text size='bodySm'>Small</Text>
            <Switch size='sm' checked={checked} onCheckedChange={setChecked} />
          </div>
          <div {...stylex.props(docStyles.toggleRow)}>
            <Text size='bodySm'>Medium</Text>
            <Switch size='md' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Example
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <div {...stylex.props(docStyles.toggleRow)}>
            <Text size='bodySm'>Enable notifications</Text>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </section>
    </>
  );
}
