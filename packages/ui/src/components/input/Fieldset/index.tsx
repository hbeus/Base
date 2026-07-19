import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface FieldsetRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseFieldset.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLFieldSetElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});

function Root({ style, ref, ...props }: FieldsetRootProps) {
  return (
    <BaseFieldset.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Legend ---------- */
export interface FieldsetLegendProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseFieldset.Legend>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLLegendElement>;
}

const legendStyles = stylex.create({
  base: {
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    padding: 0,
  },
});

function Legend({ style, ref, ...props }: FieldsetLegendProps) {
  return (
    <BaseFieldset.Legend
      ref={ref}
      {...stylex.props(legendStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Fieldset = {
  Root,
  Legend,
};
