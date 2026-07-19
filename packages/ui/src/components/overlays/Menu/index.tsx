import { Menu as BaseMenu } from '@base-ui/react/menu';
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
function Root(props: ComponentPropsWithoutRef<typeof BaseMenu.Root>) {
  return <BaseMenu.Root {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseMenu.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseMenu.Trigger ref={ref} {...props} />;
}

/* ---------- Portal ---------- */
function Portal(props: ComponentPropsWithoutRef<typeof BaseMenu.Portal>) {
  return <BaseMenu.Portal {...props} />;
}

/* ---------- Positioner ---------- */
function Positioner(props: ComponentPropsWithoutRef<typeof BaseMenu.Positioner>) {
  return <BaseMenu.Positioner {...props} />;
}

/* ---------- Popup ---------- */
export interface MenuPopupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'style'>,
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

function Popup({ style, ref, ...props }: MenuPopupProps) {
  return (
    <BaseMenu.Popup
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
export interface MenuItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'style'>,
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

function Item({ style, ref, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item ref={ref} {...stylex.props(itemStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- LinkItem ---------- */
export interface MenuLinkItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.LinkItem>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLAnchorElement>;
}

function LinkItem({ style, ref, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- CheckboxItem ---------- */
export interface MenuCheckboxItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function CheckboxItem({ style, ref, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- CheckboxItemIndicator ---------- */
function CheckboxItemIndicator(
  props: ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItemIndicator>,
) {
  return <BaseMenu.CheckboxItemIndicator {...props} />;
}

/* ---------- RadioGroup ---------- */
function RadioGroup(props: ComponentPropsWithoutRef<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup {...props} />;
}

/* ---------- RadioItem ---------- */
export interface MenuRadioItemProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function RadioItem({ style, ref, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- RadioItemIndicator ---------- */
function RadioItemIndicator(props: ComponentPropsWithoutRef<typeof BaseMenu.RadioItemIndicator>) {
  return <BaseMenu.RadioItemIndicator {...props} />;
}

/* ---------- Group ---------- */
function Group(props: ComponentPropsWithoutRef<typeof BaseMenu.Group>) {
  return <BaseMenu.Group {...props} />;
}

/* ---------- GroupLabel ---------- */
export interface MenuGroupLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>, 'style'>,
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

function GroupLabel({ style, ref, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      ref={ref}
      {...stylex.props(groupLabelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface MenuSeparatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.Separator>, 'style'>,
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

function MenuSeparator({ style, ref, ...props }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Arrow ---------- */
export interface MenuArrowProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.Arrow>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const arrowStyles = stylex.create({
  base: {
    fill: colors.surfaceRaised,
    stroke: colors.border,
    strokeWidth: size.s1,
  },
});

function Arrow({ style, ref, ...props }: MenuArrowProps) {
  return (
    <BaseMenu.Arrow
      ref={ref}
      {...stylex.props(arrowStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- SubmenuRoot ---------- */
function SubmenuRoot(props: ComponentPropsWithoutRef<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

/* ---------- SubmenuTrigger ---------- */
export interface MenuSubmenuTriggerProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function SubmenuTrigger({ style, ref, ...props }: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      ref={ref}
      {...stylex.props(itemStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Menu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  LinkItem,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Group,
  GroupLabel,
  Separator: MenuSeparator,
  Arrow,
  SubmenuRoot,
  SubmenuTrigger,
};
