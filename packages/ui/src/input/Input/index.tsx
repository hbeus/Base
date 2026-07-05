import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { useComponentConfig } from '../../providers/ComponentConfigProvider';
import { colors } from '../../tokens/colors.stylex';
import { elementSize } from '../../tokens/elementSize.stylex';
import { radii } from '../../tokens/radii.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { typography } from '../../tokens/typography.stylex';
import type { BaseProps } from '../../types/BaseProps';
import { styleArray } from '../../utils/styleArray';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseInput>, 'size' | 'style'>,
    BaseProps {
  ref?: Ref<HTMLInputElement>;
  size?: InputSize;
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
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s16,
    fontSize: typography.bodySize,
  },
});

export function Input(rawProps: InputProps) {
  const { size = 'md', style, ref, ...props } = useComponentConfig('Input', rawProps);
  return (
    <BaseInput
      ref={ref}
      {...stylex.props(styles.base, styles[size], ...styleArray(style))}
      {...props}
    />
  );
}
