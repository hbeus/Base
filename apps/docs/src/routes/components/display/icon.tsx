import { Icon, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import {
  IconBold,
  IconCopy,
  IconItalic,
  IconShare,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/display/icon')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Icon
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Wrapper for Tabler icons with consistent sizing and alignment.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Icon icon={IconBold} />
          <Icon icon={IconItalic} />
          <Icon icon={IconUnderline} />
          <Icon icon={IconCopy} />
          <Icon icon={IconShare} />
          <Icon icon={IconTrash} />
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Icon icon={IconCopy} size={12} />
          <Icon icon={IconCopy} size={14} />
          <Icon icon={IconCopy} size={18} />
          <Icon icon={IconCopy} size={24} />
        </div>
      </section>
    </>
  );
}
