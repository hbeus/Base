import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
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

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseDrawer.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseDrawer.Trigger ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseDrawer.Close> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseDrawer.Close ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal keepMounted {...props} />;
}

/* ---------- Backdrop ---------- */
export interface DrawerBackdropProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>, 'style'>,
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

function Backdrop({ style, ref, ...props }: DrawerBackdropProps) {
  return (
    <BaseDrawer.Backdrop
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

/* ---------- Popup ---------- */
export interface DrawerPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    position: 'fixed',
    zIndex: 51,
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    outline: 'none',
    overflowY: 'auto',
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: '24rem',
    maxWidth: '90vw',
    borderTopLeftRadius: radii.r12,
    borderBottomLeftRadius: radii.r12,
  },
});

function Popup({ style, ref, ...props }: DrawerPopupProps) {
  return (
    <BaseDrawer.Popup
      ref={ref}
      {...stylex.props(popupStyles.base, popupStyles.right, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface DrawerContentProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Content>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const contentStyles = stylex.create({
  base: {
    padding: spacing.s24,
  },
});

function Content({ style, ref, ...props }: DrawerContentProps) {
  return (
    <BaseDrawer.Content
      ref={ref}
      {...stylex.props(contentStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface DrawerTitleProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Title>, 'style'>,
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

function Title({ style, ref, ...props }: DrawerTitleProps) {
  return (
    <BaseDrawer.Title
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface DrawerDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Description>, 'style'>,
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

function Description({ style, ref, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Drawer = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Content,
  Close,
  Title,
  Description,
};
