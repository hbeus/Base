import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface ToggleProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToggle>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s4,
    borderRadius: radii.r8,
    color: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.1s, color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
      color: colors.foregroundPrimary,
    },
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  pressed: {
    backgroundColor: colors.lighten8,
    color: colors.foregroundPrimary,
  },
});

export function Toggle({ style, ref, ...props }: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      {...stylex.props(styles.base, props.pressed && styles.pressed, ...styleArray(style))}
      {...props}
    />
  );
}
