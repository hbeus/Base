import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import { colors } from '../../tokens/colors.stylex';
import { size } from '../../tokens/size.stylex';

type PressableVariant = 'filled' | 'outline' | 'ghost' | 'transparent';

type PressableProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = {
  as?: T;
  ref?: Ref<ComponentRef<T>>;
  variant?: PressableVariant;
  inset?: keyof typeof insets;
  style?: StyleXStyles | StyleXStyles[];
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'style'>;

const styles = stylex.create({
  base: {
    display: 'block',
    position: 'relative',
  },
  filled: {
    backgroundColor: colors.lighten4,
    ':hover': {
      backgroundColor: colors.lighten8,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

const insets = stylex.create({
  s2: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${size.s2}`,
    },
  },
  s4: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${size.s4}`,
    },
  },
  s8: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${size.s8}`,
    },
  },
  s12: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${size.s12}`,
    },
  },
  s16: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${size.s16}`,
    },
  },
});

export const Pressable = function Pressable({
  as = 'div',
  ref,
  variant = 'ghost',
  inset,
  style,
  ...props
}: PressableProps) {
  const MotionComponent: React.FC<Record<string, unknown>> = motion[as];
  const styleArr = Array.isArray(style) ? style : style ? [style] : [];
  return (
    <MotionComponent
      ref={ref}
      whileTap={{ scale: 0.98 }}
      {...stylex.props(styles.base, styles[variant], inset && insets[inset], ...styleArr)}
      {...props}
    />
  );
} as <T extends keyof React.JSX.IntrinsicElements = 'div'>(
  props: PressableProps<T>,
) => React.JSX.Element;
