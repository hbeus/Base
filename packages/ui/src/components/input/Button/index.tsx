import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentPropsWithoutRef, Ref } from 'react';

import { colors } from '../../../tokens/colors.stylex';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseButton>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s8,
    borderRadius: radii.r8,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  primary: {
    backgroundColor: colors.foregroundPrimary,
    color: colors.background,
    ':hover': {
      backgroundColor: colors.lighten50,
    },
  },
  secondary: {
    backgroundColor: colors.lighten8,
    color: colors.foregroundPrimary,
    ':hover': {
      backgroundColor: colors.lighten12,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.foregroundSecondary,
    ':hover': {
      backgroundColor: colors.lighten4,
      color: colors.foregroundPrimary,
    },
  },
  destructive: {
    backgroundColor: colors.negative,
    color: colors.foregroundPrimary,
    ':hover': {
      opacity: 0.9,
    },
  },
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
  },
});

const MotionBaseButton = motion.create(BaseButton as React.ComponentType<Record<string, unknown>>);

export function Button({ variant = 'primary', size = 'md', style, ref, ...props }: ButtonProps) {
  return (
    <MotionBaseButton
      ref={ref}
      whileTap={{ scale: 0.98 }}
      {...stylex.props(styles.base, styles[variant], styles[size], ...styleArray(style))}
      {...props}
    />
  );
}
