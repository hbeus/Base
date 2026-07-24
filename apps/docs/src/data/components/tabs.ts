import type { PropDef } from '~/components/PropsTable';

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
  {
    name: 'fill',
    type: 'boolean',
    default: 'false',
    description: 'Whether tabs stretch to fill the list width.',
  },
  {
    name: 'background',
    type: 'boolean',
    default: 'false',
    description: 'Show a background container. Only available with the button variant.',
  },
];

export const tabsTabProps: PropDef[] = [
  {
    name: 'label',
    type: 'string',
    default: 'Text extracted from children',
    description: 'Accessible text used when the tab moves into the overflow menu.',
  },
  {
    name: 'leading',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered before the label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered after the label.',
  },
];
