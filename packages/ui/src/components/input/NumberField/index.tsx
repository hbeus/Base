import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type NumberFieldSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseNumberField.Root>) {
  return <BaseNumberField.Root {...props} />;
}

/* ---------- Group ---------- */
export interface NumberFieldGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNumberField.Group>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const groupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
});

function Group({ style, ref, ...props }: NumberFieldGroupProps) {
  return (
    <BaseNumberField.Group
      ref={ref}
      {...stylex.props(groupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
export interface NumberFieldInputProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNumberField.Input>, 'size' | 'style'>,
    BaseProps {
  ref?: Ref<HTMLInputElement>;
  size?: NumberFieldSize;
}

const inputStyles = stylex.create({
  base: {
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.foregroundPrimary,
    outline: 'none',
    transition: 'border-color 0.15s',
    textAlign: 'left',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
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
    paddingInline: spacing.s8,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s12,
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

function Input({ size = 'md', style, ref, ...props }: NumberFieldInputProps) {
  return (
    <BaseNumberField.Input
      ref={ref}
      {...stylex.props(inputStyles.base, inputStyles[size], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Increment ---------- */
export interface NumberFieldIncrementProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNumberField.Increment>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.s32,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  increment: {
    borderTopRightRadius: radii.r8,
    borderBottomRightRadius: radii.r8,
    borderLeftWidth: 0,
  },
  decrement: {
    borderTopLeftRadius: radii.r8,
    borderBottomLeftRadius: radii.r8,
    borderRightWidth: 0,
  },
});

function Increment({ style, ref, ...props }: NumberFieldIncrementProps) {
  return (
    <BaseNumberField.Increment
      ref={ref}
      {...stylex.props(buttonStyles.base, buttonStyles.increment, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Decrement ---------- */
export interface NumberFieldDecrementProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

function Decrement({ style, ref, ...props }: NumberFieldDecrementProps) {
  return (
    <BaseNumberField.Decrement
      ref={ref}
      {...stylex.props(buttonStyles.base, buttonStyles.decrement, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- ScrubArea ---------- */
function ScrubArea(props: ComponentPropsWithoutRef<typeof BaseNumberField.ScrubArea>) {
  return <BaseNumberField.ScrubArea {...props} />;
}

/* ---------- ScrubAreaCursor ---------- */
function ScrubAreaCursor(props: ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>) {
  return <BaseNumberField.ScrubAreaCursor {...props} />;
}

/* ---------- Export ---------- */
export const NumberField = {
  Root,
  Group,
  Input,
  Increment,
  Decrement,
  ScrubArea,
  ScrubAreaCursor,
};
