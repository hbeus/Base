import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';
import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import { spacing } from '../../tokens/spacing.stylex';

type CardVariant = 'filled' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardDirection = 'row' | 'column';

type CardProps<T extends ElementType = 'div'> = {
  as?: T;
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
  s2: { gap: spacing.s2 },
  s4: { gap: spacing.s4 },
  s8: { gap: spacing.s8 },
  s16: { gap: spacing.s16 },
  s24: { gap: spacing.s24 },
  s32: { gap: spacing.s32 },
  s40: { gap: spacing.s40 },
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
  sm: { padding: spacing.s12 },
  md: { padding: spacing.s20 },
  lg: { padding: spacing.s32 },
});

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      as: Component = 'div',
      variant = 'filled',
      padding = 'md',
      direction = 'column',
      gap = 's16',
      style,
      ...props
    },
    ref,
  ) => {
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
  },
) as <T extends ElementType = 'div'>(
  props: CardProps<T> & { ref?: React.Ref<Element> },
) => React.JSX.Element;
