import { Dialog as BaseDialog } from '@base-ui/react/dialog';
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

type DialogSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseDialog.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseDialog.Trigger ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseDialog.Close> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseDialog.Close ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal keepMounted {...props} />;
}

/* ---------- Backdrop ---------- */
const backdropStyles = stylex.create({
  base: {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.darken50,
    zIndex: 50,
  },
});

export interface DialogBackdropProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function Backdrop({ style, ref, ...props }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
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
const contentStyles = stylex.create({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 51,
    backgroundColor: colors.surfaceRaised,
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

export interface DialogContentProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
  size?: DialogSize;
}

function Content({ size = 'md', style, ref, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Popup
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
const titleStyles = stylex.create({
  base: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s8,
  },
});

export interface DialogTitleProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

function Title({ style, ref, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
});

export interface DialogDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

function Description({ style, ref, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Footer ---------- */
const footerStyles = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing.s8,
    marginTop: spacing.s16,
  },
});

export interface DialogFooterProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function Footer({ style, ref, ...props }: DialogFooterProps) {
  return <div ref={ref} {...stylex.props(footerStyles.base, ...styleArray(style))} {...props} />;
}

/* ---------- Export ---------- */
export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Content,
  Close,
  Title,
  Description,
  Footer,
};
