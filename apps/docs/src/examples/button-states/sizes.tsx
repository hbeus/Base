import { ButtonState, Flex } from '@base/ui';

export default function ButtonStatesSizes() {
  return (
    <Flex gap='s8' wrap>
      <ButtonState variant='positive' size='xs'>Extra Small</ButtonState>
      <ButtonState variant='positive' size='sm'>Small</ButtonState>
      <ButtonState variant='positive' size='md'>Medium</ButtonState>
      <ButtonState variant='positive' size='lg'>Large</ButtonState>
    </Flex>
  );
}
