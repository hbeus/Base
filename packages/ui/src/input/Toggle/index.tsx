import { Switch } from '@base-ui/react/switch';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { useState } from 'react';
import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import type { BaseProps } from '../../types/BaseProps';
import { styleArray } from '../../utils/styleArray';

type ToggleSize = 'sm' | 'md';

export interface ToggleProps
  extends Omit<ComponentPropsWithoutRef<typeof Switch.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
  size?: ToggleSize;
}

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: radii.full,
    cursor: 'pointer',
    borderWidth: 0,
    outline: 'none',
    padding: '2px',
    backgroundColor: colors.lighten12,
    transition: 'background-color 0.2s',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  checked: {
    backgroundColor: colors.foregroundPrimary,
  },
  sm: {
    width: '2.25rem',
    height: '1.25rem',
  },
  md: {
    width: '2.75rem',
    height: '1.5rem',
  },
});

const thumbStyles = stylex.create({
  base: {
    display: 'block',
    borderRadius: radii.full,
    backgroundColor: colors.background,
  },
  sm: {
    width: '0.875rem',
    height: '0.875rem',
  },
  md: {
    width: '1.125rem',
    height: '1.125rem',
  },
});

export function Toggle({
  size = 'md',
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  style,
  ref,
  ...props
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = checkedProp ?? internalChecked;

  return (
    <Switch.Root
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
    >
      <Switch.Thumb
        render={
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            {...stylex.props(thumbStyles.base, thumbStyles[size])}
          />
        }
      />
    </Switch.Root>
  );
}
