import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCheckboxGroup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
  },
});

export function CheckboxGroup({ style, ref, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />
  );
}
