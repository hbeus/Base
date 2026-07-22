import { Checkbox, CheckboxGroup, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/checkbox')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Checkbox
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Checkbox with spring-animated indicator and group support.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <div {...stylex.props(docStyles.labelRow)}>
            <Checkbox.Root size='sm'>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <Text size='bodySm'>Small checkbox</Text>
          </div>
          <div {...stylex.props(docStyles.labelRow)}>
            <Checkbox.Root size='md'>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <Text size='bodySm'>Medium checkbox</Text>
          </div>
        </div>
      </section>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Group
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <CheckboxGroup>
            <div {...stylex.props(docStyles.labelRow)}>
              <Checkbox.Root name='prefs' value='terms'>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Text size='bodySm'>Accept terms</Text>
            </div>
            <div {...stylex.props(docStyles.labelRow)}>
              <Checkbox.Root name='prefs' value='newsletter'>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Text size='bodySm'>Subscribe to newsletter</Text>
            </div>
            <div {...stylex.props(docStyles.labelRow)}>
              <Checkbox.Root name='prefs' value='updates'>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Text size='bodySm'>Receive updates</Text>
            </div>
          </CheckboxGroup>
        </div>
      </section>
    </>
  );
}
