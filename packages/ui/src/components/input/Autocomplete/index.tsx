import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
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
function Root(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Root>) {
  return <BaseAutocomplete.Root {...props} />;
}

/* ---------- Value ---------- */
function Value(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseAutocomplete.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseAutocomplete.Trigger ref={ref} {...props} />;
}

/* ---------- Input ---------- */
export interface AutocompleteInputProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>, 'style'>,
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

function Input({ style, ref, ...props }: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      ref={ref}
      {...stylex.props(inputStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- InputGroup ---------- */
export interface AutocompleteInputGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.InputGroup>, 'style'>,
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

function InputGroup({ style, ref, ...props }: AutocompleteInputGroupProps) {
  return (
    <BaseAutocomplete.InputGroup
      ref={ref}
      {...stylex.props(inputGroupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Icon ---------- */
function Icon(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Icon>) {
  return <BaseAutocomplete.Icon {...props} />;
}

/* ---------- Clear ---------- */
function Clear({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseAutocomplete.Clear> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseAutocomplete.Clear ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Positioner>) {
  return <BaseAutocomplete.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface AutocompletePopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.Popup>, 'style'>,
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

function Popup({ style, ref, ...props }: AutocompletePopupProps) {
  return (
    <BaseAutocomplete.Popup
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
function List(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.List>) {
  return <BaseAutocomplete.List {...props} />;
}

/* ---------- Item ---------- */
export interface AutocompleteItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>, 'style'>,
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

function Item({ style, ref, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Group ---------- */
function Group(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>) {
  return <BaseAutocomplete.Group {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface AutocompleteGroupLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: AutocompleteGroupLabelProps) {
  return (
    <BaseAutocomplete.GroupLabel
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Empty ---------- */
export interface AutocompleteEmptyProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>, 'style'>,
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

function Empty({ style, ref, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty
      ref={ref}
      {...stylex.props(emptyStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface AutocompleteArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAutocomplete.Arrow>, 'style'>,
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

function Arrow({ style, ref, ...props }: AutocompleteArrowProps) {
  return (
    <BaseAutocomplete.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Status ---------- */
function Status(props: ComponentPropsWithoutRef<typeof BaseAutocomplete.Status>) {
  return <BaseAutocomplete.Status {...props} />;
}

/* ---------- Export ---------- */
export const Autocomplete = {
  Root,
  Value,
  Trigger,
  Input,
  InputGroup,
  Icon,
  Clear,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  Group,
  GroupLabel,
  Empty,
  Arrow,
  Status,
  useFilter: BaseAutocomplete.useFilter,
  useFilteredItems: BaseAutocomplete.useFilteredItems,
};
