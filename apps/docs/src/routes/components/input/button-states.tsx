import { ButtonState, Flex, Icon, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconChevronRight, IconCirclePlus } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/button-states')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Button States
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Wraps Base UI ButtonState with color variants.
        </Text>
      </header>
      <Flex direction='column' gap='s32'>
        <Flex as='section' direction='column' gap='s8'>
          <Text as='h2' size='label' weight='medium' color='secondary'>
            States
          </Text>
          <Flex direction='column' gap='s8' wrap>
            <ButtonState variant='positive'>Positive</ButtonState>
            <ButtonState variant='negative'>Negative</ButtonState>
            <ButtonState variant='semiNegative'>Semi Negative</ButtonState>
            <ButtonState variant='semiPositive'>Semi Positive</ButtonState>
            <ButtonState variant='neutral'>Neutral</ButtonState>
            <ButtonState variant='highlight'>Highlight</ButtonState>
          </Flex>
        </Flex>
        <Flex as='section' direction='column' gap='s8'>
          <Text as='h2' size='label' weight='medium' color='secondary'>
            Sizes
          </Text>
          <Flex gap='s8' wrap>
            <ButtonState variant='positive' size='xs'>
              Extra Small
            </ButtonState>
            <ButtonState variant='positive' size='sm'>
              Small
            </ButtonState>
            <ButtonState variant='positive' size='md'>
              Medium
            </ButtonState>
            <ButtonState variant='positive' size='lg'>
              Large
            </ButtonState>
          </Flex>
        </Flex>
        <Flex as='section' direction='column' gap='s8'>
          <Text as='h2' size='label' weight='medium' color='secondary'>
            Shape
          </Text>
          <Flex gap='s8' wrap>
            <ButtonState variant='positive'>Square</ButtonState>
            <ButtonState variant='positive' rounded>
              Rounded
            </ButtonState>
          </Flex>
        </Flex>
        <Flex as='section' direction='column' gap='s8'>
          <Text as='h2' size='label' weight='medium' color='secondary'>
            Leading and trailing slots
          </Text>
          <Flex gap='s8' wrap>
            <ButtonState variant='positive' leading={<Icon icon={IconCheck} />}>
              Leading slot icon
            </ButtonState>
            <ButtonState variant='positive' trailing={<Icon icon={IconChevronRight} />}>
              Trailing slot icon
            </ButtonState>
            <ButtonState
              variant='positive'
              leading={<Icon icon={IconCirclePlus} />}
              trailing={<Icon icon={IconChevronRight} />}
            >
              Leading and trailing slot icons
            </ButtonState>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
