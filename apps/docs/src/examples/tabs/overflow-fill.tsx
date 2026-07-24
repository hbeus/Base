import { Tabs, Text } from '@base/ui';

const tabs = [
  {
    value: 'account',
    label: 'Account',
    body: 'Manage your account details and profile information.',
  },
  {
    value: 'settings',
    label: 'Settings',
    body: 'Configure your notification preferences and privacy settings.',
  },
  {
    value: 'billing',
    label: 'Billing',
    body: 'View your billing history and update payment methods.',
  },
  { value: 'team', label: 'Team', body: 'Invite teammates and manage roles.' },
  {
    value: 'security',
    label: 'Security',
    body: 'Passkeys, sessions, and two-factor authentication.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    body: 'Email and push notification preferences.',
  },
  { value: 'integrations', label: 'Integrations', body: 'Connected apps and API tokens.' },
] as const;

export default function TabsOverflowFill() {
  return (
    <Tabs.Root defaultValue='account'>
      <Tabs.List variant='button' background fill>
        {tabs.map(tab => (
          <Tabs.Tab key={tab.value} value={tab.value} label={tab.label}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map(tab => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <Text size='bodySm' color='secondary'>
            {tab.body}
          </Text>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
