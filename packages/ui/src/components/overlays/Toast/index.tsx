import { Toast as BaseToast } from '@base-ui/react/toast';
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

/* ---------- Provider ---------- */
function Provider(props: ComponentPropsWithoutRef<typeof BaseToast.Provider>) {
  return <BaseToast.Provider {...props} />;
}

/* ---------- Viewport ---------- */
export interface ToastViewportProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToast.Viewport>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const viewportStyles = stylex.create({
  base: {
    position: 'fixed',
    bottom: spacing.s24,
    right: spacing.s24,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    maxWidth: '24rem',
    outline: 'none',
  },
});

function Viewport({ style, ref, ...props }: ToastViewportProps) {
  return (
    <BaseToast.Viewport
      ref={ref}
      {...stylex.props(viewportStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Root ---------- */
export interface ToastRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToast.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s16,
    boxShadow: colors.shadowElevated,
    outline: 'none',
  },
});

function Root({ style, ref, ...props }: ToastRootProps) {
  return (
    <BaseToast.Root
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        />
      }
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface ToastTitleProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToast.Title>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

const titleStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
  },
});

function Title({ style, ref, ...props }: ToastTitleProps) {
  return (
    <BaseToast.Title
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface ToastDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToast.Description>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
    marginTop: spacing.s4,
  },
});

function Description({ style, ref, ...props }: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToast.Close> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseToast.Close ref={ref} {...props} />;
}

/* ---------- Action ---------- */
function Action({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToast.Action> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseToast.Action ref={ref} {...props} />;
}

/* ---------- Export ---------- */
export const Toast = {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Close,
  Action,
  useManager: BaseToast.useToastManager,
  createManager: BaseToast.createToastManager,
};
