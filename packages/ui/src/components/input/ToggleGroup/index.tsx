import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { INPUT_SCALE_DOWN } from '../../../constants/motion';
import { elementSize } from '../../../tokens/elementSize.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type ToggleGroupSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
export interface ToggleGroupRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToggleGroup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
  size?: ToggleGroupSize;
}

const rootStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size.s1,
    borderRadius: radii.r10,
    backgroundColor: colors.border,
    padding: size.s1,
  },
});

function Root({ size = 'md', style, ref, ...props }: ToggleGroupRootProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
export interface ToggleGroupItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToggle>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
  size?: ToggleGroupSize;
}

const itemStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s4,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    borderWidth: 0,
    backgroundColor: colors.background,
    color: colors.foregroundSecondary,
    transition: 'background-color 0.15s, color 0.15s',
    userSelect: 'none',
    ':hover': {
      backgroundColor: colors.lighten4,
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
  sm: {
    height: elementSize.sm,
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
    borderRadius: radii.r8,
  },
  md: {
    height: elementSize.md,
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
    borderRadius: radii.r8,
  },
  lg: {
    height: elementSize.lg,
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
    borderRadius: radii.r10,
  },
});

const MotionToggle = motion.create(BaseToggle as React.ComponentType<Record<string, unknown>>);

function Item({ size = 'md', style, ref, ...props }: ToggleGroupItemProps) {
  return (
    <MotionToggle
      ref={ref}
      whileTap={props.disabled ? undefined : { scale: INPUT_SCALE_DOWN }}
      {...stylex.props(
        itemStyles.base,
        itemStyles[size],
        props.pressed && itemStyles.pressed,
        ...styleArray(style),
      )}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const ToggleGroup = {
  Root,
  Item,
};
