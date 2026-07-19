import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface TabsRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function Root({ style, ref, ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- List ---------- */
export interface TabsListProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.List>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    borderBottomWidth: size.s1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
});

function List({ style, ref, ...props }: TabsListProps) {
  return (
    <BaseTabs.List ref={ref} {...stylex.props(listStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Tab ---------- */
export interface TabsTabProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Tab>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLButtonElement>;
}

const tabStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    fontWeight: 500,
    color: colors.foregroundSecondary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: size.s2,
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    transition: 'color 0.15s, border-color 0.15s',
    marginBottom: '-1px',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
});

function Tab({ style, ref, ...props }: TabsTabProps) {
  return (
    <BaseTabs.Tab ref={ref} {...stylex.props(tabStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Indicator ---------- */
export interface TabsIndicatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Indicator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLSpanElement>;
}

const indicatorStyles = stylex.create({
  base: {
    position: 'absolute',
    bottom: '-1px',
    height: size.s2,
    backgroundColor: colors.foregroundPrimary,
    borderRadius: radii.full,
    transition: 'left 0.2s, width 0.2s',
  },
});

function Indicator({ style, ref, ...props }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      ref={ref}
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Panel ---------- */
export interface TabsPanelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseTabs.Panel>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const panelStyles = stylex.create({
  base: {
    paddingTop: spacing.s16,
    outline: 'none',
  },
});

function Panel({ style, ref, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      ref={ref}
      {...stylex.props(panelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Tabs = {
  Root,
  List,
  Tab,
  Indicator,
  Panel,
};
