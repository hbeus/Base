import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { Input as BaseInput } from '@base-ui/react/input';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';

import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import { size } from '../../tokens/size.stylex';
import { typography } from '../../tokens/typography.stylex';

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<ComponentPropsWithoutRef<typeof BaseInput>, 'style'> {
  inputSize?: InputSize;
  style?: StyleXStyles | StyleXStyles[];
}

const styles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radii.r8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.foregroundPrimary,
    outline: 'none',
    transition: 'border-color 0.15s',
    '::placeholder': {
      color: colors.foregroundSecondary,
    },
    ':focus': {
      borderColor: colors.lighten16,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  sm: {
    height: size.s32,
    paddingInline: size.s12,
    fontSize: typography.labelSize,
  },
  md: {
    height: size.s40,
    paddingInline: size.s16,
    fontSize: typography.bodySmSize,
  },
  lg: {
    height: size.s48,
    paddingInline: size.s16,
    fontSize: typography.bodySize,
  },
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = 'md', style, ...props }, ref) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <BaseInput
        ref={ref}
        {...stylex.props(styles.base, styles[inputSize], ...styleArr)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
