import { Icon, Tabs, Text } from '@base/ui';
import { IconCreditCard, IconSettings, IconUser } from '@tabler/icons-react';

export default function TabsLeadingSlots() {
  return (
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
  );
}
