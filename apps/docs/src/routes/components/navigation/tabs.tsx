import { Icon, Tabs, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconCreditCard, IconSettings, IconUser } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/navigation/tabs')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Tabs
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Tabbed content with animated underline indicator. Use leading and
          trailing slots for icons beside tab labels.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List>
              <Tabs.Tab value='account'>Account</Tabs.Tab>
              <Tabs.Tab value='settings'>Settings</Tabs.Tab>
              <Tabs.Tab value='billing'>Billing</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value='account'>
              <Text size='bodySm' color='secondary'>
                Manage your account details and profile information.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='settings'>
              <Text size='bodySm' color='secondary'>
                Configure your notification preferences and privacy settings.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='billing'>
              <Text size='bodySm' color='secondary'>
                View your billing history and update payment methods.
              </Text>
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Leading slots
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List>
              <Tabs.Tab value='account' leading={<Icon icon={IconUser} />}>
                Account
              </Tabs.Tab>
              <Tabs.Tab value='settings' leading={<Icon icon={IconSettings} />}>
                Settings
              </Tabs.Tab>
              <Tabs.Tab value='billing' leading={<Icon icon={IconCreditCard} />}>
                Billing
              </Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value='account'>
              <Text size='bodySm' color='secondary'>
                Manage your account details and profile information.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='settings'>
              <Text size='bodySm' color='secondary'>
                Configure your notification preferences and privacy settings.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='billing'>
              <Text size='bodySm' color='secondary'>
                View your billing history and update payment methods.
              </Text>
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
}

