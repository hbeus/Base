import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { Button as BaseButton } from '@base-ui/react/button';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';

import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { typography } from '../../tokens/typography.stylex';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ComponentPropsWithoutRef<typeof BaseButton>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleXStyles | StyleXStyles[];
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
    height: spacing.s32,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
  },
  md: {
    height: spacing.s40,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
  },
  lg: {
    height: spacing.s48,
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
  },
});

const MotionBaseButton = motion.create(BaseButton as React.ComponentType<Record<string, unknown>>);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', style, ...props }, ref) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <MotionBaseButton
        ref={ref}
        whileTap={{ scale: 0.98 }}
        {...stylex.props(styles.base, styles[variant], styles[size], ...styleArr)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
