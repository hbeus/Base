import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { LayoutGroup, motion } from 'motion/react';
import type React from 'react';
import {
  type ComponentProps,
  createContext,
  type RefObject,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { tabIndicatorDuration } from '../../../constants/motion';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { mergeRefs } from '../../../utils/mergeRefs';
import { styleArray } from '../../../utils/styleArray';
import { buttonStyles } from '../../input/Button';

type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
type TabsVariant = 'underline' | 'button';

type IndicatorPoint = { left: number; top: number };

interface TabsRootContextValue {
  layoutId: string;
  indicatorRectRef: RefObject<IndicatorPoint | null>;
  activeValue: ComponentProps<typeof BaseTabs.Root>['value'];
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  background: boolean;
  fill: boolean;
}

const TabsRootContext = createContext<TabsRootContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue>({
  variant: 'underline',
  size: 'md',
  background: false,
  fill: false,
});

function useTabsRootContext() {
  const ctx = useContext(TabsRootContext);
  if (!ctx) {
    throw new Error('Tabs compound parts must be used within Tabs.Root');
  }
  return ctx;
}

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

function Root({
  style,
  ref,
  children,
  value,
  defaultValue = 0,
  onValueChange,
  ...props
}: TabsRootProps) {
  const reactId = useId();
  const layoutId = `tabs-indicator-${reactId}`;
  const indicatorRectRef = useRef<IndicatorPoint | null>(null);
  const [activeValue, setActiveValue] = useState(() => value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setActiveValue(value);
    }
  }, [value]);

  return (
    <TabsRootContext.Provider value={{ layoutId, indicatorRectRef, activeValue }}>
      <LayoutGroup id={layoutId}>
        <BaseTabs.Root
          data-slot='tabs'
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={(next, details) => {
            setActiveValue(next);
            onValueChange?.(next, details);
          }}
          {...stylex.props(rootStyles.base, ...styleArray(style))}
          {...props}
        >
          {children}
        </BaseTabs.Root>
      </LayoutGroup>
    </TabsRootContext.Provider>
  );
}

/* ---------- List ---------- */
type TabsListBaseProps = Omit<ComponentProps<typeof BaseTabs.List>, 'style'> & BaseProps;

export type TabsListProps =
  | (TabsListBaseProps & {
      variant?: 'underline';
      size?: TabsSize;
      fill?: boolean;
      background?: never;
    })
  | (TabsListBaseProps & {
      variant: 'button';
      size?: TabsSize;
      fill?: boolean;
      background?: boolean;
    });

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: 'fit-content',
  },
  fill: {
    width: '100%',
  },
  underline: {
    gap: spacing.s4,
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  button: {
    gap: spacing.s2,
    borderBottomWidth: 0,
  },
  background: {
    backgroundColor: colors.lighten4,
    padding: spacing.s4,
  },
  radiusXs: { borderRadius: radii.r8 },
  radiusSm: { borderRadius: radii.r8 },
  radiusMd: { borderRadius: radii.r10 },
  radiusLg: { borderRadius: radii.r12 },
});

const listRadiusStyles = {
  xs: listStyles.radiusXs,
  sm: listStyles.radiusSm,
  md: listStyles.radiusMd,
  lg: listStyles.radiusLg,
} as const;

function List({
  style,
  ref,
  variant = 'underline',
  size: sizeProp = 'md',
  fill = false,
  background,
  children,
  ...props
}: TabsListProps) {
  const withBackground = variant === 'button' && Boolean(background);

  return (
    <TabsListContext.Provider
      value={{ variant, size: sizeProp, background: withBackground, fill }}
    >
      <BaseTabs.List
        data-slot='tabs-list'
        data-variant={variant}
        data-size={sizeProp}
        ref={ref}
        {...stylex.props(
          listStyles.base,
          fill && listStyles.fill,
          variant === 'underline' ? listStyles.underline : listStyles.button,
          withBackground && listStyles.background,
          withBackground && listRadiusStyles[sizeProp],
          ...styleArray(style),
        )}
        {...props}
      >
        {children}
      </BaseTabs.List>
    </TabsListContext.Provider>
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
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    fontWeight: 500,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s, background-color 0.15s',
    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  underline: {
    color: colors.foregroundSecondary,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    marginBottom: size.n1,
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  underlineActive: {
    color: colors.foregroundPrimary,
  },
  underlineXs: {
    paddingInline: spacing.s8,
    fontSize: typography.labelSize,
  },
  underlineSm: {
    paddingInline: spacing.s12,
    fontSize: typography.labelSize,
  },
  underlineMd: {
    paddingInline: spacing.s16,
    fontSize: typography.bodySmSize,
  },
  underlineLg: {
    paddingInline: spacing.s24,
    fontSize: typography.bodySize,
  },
  buttonInactive: {
    backgroundColor: 'transparent',
    color: colors.foregroundSecondary,
    ':hover': {
      backgroundColor: 'transparent',
      color: colors.foregroundPrimary,
    },
  },
  buttonActive: {
    color: colors.buttonPrimaryFg,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'transparent',
      color: colors.buttonPrimaryFg,
    },
  },
  fill: {
    flex: 1,
    width: '100%',
    minWidth: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
  },
  children: {
    display: 'block',
    paddingInline: spacing.s4,
  },
});

const underlineSizeStyles = {
  xs: tabStyles.underlineXs,
  sm: tabStyles.underlineSm,
  md: tabStyles.underlineMd,
  lg: tabStyles.underlineLg,
} as const;

const indicatorStyles = stylex.create({
  base: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 0,
  },
  underline: {
    left: 0,
    right: 0,
    bottom: 0,
    height: borders.focus,
    backgroundColor: colors.foregroundPrimary,
  },
  button: {
    inset: 0,
    backgroundColor: colors.buttonPrimaryBg,
  },
  radiusXs: { borderRadius: radii.r8 },
  radiusSm: { borderRadius: radii.r8 },
  radiusMd: { borderRadius: radii.r10 },
  radiusLg: { borderRadius: radii.r12 },
});

const indicatorRadiusStyles = {
  xs: indicatorStyles.radiusXs,
  sm: indicatorStyles.radiusSm,
  md: indicatorStyles.radiusMd,
  lg: indicatorStyles.radiusLg,
} as const;

function TabIndicator({ duration }: { duration: number }) {
  const { layoutId } = useTabsRootContext();
  const { variant, size: sizeProp } = useContext(TabsListContext);

  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      transition={{ type: 'tween', duration, ease: 'easeOut' }}
      {...stylex.props(
        indicatorStyles.base,
        variant === 'underline' ? indicatorStyles.underline : indicatorStyles.button,
        variant === 'button' && indicatorRadiusStyles[sizeProp],
      )}
    />
  );
}

function Tab({ style, ref, children, leading, trailing, value, ...props }: TabsTabProps) {
  const { activeValue, indicatorRectRef } = useTabsRootContext();
  const { variant, size: sizeProp, fill } = useContext(TabsListContext);
  const tabRef = useRef<HTMLElement | null>(null);
  const active = activeValue === value;
  const wasActiveRef = useRef(active);
  const durationRef = useRef(0);

  // Destination tab is already mounted; measure travel before the indicator paints.
  if (active && !wasActiveRef.current && tabRef.current) {
    const rect = tabRef.current.getBoundingClientRect();
    const prev = indicatorRectRef.current;
    durationRef.current = prev
      ? tabIndicatorDuration(Math.hypot(rect.left - prev.left, rect.top - prev.top))
      : 0;
  }
  if (!active) {
    durationRef.current = 0;
  }
  wasActiveRef.current = active;

  useLayoutEffect(() => {
    if (!active || !tabRef.current) return;
    const rect = tabRef.current.getBoundingClientRect();
    indicatorRectRef.current = { left: rect.left, top: rect.top };
  }, [active, indicatorRectRef]);

  return (
    <BaseTabs.Tab
      data-slot='tabs-tab'
      ref={mergeRefs(tabRef, ref)}
      value={value}
      {...stylex.props(
        tabStyles.base,
        variant === 'underline' && tabStyles.underline,
        variant === 'underline' && underlineSizeStyles[sizeProp],
        variant === 'underline' && active && tabStyles.underlineActive,
        variant === 'button' && buttonStyles.base,
        variant === 'button' && buttonStyles[sizeProp],
        variant === 'button' && (active ? tabStyles.buttonActive : tabStyles.buttonInactive),
        fill && tabStyles.fill,
        ...styleArray(style),
      )}
      {...props}
    >
      {active && <TabIndicator duration={durationRef.current} />}
      <span {...stylex.props(tabStyles.content)}>
        {leading && leading}
        <span {...stylex.props(tabStyles.children)}>{children}</span>
        {trailing && trailing}
      </span>
    </BaseTabs.Tab>
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
      data-slot='tabs-panel'
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
  Panel,
};
