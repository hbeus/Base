import { Flex, Pressable, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/showcase/')({
  component: ShowcaseIndex,
});

const components = [
  { id: 'buttons', label: 'Button', description: 'Primary, ghost, and accent variants with sizes' },
  {
    id: 'button-states',
    label: 'Button States',
    description: 'Positive, negative, and neutral state indicators',
  },
  { id: 'inputs', label: 'Input', description: 'Text inputs with size variants' },
  { id: 'checkbox', label: 'Checkbox', description: 'Checkbox with animated indicator and group' },
  { id: 'radio', label: 'Radio', description: 'Radio group with spring-animated indicator' },
  { id: 'select', label: 'Select', description: 'Dropdown select with animated popup' },
  { id: 'slider', label: 'Slider', description: 'Range slider with label and value output' },
  {
    id: 'number-field',
    label: 'Number Field',
    description: 'Numeric input with increment/decrement',
  },
  { id: 'switch', label: 'Switch', description: 'Toggle switch with spring-animated thumb' },
  { id: 'toggle', label: 'Toggle', description: 'Pressable two-state toggle button' },
  {
    id: 'toggle-group',
    label: 'Toggle Group',
    description: 'Segmented control with size variants',
  },
  { id: 'otp-field', label: 'OTP Field', description: 'One-time password input field' },
  { id: 'accordion', label: 'Accordion', description: 'Collapsible sections with animated reveal' },
  { id: 'collapsible', label: 'Collapsible', description: 'Single collapsible section' },
  { id: 'tabs', label: 'Tabs', description: 'Tabbed content with animated indicator' },
  { id: 'toolbar', label: 'Toolbar', description: 'Grouped action buttons with separators' },
  { id: 'separator', label: 'Separator', description: 'Horizontal and vertical dividers' },
  { id: 'dialog', label: 'Dialog', description: 'Modal dialog with compound component pattern' },
  {
    id: 'alert-dialog',
    label: 'Alert Dialog',
    description: 'Confirmation dialog for destructive actions',
  },
  { id: 'drawer', label: 'Drawer', description: 'Side panel overlay' },
  { id: 'popover', label: 'Popover', description: 'Positioned popup with arrow' },
  { id: 'tooltip', label: 'Tooltip', description: 'Hover-triggered informational popup' },
  { id: 'menu', label: 'Menu', description: 'Dropdown menu with items and separators' },
  { id: 'avatar', label: 'Avatar', description: 'User avatar with sizes and fallback' },
  { id: 'progress', label: 'Progress', description: 'Progress bar with label' },
  { id: 'meter', label: 'Meter', description: 'Meter gauge for measured values' },
  {
    id: 'themes',
    label: 'Themes',
    description: 'OKLCH-generated color themes with relative chroma',
  },
];

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    paddingBlock: spacing.s16,
    textDecoration: 'none',
  },
});

function ShowcaseIndex() {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='hero'>
          Components
        </Text>
        <Text as='p' color='secondary'>
          Styled atoms built on Base UI primitives, styled with StyleX tokens, and animated with
          Motion.
        </Text>
      </header>
      <nav {...stylex.props(styles.nav)}>
        {components.map(c => (
          <Pressable key={c.id} inset='s16' role='link'>
            <Link to='/showcase/$id' params={{ id: c.id }}>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Flex direction='column' gap='s4'>
                  <Text size='body'>{c.label}</Text>
                  <Text size='bodySm' color='secondary'>
                    {c.description}
                  </Text>
                </Flex>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
        ))}
      </nav>
    </>
  );
}
