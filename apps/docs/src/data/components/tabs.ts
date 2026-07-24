import type { PropDef } from '~/components/PropsTable';

export const tabsRootProps: PropDef[] = [
  {
    name: 'fill',
    type: 'boolean',
    default: 'false',
    description: 'Stretch the root and equal-width tab items to fill the parent.',
  },
  {
    name: 'onValueChange',
    type: '(value: TabValue) => void',
    default: 'undefined',
    description: 'Called when the active tab value changes.',
  },
];

export const tabsListProps: PropDef[] = [
  {
    name: 'variant',
    type: "'underline' | 'button'",
    default: "'underline'",
    description: 'Visual style of the tab list.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size of all tabs.',
  },
];

export const tabsMenuItemProps: PropDef[] = [
  {
    name: 'value',
    type: 'TabValue',
    default: '—',
    description: 'The tab value this item activates when selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the item is disabled.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Label text for the menu item.',
  },
];
