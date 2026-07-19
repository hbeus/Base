import { Select as BaseSelect } from '@base-ui/react/select';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type SelectSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

/* ---------- Trigger ---------- */
export interface SelectTriggerProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Trigger>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
  size?: SelectSize;
}

const triggerStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.s8,
    width: '100%',
    borderWidth: size.s1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.15s',
    ':focus': {
      borderColor: colors.lighten16,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
    borderRadius: radii.r10,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s16,
    fontSize: typography.bodySize,
    borderRadius: radii.r12,
  },
});

function Trigger({ size = 'md', style, ref, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      ref={ref}
      {...stylex.props(triggerStyles.base, triggerStyles[size], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
function Value(props: ComponentPropsWithoutRef<typeof BaseSelect.Value>) {
  return <BaseSelect.Value {...props} />;
}

/* ---------- Icon ---------- */
export interface SelectIconProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Icon>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLSpanElement>;
}

const iconStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: colors.foregroundSecondary,
  },
});

function Icon({ style, ref, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      ref={ref}
      {...stylex.props(iconStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseSelect.Portal>) {
  return <BaseSelect.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseSelect.Positioner>) {
  return <BaseSelect.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface SelectPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: size.s1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s4,
    outline: 'none',
    boxShadow: colors.shadowElevated,
    overflow: 'auto',
    maxHeight: 'var(--available-height)',
  },
});

function Popup({ style, ref, ...props }: SelectPopupProps) {
  return (
    <BaseSelect.Popup
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

/* ---------- Item ---------- */
export interface SelectItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Item>, 'style'>,
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

function Item({ style, ref, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemIndicator ---------- */
export interface SelectItemIndicatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.ItemIndicator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLSpanElement>;
}

const itemIndicatorStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

function ItemIndicator({ style, ref, ...props }: SelectItemIndicatorProps) {
  return (
    <BaseSelect.ItemIndicator
      ref={ref}
      {...stylex.props(itemIndicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ItemText ---------- */
function ItemText(props: ComponentPropsWithoutRef<typeof BaseSelect.ItemText>) {
  return <BaseSelect.ItemText {...props} />;
}

/* ---------- Group ---------- */
function SelectGroup(props: ComponentPropsWithoutRef<typeof BaseSelect.Group>) {
  return <BaseSelect.Group {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface SelectGroupLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface SelectArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Arrow>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surfaceRaised,
    stroke: colors.border,
    strokeWidth: size.s1,
  },
});

function Arrow({ style, ref, ...props }: SelectArrowProps) {
  return (
    <BaseSelect.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface SelectSeparatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSelect.Separator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const separatorStyles = stylex.create({
  base: {
    height: size.s1,
    backgroundColor: colors.border,
    marginBlock: spacing.s4,
  },
});

function Separator({ style, ref, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ScrollUpArrow ---------- */
function ScrollUpArrow(props: ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>) {
  return <BaseSelect.ScrollUpArrow {...props} />;
}

/* ---------- ScrollDownArrow ---------- */
function ScrollDownArrow(props: ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>) {
  return <BaseSelect.ScrollDownArrow {...props} />;
}

/* ---------- Export ---------- */
export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  Item,
  ItemIndicator,
  ItemText,
  Group: SelectGroup,
  GroupLabel,
  Arrow,
  Separator,
  ScrollUpArrow,
  ScrollDownArrow,
};
