import { Text } from '@base/ui';
import { Tabs } from '@base/ui/alpha/Tabs';

export default function TabsAlphaFill() {
  return (
    <Tabs.Root defaultValue='account' fill>
      <Tabs.List variant='underline'>
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
  );
}
