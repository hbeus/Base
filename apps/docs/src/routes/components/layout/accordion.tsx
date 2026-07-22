import { Accordion, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/layout/accordion')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Accordion
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Compound component -- Accordion.Root wraps Accordion.Item children with animated panels.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Default
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='What is Base UI?'>
            <Text weight='regular' color='secondary'>
              Base UI is an unstyled component library from the MUI team. It provides accessible,
              headless primitives that you style yourself.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Why StyleX?'>
            <Text weight='regular' color='secondary'>
              StyleX provides atomic CSS with type-safe design tokens, co-located styles, and
              zero-runtime overhead in production.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='How are animations handled?'>
            <Text weight='regular' color='secondary'>
              Animations use motion.dev for declarative enter/exit transitions and spring physics.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Multiple
        </Text>
        <Accordion.Root multiple>
          <Accordion.Item trigger='Section one'>
            <Text weight='regular' color='secondary'>
              Multiple items can be open at the same time when the multiple prop is set.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Section two'>
            <Text weight='regular' color='secondary'>
              Try opening this while the first section is still expanded.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Disabled
        </Text>
        <Accordion.Root>
          <Accordion.Item trigger='Enabled item'>
            <Text weight='regular' color='secondary'>
              This item can be toggled.
            </Text>
          </Accordion.Item>
          <Accordion.Item trigger='Disabled item' disabled>
            <Text weight='regular' color='secondary'>
              This item cannot be toggled.
            </Text>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </>
  );
}
