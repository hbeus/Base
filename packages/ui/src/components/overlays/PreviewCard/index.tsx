import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BasePreviewCard.Root>) {
  return <BasePreviewCard.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger> & { ref?: Ref<HTMLAnchorElement> }) {
  return <BasePreviewCard.Trigger ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BasePreviewCard.Portal>) {
  return <BasePreviewCard.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>) {
  return <BasePreviewCard.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface PreviewCardPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePreviewCard.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surface300,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s16,
    boxShadow: colors.shadowElevated,
    outline: 'none',
    maxWidth: '20rem',
  },
});

function Popup({ style, ref, ...props }: PreviewCardPopupProps) {
  return (
    <BasePreviewCard.Popup
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface PreviewCardArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surface300,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: PreviewCardArrowProps) {
  return (
    <BasePreviewCard.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Backdrop ---------- */
function Backdrop(props: ComponentPropsWithoutRef<typeof BasePreviewCard.Backdrop>) {
  return <BasePreviewCard.Backdrop {...props} />;
}

/* ---------- Export ---------- */
export const PreviewCard = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Backdrop,
};
