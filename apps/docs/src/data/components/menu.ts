import type { PropDef } from '~/components/PropsTable';

export const menuProps: PropDef[] = [
  {
    name: 'openOnHover',
    type: 'boolean',
    default: 'false',
    description: 'Whether the menu opens on hover instead of click.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '100',
    description: 'Delay in ms before the menu opens on hover.',
  },
];
