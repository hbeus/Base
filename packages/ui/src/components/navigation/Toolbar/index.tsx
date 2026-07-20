import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface ToolbarRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToolbar.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    padding: spacing.s4,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    backgroundColor: colors.surface300,
  },
});

function Root({ style, ref, ...props }: ToolbarRootProps) {
  return (
    <BaseToolbar.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Group ---------- */
export interface ToolbarGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToolbar.Group>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const groupStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
  },
});

function Group({ style, ref, ...props }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      ref={ref}
      {...stylex.props(groupStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Button ---------- */
export interface ToolbarButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToolbar.Button>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s4,
    borderRadius: radii.r8,
    fontSize: typography.labelSize,
    color: colors.foregroundPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.1s',
    ':hover': {
      backgroundColor: colors.lighten4,
    },
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
});

function Button({ style, ref, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      ref={ref}
      {...stylex.props(buttonStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Link ---------- */
export interface ToolbarLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToolbar.Link>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLAnchorElement>;
}

function Link({ style, ref, ...props }: ToolbarLinkProps) {
  return (
    <BaseToolbar.Link
      ref={ref}
      {...stylex.props(buttonStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Separator ---------- */
export interface ToolbarSeparatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseToolbar.Separator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const separatorStyles = stylex.create({
  base: {
    width: borders.default,
    height: spacing.s16,
    backgroundColor: colors.border,
    marginInline: spacing.s4,
  },
});

function ToolbarSeparator({ style, ref, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      ref={ref}
      {...stylex.props(separatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Input ---------- */
function Input(props: ComponentPropsWithoutRef<typeof BaseToolbar.Input>) {
  return <BaseToolbar.Input {...props} />;
}

/* ---------- Export ---------- */
export const Toolbar = {
  Root,
  Group,
  Button,
  Link,
  Separator: ToolbarSeparator,
  Input,
};
