import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
function Root(props: ComponentPropsWithoutRef<typeof BaseContextMenu.Root>) {
  return <BaseContextMenu.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger> & { ref?: Ref<HTMLDivElement> }) {
  return <BaseContextMenu.Trigger ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseContextMenu.Portal>) {
  return <BaseContextMenu.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner>) {
  return <BaseContextMenu.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface ContextMenuPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const popupStyles = stylex.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: size.s1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    padding: spacing.s4,
    outline: 'none',
    boxShadow: colors.shadowElevated,
    minWidth: '12rem',
  },
});

function Popup({ style, ref, ...props }: ContextMenuPopupProps) {
  return (
    <BaseContextMenu.Popup
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

/* ---------- Item ---------- */
export interface ContextMenuItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.Item>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const itemStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    borderRadius: radii.r8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':focus-visible': {
      backgroundColor: colors.lighten4,
    },
  },
});

function Item({ style, ref, ...props }: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Group ---------- */
function Group(props: ComponentPropsWithoutRef<typeof BaseContextMenu.Group>) {
  return <BaseContextMenu.Group {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface ContextMenuGroupLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const groupLabelStyles = stylex.create({
  base: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s4,
    fontSize: typography.labelSize,
    fontWeight: 500,
    color: colors.foregroundSecondary,
  },
});

function GroupLabel({ style, ref, ...props }: ContextMenuGroupLabelProps) {
  return (
    <BaseContextMenu.GroupLabel
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface ContextMenuSeparatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const separatorStyles = stylex.create({
  base: {
    height: size.s1,
    backgroundColor: colors.border,
    marginBlock: spacing.s4,
  },
});

function ContextMenuSeparator({ style, ref, ...props }: ContextMenuSeparatorProps) {
  return (
    <BaseContextMenu.Separator
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const ContextMenu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Group,
  GroupLabel,
  Separator: ContextMenuSeparator,
};
