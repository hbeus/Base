import { Popover as BasePopover } from '@base-ui/react/popover';
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
function Root(props: ComponentPropsWithoutRef<typeof BasePopover.Root>) {
  return <BasePopover.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BasePopover.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BasePopover.Trigger ref={ref} {...props} />;
}

/* ---------- Close ---------- */
function Close({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BasePopover.Close> & { ref?: Ref<HTMLButtonElement> }) {
  return <BasePopover.Close ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BasePopover.Portal>) {
  return <BasePopover.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BasePopover.Positioner>) {
  return <BasePopover.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface PopoverPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePopover.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s16,
    outline: 'none',
    boxShadow: colors.shadowElevated,
  },
});

function Popup({ style, ref, ...props }: PopoverPopupProps) {
  return (
    <BasePopover.Popup
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
export interface PopoverArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePopover.Arrow>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surfaceRaised,
    stroke: colors.border,
    strokeWidth: borders.default,
  },
});

function Arrow({ style, ref, ...props }: PopoverArrowProps) {
  return (
    <BasePopover.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Title ---------- */
export interface PopoverTitleProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePopover.Title>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

const titleStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    fontWeight: 600,
    color: colors.foregroundPrimary,
    marginBottom: spacing.s4,
  },
});

function Title({ style, ref, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      ref={ref}
      {...stylex.props(titleStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Description ---------- */
export interface PopoverDescriptionProps
  extends Omit<ComponentPropsWithoutRef<typeof BasePopover.Description>, 'style'>,
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

function Description({ style, ref, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      ref={ref}
      {...stylex.props(descriptionStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Popover = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Title,
  Description,
  Close,
};
