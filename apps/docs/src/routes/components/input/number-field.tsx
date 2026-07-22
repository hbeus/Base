import { NumberField, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/number-field')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Number Field
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Numeric input with increment and decrement buttons.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          With increment / decrement
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <NumberField.Root defaultValue={5}>
            <NumberField.Group>
              <NumberField.Decrement>
                <IconMinus size={14} />
              </NumberField.Decrement>
              <NumberField.Input />
              <NumberField.Increment>
                <IconPlus size={14} />
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
          <NumberField.Root defaultValue={0} min={0} max={100}>
            <NumberField.Group>
              <NumberField.Decrement>
                <IconMinus size={14} />
              </NumberField.Decrement>
              <NumberField.Input size='sm' />
              <NumberField.Increment>
                <IconPlus size={14} />
              </NumberField.Increment>
            </NumberField.Group>
          </NumberField.Root>
        </div>
      </section>
    </>
  );
}
