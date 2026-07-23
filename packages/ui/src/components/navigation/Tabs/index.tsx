import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import type React from 'react';
import type { ComponentProps } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface TabsRootProps
  extends Omit<ComponentProps<typeof BaseTabs.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function Root({ style, ref, ...props }: TabsRootProps) {
  return (
    <BaseTabs.Root data-slot="tabs" ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- List ---------- */
export interface TabsListProps
  extends Omit<ComponentProps<typeof BaseTabs.List>, 'style'>,
    BaseProps {}

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
});

function List({ style, ref, ...props }: TabsListProps) {
  return (
    <BaseTabs.List data-slot="tabs-list" ref={ref} {...stylex.props(listStyles.base, ...styleArray(style))} {...props} />
  );
}

/* ---------- Tab ---------- */
export interface TabsTabProps
  extends Omit<ComponentProps<typeof BaseTabs.Tab>, 'style'>,
    BaseProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
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
    marginBottom: size.n1,
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

function Tab({ style, ref, children, leading, trailing, ...props }: TabsTabProps) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-tab"
      ref={ref}
      {...stylex.props(tabStyles.base, ...styleArray(style))}
      {...props}
    >
      {leading && leading}
      <span {...stylex.props(tabStyles.children)}>{children}</span>
      {trailing && trailing}
    </BaseTabs.Tab>
  );
}

/* ---------- Indicator ---------- */
export interface TabsIndicatorProps
  extends Omit<ComponentProps<typeof BaseTabs.Indicator>, 'style'>,
    BaseProps {}

const indicatorStyles = stylex.create({
  base: {
    position: 'absolute',
    bottom: size.n1,
    height: size.s2,
    backgroundColor: colors.foregroundPrimary,
    borderRadius: radii.full,
    transition: 'left 0.2s, width 0.2s',
  },
});

function Indicator({ style, ref, ...props }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      data-slot="tabs-indicator"
      ref={ref}
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Panel ---------- */
export interface TabsPanelProps
  extends Omit<ComponentProps<typeof BaseTabs.Panel>, 'style'>,
    BaseProps {}

const panelStyles = stylex.create({
  base: {
    paddingTop: spacing.s16,
    outline: 'none',
  },
});

function Panel({ style, ref, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-panel"
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
