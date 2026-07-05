import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { forwardRef } from 'react';

import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';

import { colors } from '../../tokens/colors.stylex';
import { typography } from '../../tokens/typography.stylex';

type TextSize = 'hero' | 'display' | 'headline' | 'title' | 'body' | 'bodySm' | 'label' | 'caption';

type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary';

type TextProps<T extends ElementType = 'span'> = {
  as?: T;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  tight?: boolean;
  style?: StyleXStyles | StyleXStyles[];
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'size' | 'weight' | 'color' | 'style'>;

const sizes = stylex.create({
  hero: {
    fontSize: typography.heroSize,
    lineHeight: typography.heroLineHeight,
    letterSpacing: typography.heroLetterSpacing,
    textWrap: 'balance',
  },
  display: {
    fontSize: typography.displaySize,
    lineHeight: typography.displayLineHeight,
    letterSpacing: typography.displayLetterSpacing,
    textWrap: 'balance',
  },
  headline: {
    fontSize: typography.headlineSize,
    lineHeight: typography.headlineLineHeight,
    letterSpacing: typography.headlineLetterSpacing,
    textWrap: 'balance',
  },
  title: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    letterSpacing: typography.titleLetterSpacing,
    textWrap: 'balance',
  },
  body: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight,
    letterSpacing: typography.bodyLetterSpacing,
    textWrap: 'pretty',
  },
  bodySm: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    letterSpacing: typography.bodySmLetterSpacing,
    textWrap: 'pretty',
  },
  label: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    letterSpacing: typography.labelLetterSpacing,
  },
  caption: {
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    letterSpacing: typography.captionLetterSpacing,
  },
});

const weights = stylex.create({
  regular: { fontWeight: 400 },
  medium: { fontWeight: 500 },
  semibold: { fontWeight: 600 },
  bold: { fontWeight: 700 },
});

const tightStyle = stylex.create({
  tight: { lineHeight: 1 },
});

const textColors = stylex.create({
  primary: { color: colors.foregroundPrimary },
  secondary: { color: colors.foregroundSecondary },
});

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'span',
      size = 'body',
      weight = 'medium',
      color = 'primary',
      tight,
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
          sizes[size],
          weights[weight],
          textColors[color],
          tight && tightStyle.tight,
          ...styleArr,
        )}
        {...props}
      />
    );
  },
) as <T extends ElementType = 'span'>(
  props: TextProps<T> & { ref?: React.Ref<HTMLElement> },
) => React.JSX.Element;
