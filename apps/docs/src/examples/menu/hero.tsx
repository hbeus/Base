import { Button, Menu } from '@base/ui';
import { IconCopy, IconShare, IconTrash } from '@tabler/icons-react';

export default function MenuHero() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant='primary' />}>Actions</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>
              <IconCopy size={14} />
              Copy
            </Menu.Item>
            <Menu.Item>
              <IconShare size={14} />
              Share
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>
              <IconTrash size={14} />
              Delete
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
