import { Icon, Tabs, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconCreditCard, IconSettings, IconUser } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/navigation/tabs')({
  component: PageComponent,
});

const styles = stylex.create({
  overflowPreview: {
    maxWidth: '20rem',
  },
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Tabs
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Tabbed content with a motion-shared active indicator. Use{' '}
          <Text as='span' size='bodySm' weight='medium'>
            underline
          </Text>{' '}
          (default) or{' '}
          <Text as='span' size='bodySm' weight='medium'>
            button
          </Text>{' '}
          variants; leading and trailing slots support icons beside labels.
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
          Button
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List variant='button'>
              <Tabs.Tab value='account'>Account</Tabs.Tab>
              <Tabs.Tab value='settings'>Settings</Tabs.Tab>
              <Tabs.Tab value='billing'>Billing</Tabs.Tab>
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
          Button with background
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List variant='button' background>
              <Tabs.Tab value='account'>Account</Tabs.Tab>
              <Tabs.Tab value='settings'>Settings</Tabs.Tab>
              <Tabs.Tab value='billing'>Billing</Tabs.Tab>
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
          Fill
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List variant='button' background fill>
              <Tabs.Tab value='account'>Account</Tabs.Tab>
              <Tabs.Tab value='settings'>Settings</Tabs.Tab>
              <Tabs.Tab value='billing'>Billing</Tabs.Tab>
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
          Overflow
        </Text>
        <Text as='p' size='bodySm' color='secondary' style={docStyles.sectionTitle}>
          When tabs don't fit, trailing items collapse into a More menu automatically.
        </Text>
        <div {...stylex.props(docStyles.previewColumn, styles.overflowPreview)}>
          <Tabs.Root defaultValue='account'>
            <Tabs.List variant='button' background fill>
              <Tabs.Tab value='account'>Account</Tabs.Tab>
              <Tabs.Tab value='settings'>Settings</Tabs.Tab>
              <Tabs.Tab value='billing'>Billing</Tabs.Tab>
              <Tabs.Tab value='team'>Team</Tabs.Tab>
              <Tabs.Tab value='security'>Security</Tabs.Tab>
              <Tabs.Tab value='notifications'>Notifications</Tabs.Tab>
              <Tabs.Tab value='integrations'>Integrations</Tabs.Tab>
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
            <Tabs.Panel value='team'>
              <Text size='bodySm' color='secondary'>
                Invite teammates and manage roles.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='security'>
              <Text size='bodySm' color='secondary'>
                Passkeys, sessions, and two-factor authentication.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='notifications'>
              <Text size='bodySm' color='secondary'>
                Email and push notification preferences.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value='integrations'>
              <Text size='bodySm' color='secondary'>
                Connected apps and API tokens.
              </Text>
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
}
