import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import { size } from '../../tokens/size.stylex';

type CardVariant = 'filled' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardDirection = 'row' | 'column';

type CardProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = {
  as?: T;
  ref?: Ref<ComponentRef<T>>;
  variant?: CardVariant;
  padding?: CardPadding;
  direction?: CardDirection;
  gap?: keyof typeof gaps;
  style?: StyleXStyles | StyleXStyles[];
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'style'>;

const styles = stylex.create({
  base: {
    display: 'flex',
    borderRadius: radii.r24,
  },
});

const directions = stylex.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
});

const gaps = stylex.create({
  none: { gap: 0 },
  s2: { gap: size.s2 },
  s4: { gap: size.s4 },
  s8: { gap: size.s8 },
  s16: { gap: size.s16 },
  s24: { gap: size.s24 },
  s32: { gap: size.s32 },
  s40: { gap: size.s40 },
});

const variants = stylex.create({
  filled: {
    backgroundColor: colors.lighten4,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
  },
});

const paddings = stylex.create({
  none: { padding: 0 },
  sm: { padding: size.s12 },
  md: { padding: size.s20 },
  lg: { padding: size.s32 },
});

export const Card = function Card({
  as: Component = 'div',
  variant = 'filled',
  padding = 'md',
  direction = 'column',
  gap = 's16',
  style,
  ref,
  ...props
}: CardProps) {
  const styleArr = Array.isArray(style) ? style : style ? [style] : [];
  return (
    <Component
      ref={ref}
      {...stylex.props(
        styles.base,
        directions[direction],
        gaps[gap],
        variants[variant],
        paddings[padding],
        ...styleArr,
      )}
      {...props}
    />
  );
} as <T extends keyof React.JSX.IntrinsicElements = 'div'>(
  props: CardProps<T>,
) => React.JSX.Element;
