import { Avatar, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/display/avatar')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Avatar
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          User avatar with size variants and fallback initials.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Avatar.Root size='sm'>
            <Avatar.Fallback>S</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='md'>
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>L</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Fallback initials
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>HB</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>AK</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </section>
    </>
  );
}
