import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
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
export interface NavigationMenuRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLElement>;
}

const rootStyles = stylex.create({
  base: {
    position: 'relative',
  },
});

function Root({ style, ref, ...props }: NavigationMenuRootProps) {
  return (
    <BaseNavigationMenu.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- List ---------- */
export interface NavigationMenuListProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.List>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLUListElement>;
}

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
});

function List({ style, ref, ...props }: NavigationMenuListProps) {
  return (
    <BaseNavigationMenu.List
      ref={ref}
      {...stylex.props(listStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Item ---------- */
function Item(props: ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item>) {
  return <BaseNavigationMenu.Item {...props} />;
}

/* ---------- Trigger ---------- */
export interface NavigationMenuTriggerProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

const triggerStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.bodySmSize,
    fontWeight: 500,
    color: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: radii.r8,
    cursor: 'pointer',
    outline: 'none',
    transition: 'color 0.15s, background-color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: colors.lighten4,
    },
  },
});

function Trigger({ style, ref, ...props }: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      ref={ref}
      {...stylex.props(triggerStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Link ---------- */
export interface NavigationMenuLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLAnchorElement>;
}

function Link({ style, ref, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link
      ref={ref}
      {...stylex.props(triggerStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseNavigationMenu.Portal>) {
  return <BaseNavigationMenu.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>) {
  return <BaseNavigationMenu.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface NavigationMenuPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Popup>, 'style'>,
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
  },
});

function Popup({ style, ref, ...props }: NavigationMenuPopupProps) {
  return (
    <BaseNavigationMenu.Popup
      ref={ref}
      render={
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        />
      }
      {...stylex.props(popupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
export interface NavigationMenuContentProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function Content({ style, ref, ...props }: NavigationMenuContentProps) {
  return <BaseNavigationMenu.Content ref={ref} {...props} />;
}

/* ---------- Viewport ---------- */
function Viewport(props: ComponentPropsWithoutRef<typeof BaseNavigationMenu.Viewport>) {
  return <BaseNavigationMenu.Viewport {...props} />;
}

/* ---------- Icon ---------- */
function Icon(props: ComponentPropsWithoutRef<typeof BaseNavigationMenu.Icon>) {
  return <BaseNavigationMenu.Icon {...props} />;
}

/* ---------- Arrow ---------- */
export interface NavigationMenuArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Arrow>, 'style'>,
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

function Arrow({ style, ref, ...props }: NavigationMenuArrowProps) {
  return (
    <BaseNavigationMenu.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Backdrop ---------- */
export interface NavigationMenuBackdropProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseNavigationMenu.Backdrop>, 'style'>,
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

function Backdrop({ style, ref, ...props }: NavigationMenuBackdropProps) {
  return (
    <BaseNavigationMenu.Backdrop
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

/* ---------- Export ---------- */
export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Link,
  Portal,
  Positioner,
  Popup,
  Content,
  Viewport,
  Icon,
  Arrow,
  Backdrop,
};
