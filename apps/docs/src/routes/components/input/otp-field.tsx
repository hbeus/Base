import { OtpField, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { docStyles } from '~/styles/docs';

export const Route = createFileRoute('/components/input/otp-field')({
  component: PageComponent,
});

function PageComponent() {
  return (
    <>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          OTP Field
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          One-time password input with individual character slots.
        </Text>
      </header>
      <section {...stylex.props(docStyles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={docStyles.sectionTitle}>
          6-digit code
        </Text>
        <div {...stylex.props(docStyles.preview)}>
          <OtpField.Root length={6}>
            <OtpField.Input />
            <OtpField.Input />
            <OtpField.Input />
            <OtpField.Separator />
            <OtpField.Input />
            <OtpField.Input />
            <OtpField.Input />
          </OtpField.Root>
        </div>
      </section>
    </>
  );
}
