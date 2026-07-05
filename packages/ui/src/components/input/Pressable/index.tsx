import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';

import { colors } from '../../../tokens/colors.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';

type PressableVariant = 'filled' | 'outline' | 'ghost' | 'transparent';
type PressableInset = 's2' | 's4' | 's8' | 's12' | 's16';

interface PressableOwnProps {
  variant?: PressableVariant;
  inset?: PressableInset;
}

export type PressableProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = PolymorphicProps<
  T,
  PressableOwnProps
>;

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
      inset: `0 -${spacing.s2}`,
    },
  },
  s4: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${spacing.s4}`,
    },
  },
  s8: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${spacing.s8}`,
    },
  },
  s12: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${spacing.s12}`,
    },
  },
  s16: {
    '::before': {
      content: '""',
      position: 'absolute' as const,
      inset: `0 -${spacing.s16}`,
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
  const MotionElement = motion[as as keyof typeof motion] as React.ElementType;
  return (
    <MotionElement
      ref={ref}
      whileTap={{ scale: 0.98 }}
      {...stylex.props(styles.base, styles[variant], inset && insets[inset], ...styleArray(style))}
      {...props}
    />
  );
} as PolymorphicComponent<'div', PressableOwnProps>;
