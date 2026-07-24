import { Checkbox, Flex, Text } from '@base/ui';

export default function CheckboxHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Flex direction='row' align='center' gap='s8'>
        <Checkbox.Root size='sm'>
          <Checkbox.Indicator />
        </Checkbox.Root>
        <Text size='bodySm'>Small checkbox</Text>
      </Flex>
      <Flex direction='row' align='center' gap='s8'>
        <Checkbox.Root size='md'>
          <Checkbox.Indicator />
        </Checkbox.Root>
        <Text size='bodySm'>Medium checkbox</Text>
      </Flex>
    </Flex>
  );
}
