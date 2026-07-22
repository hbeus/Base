import { Radio, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/radio')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Radio
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Radio group with spring-animated indicator.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          Radio Group
        </Text>
        <div {...stylex.props(docStyles.previewColumn)}>
          <Radio.Group defaultValue='comfortable'>
            <div {...stylex.props(docStyles.labelRow)}>
              <Radio.Item value='compact'>
                <Radio.Indicator />
              </Radio.Item>
              <Text size='bodySm'>Compact</Text>
            </div>
            <div {...stylex.props(docStyles.labelRow)}>
              <Radio.Item value='comfortable'>
                <Radio.Indicator />
              </Radio.Item>
              <Text size='bodySm'>Comfortable</Text>
            </div>
            <div {...stylex.props(docStyles.labelRow)}>
              <Radio.Item value='spacious'>
                <Radio.Indicator />
              </Radio.Item>
              <Text size='bodySm'>Spacious</Text>
            </div>
          </Radio.Group>
        </div>
      </section>
    </>
  );
}
