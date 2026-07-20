import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseCombobox.Root>) {
  return <BaseCombobox.Root {...props} />;
}

/* ---------- Label ---------- */
export interface ComboboxLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Label>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s4,
  },
});

function Label({ style, ref, ...props }: ComboboxLabelProps) {
  return (
    <BaseCombobox.Label
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
function Value(props: ComponentPropsWithoutRef<typeof BaseCombobox.Value>) {
  return <BaseCombobox.Value {...props} />;
}

/* ---------- Input ---------- */
export interface ComboboxInputProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Input>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLInputElement>;
}

const inputStyles = stylex.create({
  base: {
    flex: 1,
    minWidth: 0,
    height: elementSize.md,
    paddingInline: spacing.s12,
    fontSize: typography.bodySmSize,
    color: colors.foregroundPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    outline: 'none',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
  },
});

function Input({ style, ref, ...props }: ComboboxInputProps) {
  return (
    <BaseCombobox.Input
      ref={ref}
      {...stylex.props(inputStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- InputGroup ---------- */
export interface ComboboxInputGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.InputGroup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const inputGroupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
    backgroundColor: 'transparent',
    transition: 'border-color 0.15s',
    ':focus-within': {
      borderColor: colors.highlight,
    },
  },
});

function InputGroup({ style, ref, ...props }: ComboboxInputGroupProps) {
  return (
    <BaseCombobox.InputGroup
      ref={ref}
      {...stylex.props(inputGroupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseCombobox.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseCombobox.Trigger ref={ref} {...props} />;
}

/* ---------- Icon ---------- */
function Icon(props: ComponentPropsWithoutRef<typeof BaseCombobox.Icon>) {
  return <BaseCombobox.Icon {...props} />;
}

/* ---------- Clear ---------- */
function Clear({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseCombobox.Clear> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseCombobox.Clear ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseCombobox.Portal>) {
  return <BaseCombobox.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>) {
  return <BaseCombobox.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface ComboboxPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s4,
    outline: 'none',
    boxShadow: colors.shadowElevated,
  },
});

function Popup({ style, ref, ...props }: ComboboxPopupProps) {
  return (
    <BaseCombobox.Popup
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- List ---------- */
function List(props: ComponentPropsWithoutRef<typeof BaseCombobox.List>) {
  return <BaseCombobox.List {...props} />;
}

/* ---------- Item ---------- */
export interface ComboboxItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Item>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const itemStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    borderRadius: radii.r8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':focus-visible': {
      backgroundColor: colors.lighten4,
    },
  },
});

function Item({ style, ref, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemIndicator ---------- */
function ItemIndicator(props: ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator>) {
  return <BaseCombobox.ItemIndicator {...props} />;
}

/* ---------- Group ---------- */
function Group(props: ComponentPropsWithoutRef<typeof BaseCombobox.Group>) {
  return <BaseCombobox.Group {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface ComboboxGroupLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const groupLabelStyles = stylex.create({
  base: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s4,
    fontSize: typography.labelSize,
    fontWeight: 500,
    color: colors.foregroundSecondary,
  },
});

function GroupLabel({ style, ref, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Empty ---------- */
export interface ComboboxEmptyProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Empty>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const emptyStyles = stylex.create({
  base: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s16,
    fontSize: typography.bodySmSize,
    color: colors.foregroundSecondary,
    textAlign: 'center',
  },
});

function Empty({ style, ref, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty
      ref={ref}
      {...stylex.props(emptyStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface ComboboxArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCombobox.Arrow>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surfaceRaised,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: ComboboxArrowProps) {
  return (
    <BaseCombobox.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Status ---------- */
function Status(props: ComponentPropsWithoutRef<typeof BaseCombobox.Status>) {
  return <BaseCombobox.Status {...props} />;
}

/* ---------- Chips ---------- */
function Chips(props: ComponentPropsWithoutRef<typeof BaseCombobox.Chips>) {
  return <BaseCombobox.Chips {...props} />;
}

/* ---------- Chip ---------- */
function Chip(props: ComponentPropsWithoutRef<typeof BaseCombobox.Chip>) {
  return <BaseCombobox.Chip {...props} />;
}

/* ---------- ChipRemove ---------- */
function ChipRemove(props: ComponentPropsWithoutRef<typeof BaseCombobox.ChipRemove>) {
  return <BaseCombobox.ChipRemove {...props} />;
}

/* ---------- Export ---------- */
export const Combobox = {
  Root,
  Label,
  Value,
  Input,
  InputGroup,
  Trigger,
  Icon,
  Clear,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  ItemIndicator,
  Group,
  GroupLabel,
  Empty,
  Arrow,
  Status,
  Chips,
  Chip,
  ChipRemove,
  useFilter: BaseCombobox.useFilter,
  useFilteredItems: BaseCombobox.useFilteredItems,
};
