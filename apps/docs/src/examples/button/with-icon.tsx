import { Button, Icon } from '@base/ui';
import { Flex } from '@base/ui';
import { IconPlus, IconArrowRight } from '@tabler/icons-react';

export default function ButtonWithIcon() {
  return (
    <Flex direction='row' gap='s8'>
      <Button>
        <Icon icon={IconPlus} />
        Create
      </Button>
      <Button variant='ghost'>
        Continue
        <Icon icon={IconArrowRight} />
      </Button>
    </Flex>
  );
}
