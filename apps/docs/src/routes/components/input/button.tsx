import { Button, Card, Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/button')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Button
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Wraps Base UI Button with variant and size props, motion whileTap.
        </Text>
      </header>
      <Flex direction='column' gap='s32'>
        <section>
          <Text
            as='h2'
            size='label'
            weight='medium'
            color='secondary'
            style={docStyles.sectionTitle}
          >
            Variants
          </Text>
          <Card>
            <Flex direction='column' gap='s40'>
              <Flex direction='row' gap='s8'>
                <Button variant='accent'>Accent</Button>
                <Button variant='primary'>Primary</Button>
                <Button variant='ghost'>Ghost</Button>
              </Flex>
              <Flex direction='column' gap='s12'>
                <Button variant='accent'>Accent</Button>
                <Button variant='primary'>Primary</Button>
                <Button variant='ghost'>Ghost</Button>
              </Flex>
            </Flex>
          </Card>
        </section>
        <section>
          <Text
            as='h2'
            size='label'
            weight='medium'
            color='secondary'
            style={docStyles.sectionTitle}
          >
            Sizes
          </Text>
          <Card>
            <Flex direction='row' gap='s8' align='center'>
              <Button size='xs'>Extra Small</Button>
              <Button size='sm'>Small</Button>
              <Button size='md'>Medium</Button>
              <Button size='lg'>Large</Button>
            </Flex>
          </Card>
        </section>
        <section>
          <Text
            as='h2'
            size='label'
            weight='medium'
            color='secondary'
            style={docStyles.sectionTitle}
          >
            Disabled
          </Text>
          <Card>
            <Card>
              <Flex direction='row' gap='s8'>
                <Button variant='accent' disabled>
                  Accent
                </Button>
                <Button variant='primary' disabled>
                  Primary
                </Button>
                <Button variant='ghost' disabled>
                  Ghost
                </Button>
              </Flex>
            </Card>
          </Card>
        </section>
      </Flex>
    </>
  );
}
