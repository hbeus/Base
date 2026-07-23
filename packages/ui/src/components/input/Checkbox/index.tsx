import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type CheckboxSize = 'sm' | 'md';

/* ---------- Root ---------- */
export interface CheckboxRootProps
  extends Omit<ComponentProps<typeof BaseCheckbox.Root>, 'style'>,
    BaseProps {
  size?: CheckboxSize;
}

const rootStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: size.s2,
    borderStyle: 'solid',
    borderColor: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.15s, border-color 0.15s',
    flexShrink: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  checked: {
    backgroundColor: colors.foregroundPrimary,
    borderColor: colors.foregroundPrimary,
  },
  sm: {
    width: spacing.s16,
    height: spacing.s16,
    borderRadius: radii.r4,
  },
  md: {
    width: spacing.s20,
    height: spacing.s20,
    borderRadius: radii.r4,
  },
});

function Root({
  size = 'md',
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  style,
  ref,
  ...props
}: CheckboxRootProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = checkedProp ?? internalChecked;

  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      data-size={size}
      ref={ref}
      checked={checked}
      onCheckedChange={(value, event) => {
        setInternalChecked(value);
        onCheckedChange?.(value, event);
      }}
      {...stylex.props(
        rootStyles.base,
        rootStyles[size],
        checked && rootStyles.checked,
        ...styleArray(style),
      )}
      {...props}
    />
  );
}

/* ---------- Indicator ---------- */
export interface CheckboxIndicatorProps
  extends Omit<ComponentProps<typeof BaseCheckbox.Indicator>, 'style'>,
    BaseProps {
  children?: ReactNode;
}

const indicatorStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.foregroundPrimaryInverse,
  },
});

function Indicator({ children, style, ref, ...props }: CheckboxIndicatorProps) {
  return (
    <BaseCheckbox.Indicator
      data-slot="checkbox-indicator"
      ref={ref}
      render={
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      }
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </BaseCheckbox.Indicator>
  );
}

function CheckIcon() {
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
      <path
        d='M2.5 6L5 8.5L9.5 4'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

/* ---------- Export ---------- */
export const Checkbox = {
  Root,
  Indicator,
};
