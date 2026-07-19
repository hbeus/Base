import { Form as BaseForm } from '@base-ui/react/form';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface FormProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseForm>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLFormElement>;
}

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s16,
  },
});

export function Form({ style, ref, ...props }: FormProps) {
  return <BaseForm ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />;
}
