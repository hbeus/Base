import { Tabs, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    width: '100%',
    maxWidth: '20rem',
  },
});

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

export default function TabsOverflow() {
  return (
    <Tabs.Root defaultValue='account' style={styles.root}>
      <Tabs.List variant='button' background>
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
