import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { radii } from '../../tokens/radii.stylex';

type CardVariant = 'filled' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type CardProps<T extends ElementType = 'div'> = {
  as?: T;
  variant?: CardVariant;
  padding?: CardPadding;
  style?: StyleXStyles | StyleXStyles[];
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'style'>;

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: radii.r24,
  },
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
  ({ as: Component = 'div', variant = 'filled', padding = 'md', style, ...props }, ref) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <Component
        ref={ref}
        {...stylex.props(styles.base, variants[variant], paddings[padding], ...styleArr)}
        {...props}
      />
    );
  },
) as <T extends ElementType = 'div'>(props: CardProps<T> & { ref?: React.Ref<Element> }) => React.JSX.Element;
