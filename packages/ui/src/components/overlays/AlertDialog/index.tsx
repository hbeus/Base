import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type AlertDialogSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseAlertDialog.Root>) {
  return <BaseAlertDialog.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseAlertDialog.Trigger ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseAlertDialog.Close> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseAlertDialog.Close ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseAlertDialog.Portal>) {
  return <BaseAlertDialog.Portal keepMounted {...props} />;
}

/* ---------- Backdrop ---------- */
export interface AlertDialogBackdropProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const backdropStyles = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.darken50,
    zIndex: 50,
  },
});

function Backdrop({ style, ref, ...props }: AlertDialogBackdropProps) {
  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      }
      {...stylex.props(backdropStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface AlertDialogContentProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
  size?: AlertDialogSize;
}

const contentStyles = stylex.create({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 51,
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s24,
    outline: 'none',
  },
  sm: {
    width: '24rem',
    maxWidth: '90vw',
  },
  md: {
    width: '32rem',
    maxWidth: '90vw',
  },
  lg: {
    width: '48rem',
    maxWidth: '90vw',
  },
});

function Content({ size = 'md', style, ref, ...props }: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Popup
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.2 }}
        />
      }
      {...stylex.props(contentStyles.base, contentStyles[size], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface AlertDialogTitleProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

const titleStyles = stylex.create({
  base: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s8,
  },
});

function Title({ style, ref, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface AlertDialogDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Description({ style, ref, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Content,
  Close,
  Title,
  Description,
};
