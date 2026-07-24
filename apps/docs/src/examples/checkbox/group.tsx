import { Checkbox, CheckboxGroup, Flex, Text } from '@base/ui';

export default function CheckboxGroupExample() {
  return (
    <CheckboxGroup>
      <Flex direction='column' gap='s8'>
        <Flex direction='row' align='center' gap='s8'>
          <Checkbox.Root name='prefs' value='terms'>
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Text size='bodySm'>Accept terms</Text>
        </Flex>
        <Flex direction='row' align='center' gap='s8'>
          <Checkbox.Root name='prefs' value='newsletter'>
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Text size='bodySm'>Subscribe to newsletter</Text>
        </Flex>
        <Flex direction='row' align='center' gap='s8'>
          <Checkbox.Root name='prefs' value='updates'>
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Text size='bodySm'>Receive updates</Text>
        </Flex>
      </Flex>
    </CheckboxGroup>
  );
}
