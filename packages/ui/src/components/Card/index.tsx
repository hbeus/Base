import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { radii } from '../../tokens/radii.stylex';

type CardVariant = 'filled' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardDirection = 'row' | 'column';
type SpacingToken = keyof (typeof spacing)['__tokens'];
type CardGap = 'none' | SpacingToken;

type CardProps<T extends ElementType = 'div'> = {
  as?: T;
  variant?: CardVariant;
  padding?: CardPadding;
  direction?: CardDirection;
  gap?: CardGap;
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
  s1: { gap: spacing.s1 },
  s2: { gap: spacing.s2 },
  s4: { gap: spacing.s4 },
  s6: { gap: spacing.s6 },
  s8: { gap: spacing.s8 },
  s10: { gap: spacing.s10 },
  s12: { gap: spacing.s12 },
  s14: { gap: spacing.s14 },
  s16: { gap: spacing.s16 },
  s18: { gap: spacing.s18 },
  s20: { gap: spacing.s20 },
  s24: { gap: spacing.s24 },
  s28: { gap: spacing.s28 },
  s32: { gap: spacing.s32 },
  s40: { gap: spacing.s40 },
  s48: { gap: spacing.s48 },
  s56: { gap: spacing.s56 },
  s64: { gap: spacing.s64 },
  s72: { gap: spacing.s72 },
  s80: { gap: spacing.s80 },
  s96: { gap: spacing.s96 },
  s112: { gap: spacing.s112 },
  s128: { gap: spacing.s128 },
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
    { as: Component = 'div', variant = 'filled', padding = 'md', direction = 'column', gap = 's16', style, ...props },
    ref,
  ) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <Component
        ref={ref}
        {...stylex.props(styles.base, directions[direction], gaps[gap], variants[variant], paddings[padding], ...styleArr)}
        {...props}
      />
    );
  },
) as <T extends ElementType = 'div'>(props: CardProps<T> & { ref?: React.Ref<Element> }) => React.JSX.Element;
