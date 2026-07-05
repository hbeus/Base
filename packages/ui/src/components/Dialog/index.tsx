import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { colors } from '../../tokens/colors.stylex';
import { radii } from '../../tokens/radii.stylex';
import { size } from '../../tokens/size.stylex';
import { typography } from '../../tokens/typography.stylex';

type DialogSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props} />;
}

/* ---------- Trigger ---------- */
const Trigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof BaseDialog.Trigger>>(
  (props, ref) => {
    return <BaseDialog.Trigger ref={ref} {...props} />;
  },
);
Trigger.displayName = 'Dialog.Trigger';

/* ---------- Close ---------- */
const Close = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof BaseDialog.Close>>(
  (props, ref) => {
    return <BaseDialog.Close ref={ref} {...props} />;
  },
);
Close.displayName = 'Dialog.Close';

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal {...props} />;
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

const MotionBackdrop = motion.create(
  BaseDialog.Backdrop as React.ComponentType<Record<string, unknown>>,
);

interface BackdropProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'style'> {
  style?: StyleXStyles | StyleXStyles[];
}

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(({ style, ...props }, ref) => {
  const styleArr = Array.isArray(style) ? style : style ? [style] : [];
  return (
    <MotionBackdrop
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...stylex.props(backdropStyles.base, ...styleArr)}
      {...props}
    />
  );
});
Backdrop.displayName = 'Dialog.Backdrop';

/* ---------- Content ---------- */
const contentStyles = stylex.create({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 51,
    backgroundColor: colors.surfaceRaised,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: size.s24,
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

const MotionPopup = motion.create(BaseDialog.Popup as React.ComponentType<Record<string, unknown>>);

interface ContentProps extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'style'> {
  size?: DialogSize;
  style?: StyleXStyles | StyleXStyles[];
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ size = 'md', style, ...props }, ref) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <MotionPopup
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.2 }}
        {...stylex.props(contentStyles.base, contentStyles[size], ...styleArr)}
        {...props}
      />
    );
  },
);
Content.displayName = 'Dialog.Content';

/* ---------- Title ---------- */
const titleStyles = stylex.create({
  base: {
    fontSize: typography.titleSize,
    lineHeight: typography.titleLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: size.s8,
  },
});

interface TitleProps extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'style'> {
  style?: StyleXStyles | StyleXStyles[];
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(({ style, ...props }, ref) => {
  const styleArr = Array.isArray(style) ? style : style ? [style] : [];
  return <BaseDialog.Title ref={ref} {...stylex.props(titleStyles.base, ...styleArr)} {...props} />;
});
Title.displayName = 'Dialog.Title';

/* ---------- Description ---------- */
const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundSecondary,
  },
});

interface DescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'style'> {
  style?: StyleXStyles | StyleXStyles[];
}

const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ style, ...props }, ref) => {
    const styleArr = Array.isArray(style) ? style : style ? [style] : [];
    return (
      <BaseDialog.Description
        ref={ref}
        {...stylex.props(descriptionStyles.base, ...styleArr)}
        {...props}
      />
    );
  },
);
Description.displayName = 'Dialog.Description';

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
};
