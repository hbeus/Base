import { Field as BaseField } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface FieldRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseField.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
  },
});

function Root({ style, ref, ...props }: FieldRootProps) {
  return (
    <BaseField.Root ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Label ---------- */
export interface FieldLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseField.Label>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLLabelElement>;
}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
  },
});

function Label({ style, ref, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface FieldDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseField.Description>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Description({ style, ref, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Error ---------- */
export interface FieldErrorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseField.Error>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

const errorStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.stateNegative,
  },
});

function FieldError({ style, ref, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      ref={ref}
      {...stylex.props(errorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Control ---------- */
function Control(props: ComponentPropsWithoutRef<typeof BaseField.Control>) {
  return <BaseField.Control {...props} />;
}

/* ---------- Validity ---------- */
function Validity(props: ComponentPropsWithoutRef<typeof BaseField.Validity>) {
  return <BaseField.Validity {...props} />;
}

/* ---------- Export ---------- */
export const Field = {
  Root,
  Label,
  Description,
  Error: FieldError,
  Control,
  Validity,
};
