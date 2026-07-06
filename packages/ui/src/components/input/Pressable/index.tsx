import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { colors } from '../../../tokens/colors.stylex';
import { radii } from '../../../tokens/radii.stylex';
import type { PolymorphicComponent, PolymorphicProps } from '../../../types/polymorphic';
import { styleArray } from '../../../utils/styleArray';

type PressableVariant = 'filled' | 'outline' | 'ghost' | 'transparent';
type PressableInset = 's2' | 's4' | 's8' | 's12' | 's16';
type PressableRadius = 'r2' | 'r4' | 'r6' | 'r8' | 'r12' | 'r16' | 'r20' | 'r24' | 'r32' | 'full';

interface PressableOwnProps {
  variant?: PressableVariant;
  inset?: PressableInset;
  radius?: PressableRadius;
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

const insetStyles = stylex.create({
  s2: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -2',
      backgroundColor: colors.lighten4,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
  },
  s4: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -4',
      backgroundColor: colors.lighten4,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
  },
  s8: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -8',
      backgroundColor: colors.lighten4,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
  },
  s12: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -12',
      backgroundColor: colors.lighten4,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
  },
  s16: {
    '::before': {
      content: '',
      position: 'absolute',
      inset: '0 -16',
      backgroundColor: colors.lighten4,
      opacity: 0,
      transition: 'opacity 0.1s',
    },
    ':hover::before': { opacity: 1 },
  },
});

const radiusStyles = stylex.create({
  r2: { '::before': { borderRadius: radii.r2 } },
  r4: { '::before': { borderRadius: radii.r4 } },
  r6: { '::before': { borderRadius: radii.r6 } },
  r8: { '::before': { borderRadius: radii.r8 } },
  r12: { '::before': { borderRadius: radii.r12 } },
  r16: { '::before': { borderRadius: radii.r16 } },
  r20: { '::before': { borderRadius: radii.r20 } },
  r24: { '::before': { borderRadius: radii.r24 } },
  r32: { '::before': { borderRadius: radii.r32 } },
  full: { '::before': { borderRadius: radii.full } },
});

export const Pressable = function Pressable({
  as = 'div',
  ref,
  variant = 'ghost',
  inset = 's16',
  radius = 'r20',
  style,
  ...props
}: PressableProps) {
  const MotionElement = motion[as as keyof typeof motion] as React.ElementType;
  return (
    <MotionElement
      ref={ref}
      whileTap={{ scale: INPUT_SCALE_DOWN }}
      {...stylex.props(
        styles.base,
        inset ? insetStyles[inset] : styles[variant],
        inset && radiusStyles[radius],
        ...styleArray(style),
      )}
      {...props}
    />
  );
} as PolymorphicComponent<'div', PressableOwnProps>;
