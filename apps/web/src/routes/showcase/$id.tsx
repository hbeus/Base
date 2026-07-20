import {
  Accordion,
  AlertDialog,
  Avatar,
  Button,
  ButtonState,
  Card,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Dialog,
  Drawer,
  Flex,
  Icon,
  Input,
  Menu,
  Meter,
  NumberField,
  OtpField,
  Popover,
  Progress,
  Radio,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  Text,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
} from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import {
  IconBold,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCirclePlus,
  IconCopy,
  IconItalic,
  IconMinus,
  IconPlus,
  IconShare,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const Route = createFileRoute('/showcase/$id')({
  component: ShowcaseDetail,
});

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  section: {
    marginBottom: spacing.s32,
  },
  sectionTitle: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s12,
    alignItems: 'center',
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  previewColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
});

/* ——————————————————————————————————
   Input
   —————————————————————————————————— */

function ButtonsShowcase() {
  return (
    <Flex direction='column' gap='s32'>
      <section>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
  );
}

function ButtonStatesShowcase() {
  return (
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
  );
}

function InputsShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input size='sm' placeholder='Small input' />
          <Input size='md' placeholder='Medium input' />
          <Input size='lg' placeholder='Large input' />
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          States
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Input placeholder='Default' />
          <Input disabled placeholder='Disabled' />
        </div>
      </section>
    </>
  );
}

function CheckboxShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.labelRow)}>
            <Checkbox.Root size='sm'>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <Text size='bodySm'>Small checkbox</Text>
          </div>
          <div {...stylex.props(styles.labelRow)}>
            <Checkbox.Root size='md'>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <Text size='bodySm'>Medium checkbox</Text>
          </div>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Group
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <CheckboxGroup>
            <div {...stylex.props(styles.labelRow)}>
              <Checkbox.Root name='prefs' value='terms'>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Text size='bodySm'>Accept terms</Text>
            </div>
            <div {...stylex.props(styles.labelRow)}>
              <Checkbox.Root name='prefs' value='newsletter'>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Text size='bodySm'>Subscribe to newsletter</Text>
            </div>
            <div {...stylex.props(styles.labelRow)}>
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

function RadioShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Radio Group
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Radio.Group defaultValue='comfortable'>
          <div {...stylex.props(styles.labelRow)}>
            <Radio.Item value='compact'>
              <Radio.Indicator />
            </Radio.Item>
            <Text size='bodySm'>Compact</Text>
          </div>
          <div {...stylex.props(styles.labelRow)}>
            <Radio.Item value='comfortable'>
              <Radio.Indicator />
            </Radio.Item>
            <Text size='bodySm'>Comfortable</Text>
          </div>
          <div {...stylex.props(styles.labelRow)}>
            <Radio.Item value='spacious'>
              <Radio.Indicator />
            </Radio.Item>
            <Text size='bodySm'>Spacious</Text>
          </div>
        </Radio.Group>
      </div>
    </section>
  );
}

function SelectShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Select.Root defaultValue='apple'>
            <Select.Trigger>
              <Select.Value placeholder='Select a fruit...' />
              <Select.Icon>
                <IconChevronDown size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='apple'>
                    <Select.ItemText>Apple</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='banana'>
                    <Select.ItemText>Banana</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='cherry'>
                    <Select.ItemText>Cherry</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='grape'>
                    <Select.ItemText>Grape</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Select.Root>
            <Select.Trigger size='sm'>
              <Select.Value placeholder='Small' />
              <Select.Icon>
                <IconChevronDown size={14} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='a'>
                    <Select.ItemText>Option A</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='b'>
                    <Select.ItemText>Option B</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Select.Root>
            <Select.Trigger size='lg'>
              <Select.Value placeholder='Large' />
              <Select.Icon>
                <IconChevronDown size={18} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value='a'>
                    <Select.ItemText>Option A</Select.ItemText>
                  </Select.Item>
                  <Select.Item value='b'>
                    <Select.ItemText>Option B</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </section>
    </>
  );
}

function SliderShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Slider.Root defaultValue={50}>
            <Flex direction='row' justify='between'>
              <Slider.Label>Volume</Slider.Label>
              <Slider.Value />
            </Flex>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Range
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Slider.Root defaultValue={[25, 75]}>
            <Flex direction='row' justify='between'>
              <Slider.Label>Price range</Slider.Label>
              <Slider.Value />
            </Flex>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
                <Slider.Thumb />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>
      </section>
    </>
  );
}

function NumberFieldShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        With increment / decrement
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
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
  );
}

function SwitchShowcase() {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Small</Text>
            <Switch size='sm' checked={checked} onCheckedChange={setChecked} />
          </div>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Medium</Text>
            <Switch size='md' checked={checked} onCheckedChange={setChecked} />
          </div>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Example
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <div {...stylex.props(styles.toggleRow)}>
            <Text size='bodySm'>Enable notifications</Text>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </section>
    </>
  );
}

function ToggleShowcase() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Toggle buttons
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Toggle pressed={bold} onPressedChange={setBold}>
          <IconBold size={16} />
        </Toggle>
        <Toggle pressed={italic} onPressedChange={setItalic}>
          <IconItalic size={16} />
        </Toggle>
      </div>
    </section>
  );
}

function ToggleGroupShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Default
        </Text>
        <div {...stylex.props(styles.preview)}>
          <ToggleGroup.Root defaultValue={['center']}>
            <ToggleGroup.Item value='left'>Left</ToggleGroup.Item>
            <ToggleGroup.Item value='center'>Center</ToggleGroup.Item>
            <ToggleGroup.Item value='right'>Right</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='sm'>
              Small
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='sm'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='md'>
              Medium
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='md'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <ToggleGroup.Root defaultValue={['a']}>
            <ToggleGroup.Item value='a' size='lg'>
              Large
            </ToggleGroup.Item>
            <ToggleGroup.Item value='b' size='lg'>
              Option
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </section>
    </>
  );
}

function OtpFieldShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        6-digit code
      </Text>
      <div {...stylex.props(styles.preview)}>
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
  );
}

/* ——————————————————————————————————
   Layout & Navigation
   —————————————————————————————————— */

function AccordionShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
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

function CollapsibleShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Default
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Collapsible.Root>
          <Collapsible.Trigger render={<Button variant='ghost' size='sm' />}>
            Toggle content
          </Collapsible.Trigger>
          <Collapsible.Panel>
            <Flex direction='column' gap='s8'>
              <Text size='bodySm' color='secondary'>
                This content can be collapsed and expanded. The panel animates its height using Base
                UI&apos;s built-in height transition.
              </Text>
              <Text size='bodySm' color='secondary'>
                Additional content that is hidden when collapsed.
              </Text>
            </Flex>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    </section>
  );
}

function TabsShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Default
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Tabs.Root defaultValue='account'>
          <Tabs.List>
            <Tabs.Tab value='account'>Account</Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
            <Tabs.Tab value='billing'>Billing</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value='account'>
            <Text size='bodySm' color='secondary'>
              Manage your account details and profile information.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value='settings'>
            <Text size='bodySm' color='secondary'>
              Configure your notification preferences and privacy settings.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value='billing'>
            <Text size='bodySm' color='secondary'>
              View your billing history and update payment methods.
            </Text>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    </section>
  );
}

function ToolbarShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Formatting toolbar
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Toolbar.Root>
          <Toolbar.Group>
            <Toolbar.Button>
              <IconBold size={16} />
            </Toolbar.Button>
            <Toolbar.Button>
              <IconItalic size={16} />
            </Toolbar.Button>
            <Toolbar.Button>
              <IconUnderline size={16} />
            </Toolbar.Button>
          </Toolbar.Group>
          <Toolbar.Separator />
          <Toolbar.Group>
            <Toolbar.Button>
              <IconCopy size={16} />
            </Toolbar.Button>
            <Toolbar.Button>
              <IconShare size={16} />
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      </div>
    </section>
  );
}

function SeparatorShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Horizontal
        </Text>
        <div {...stylex.props(styles.previewColumn)}>
          <Text size='bodySm'>Content above</Text>
          <Separator />
          <Text size='bodySm'>Content below</Text>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Vertical
        </Text>
        <Flex direction='row' align='center' gap='s4' style={styles.preview}>
          <Text size='bodySm'>Left</Text>
          <Separator orientation='vertical' />
          <Text size='bodySm'>Right</Text>
        </Flex>
      </section>
    </>
  );
}

/* ——————————————————————————————————
   Overlays
   —————————————————————————————————— */

function DialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Modal
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger render={<Button variant='primary' />}>Open dialog</Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Content>
                  <Dialog.Title>Dialog title</Dialog.Title>
                  <Dialog.Description>
                    This is a compound component dialog built with Base UI, styled with StyleX, and
                    animated with motion.dev.
                  </Dialog.Description>
                  <Dialog.Footer>
                    <Dialog.Close render={<Button variant='ghost' size='sm' />}>
                      Cancel
                    </Dialog.Close>
                    <Dialog.Close render={<Button size='sm' />}>Confirm</Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </section>
  );
}

function AlertDialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Destructive confirmation
      </Text>
      <div {...stylex.props(styles.preview)}>
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
          <AlertDialog.Trigger render={<Button variant='primary' />}>
            Delete item
          </AlertDialog.Trigger>
          <AnimatePresence>
            {open && (
              <AlertDialog.Portal>
                <AlertDialog.Backdrop />
                <AlertDialog.Content>
                  <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                  <AlertDialog.Description>
                    This action cannot be undone. The item will be permanently deleted.
                  </AlertDialog.Description>
                  <Flex direction='row' gap='s8' justify='end'>
                    <AlertDialog.Close render={<Button variant='ghost' size='sm' />}>
                      Cancel
                    </AlertDialog.Close>
                    <AlertDialog.Close render={<Button size='sm' />}>Delete</AlertDialog.Close>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            )}
          </AnimatePresence>
        </AlertDialog.Root>
      </div>
    </section>
  );
}

function DrawerShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Side panel
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger render={<Button variant='primary' />}>Open drawer</Drawer.Trigger>
          <AnimatePresence>
            {open && (
              <Drawer.Portal>
                <Drawer.Backdrop />
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Title>Drawer title</Drawer.Title>
                    <Drawer.Description>
                      This is a side panel drawer. It slides in from the right edge of the screen.
                    </Drawer.Description>
                    <Flex direction='row' gap='s8'>
                      <Drawer.Close render={<Button variant='ghost' size='sm' />}>
                        Close
                      </Drawer.Close>
                    </Flex>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Portal>
            )}
          </AnimatePresence>
        </Drawer.Root>
      </div>
    </section>
  );
}

function PopoverShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Default
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Popover.Root>
          <Popover.Trigger render={<Button variant='primary' />}>Open popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Arrow />
                <Popover.Title>Popover title</Popover.Title>
                <Popover.Description>
                  This is a popover with an arrow pointing to its trigger element.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </section>
  );
}

function TooltipShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Hover to reveal
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant='primary' />}>
              <IconCopy size={16} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  <Tooltip.Arrow />
                  Copy to clipboard
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant='primary' />}>
              <IconShare size={16} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  <Tooltip.Arrow />
                  Share
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant='primary' />}>
              <IconTrash size={16} />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  <Tooltip.Arrow />
                  Delete
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </section>
  );
}

function MenuShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Dropdown menu
      </Text>
      <div {...stylex.props(styles.preview)}>
        <Menu.Root>
          <Menu.Trigger render={<Button variant='primary' />}>Actions</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>
                  <IconCopy size={14} />
                  Copy
                </Menu.Item>
                <Menu.Item>
                  <IconShare size={14} />
                  Share
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item>
                  <IconTrash size={14} />
                  Delete
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </section>
  );
}

/* ——————————————————————————————————
   Display
   —————————————————————————————————— */

function AvatarShowcase() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Sizes
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Avatar.Root size='sm'>
            <Avatar.Fallback>S</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='md'>
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>L</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Fallback initials
        </Text>
        <div {...stylex.props(styles.preview)}>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>HB</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size='lg'>
            <Avatar.Fallback>AK</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </section>
    </>
  );
}

function ProgressShowcase() {
  const [value, setValue] = useState(65);

  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Default
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Progress.Root value={value}>
          <Flex direction='row' justify='between'>
            <Progress.Label>Uploading...</Progress.Label>
            <Progress.Value />
          </Flex>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
        <Flex direction='row' gap='s8'>
          <Button
            variant='ghost'
            size='xs'
            onClick={() => setValue(v => Math.max(0, v - 10))}
          >
            -10
          </Button>
          <Button
            variant='ghost'
            size='xs'
            onClick={() => setValue(v => Math.min(100, v + 10))}
          >
            +10
          </Button>
        </Flex>
      </div>
    </section>
  );
}

function MeterShowcase() {
  return (
    <section {...stylex.props(styles.section)}>
      <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
        Default
      </Text>
      <div {...stylex.props(styles.previewColumn)}>
        <Meter.Root value={72}>
          <Flex direction='row' justify='between'>
            <Meter.Label>Storage used</Meter.Label>
            <Meter.Value />
          </Flex>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
        <Meter.Root value={30}>
          <Flex direction='row' justify='between'>
            <Meter.Label>CPU usage</Meter.Label>
            <Meter.Value />
          </Flex>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      </div>
    </section>
  );
}

/* ——————————————————————————————————
   Registry
   —————————————————————————————————— */

const showcases: Record<
  string,
  { title: string; description: string; component: () => React.JSX.Element }
> = {
  buttons: {
    title: 'Button',
    description: 'Wraps Base UI Button with variant and size props, motion whileTap.',
    component: ButtonsShowcase,
  },
  'button-states': {
    title: 'Button States',
    description: 'Wraps Base UI ButtonState with color variants.',
    component: ButtonStatesShowcase,
  },
  inputs: {
    title: 'Input',
    description: 'Wraps Base UI Input with size variants.',
    component: InputsShowcase,
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Checkbox with spring-animated indicator and group support.',
    component: CheckboxShowcase,
  },
  radio: {
    title: 'Radio',
    description: 'Radio group with spring-animated indicator.',
    component: RadioShowcase,
  },
  select: {
    title: 'Select',
    description: 'Dropdown select with animated popup and size variants.',
    component: SelectShowcase,
  },
  slider: {
    title: 'Slider',
    description: 'Range slider with label, value output, and range mode.',
    component: SliderShowcase,
  },
  'number-field': {
    title: 'Number Field',
    description: 'Numeric input with increment and decrement buttons.',
    component: NumberFieldShowcase,
  },
  switch: {
    title: 'Switch',
    description: 'Toggle switch with spring-animated thumb.',
    component: SwitchShowcase,
  },
  toggle: {
    title: 'Toggle',
    description: 'Pressable two-state toggle button.',
    component: ToggleShowcase,
  },
  'toggle-group': {
    title: 'Toggle Group',
    description: 'Segmented control with size variants.',
    component: ToggleGroupShowcase,
  },
  'otp-field': {
    title: 'OTP Field',
    description: 'One-time password input with individual character slots.',
    component: OtpFieldShowcase,
  },
  accordion: {
    title: 'Accordion',
    description:
      'Compound component — Accordion.Root wraps Accordion.Item children with animated panels.',
    component: AccordionShowcase,
  },
  collapsible: {
    title: 'Collapsible',
    description: 'Single collapsible section with animated height transition.',
    component: CollapsibleShowcase,
  },
  tabs: {
    title: 'Tabs',
    description: 'Tabbed content with animated underline indicator.',
    component: TabsShowcase,
  },
  toolbar: {
    title: 'Toolbar',
    description: 'Grouped action buttons with separators.',
    component: ToolbarShowcase,
  },
  separator: {
    title: 'Separator',
    description: 'Horizontal and vertical dividers.',
    component: SeparatorShowcase,
  },
  dialog: {
    title: 'Dialog',
    description: 'Compound component pattern — Dialog.Root, Dialog.Trigger, Dialog.Content, etc.',
    component: DialogShowcase,
  },
  'alert-dialog': {
    title: 'Alert Dialog',
    description: 'Confirmation dialog for destructive or irreversible actions.',
    component: AlertDialogShowcase,
  },
  drawer: {
    title: 'Drawer',
    description: 'Side panel overlay that slides in from the edge.',
    component: DrawerShowcase,
  },
  popover: {
    title: 'Popover',
    description: 'Positioned popup with arrow, title, and description.',
    component: PopoverShowcase,
  },
  tooltip: {
    title: 'Tooltip',
    description: 'Hover-triggered informational popup with arrow.',
    component: TooltipShowcase,
  },
  menu: {
    title: 'Menu',
    description: 'Dropdown menu with items, icons, and separators.',
    component: MenuShowcase,
  },
  avatar: {
    title: 'Avatar',
    description: 'User avatar with size variants and fallback initials.',
    component: AvatarShowcase,
  },
  progress: {
    title: 'Progress',
    description: 'Progress bar with label and value display.',
    component: ProgressShowcase,
  },
  meter: {
    title: 'Meter',
    description: 'Meter gauge for displaying measured values.',
    component: MeterShowcase,
  },
};

function ShowcaseDetail() {
  const { id } = Route.useParams();
  const showcase = showcases[id];

  if (!showcase) {
    return (
      <Text as='p' size='bodySm' color='secondary'>
        Component &ldquo;{id}&rdquo; not found.
      </Text>
    );
  }

  const Component = showcase.component;

  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='display' weight='semibold' capitalize>
          {showcase.title}
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          {showcase.description}
        </Text>
      </header>
      <Component />
    </>
  );
}
