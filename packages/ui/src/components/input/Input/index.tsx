import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { useSurface } from '../../../hooks/useSurface';
import { borders } from '../../../tokens/borders.stylex';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { SurfaceLevel } from '../../providers/SurfaceLevel';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<ComponentProps<typeof BaseInput>, 'size' | 'style'>,
    BaseProps {
  size?: InputSize;
}

const styles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radii.r8,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
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

export function Input(props: InputProps) {
  return (
    <SurfaceLevel>
      <InputSurface {...props} />
    </SurfaceLevel>
  );
}

function InputSurface({ size = 'md', style, ref, ...props }: InputProps) {
  const surface = useSurface();

  return (
    <BaseInput
      data-slot='input'
      data-size={size}
      ref={ref}
      {...stylex.props(styles.base, styles[size], surface, ...styleArray(style))}
      {...props}
    />
  );
}
