import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import * as stylex from '@stylexjs/stylex';
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
export interface OtpFieldRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
});

function Root({ style, ref, ...props }: OtpFieldRootProps) {
  return (
    <BaseOTPField.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
export interface OtpFieldInputProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseOTPField.Input>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLInputElement>;
}

const inputStyles = stylex.create({
  base: {
    width: elementSize.md,
    height: elementSize.md,
    textAlign: 'center',
    fontSize: typography.bodySize,
    fontWeight: 500,
    color: colors.foregroundPrimary,
    backgroundColor: 'transparent',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
    outline: 'none',
    transition: 'border-color 0.15s',
    ':focus': {
      borderColor: colors.highlight,
    },
  },
});

function Input({ style, ref, ...props }: OtpFieldInputProps) {
  return (
    <BaseOTPField.Input
      ref={ref}
      {...stylex.props(inputStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface OtpFieldSeparatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseSeparator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const separatorStyles = stylex.create({
  base: {
    width: spacing.s8,
    height: borders.default,
    backgroundColor: colors.border,
  },
});

function OtpSeparator({ style, ref, ...props }: OtpFieldSeparatorProps) {
  return (
    <BaseSeparator
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const OtpField = {
  Root,
  Input,
  Separator: OtpSeparator,
};
