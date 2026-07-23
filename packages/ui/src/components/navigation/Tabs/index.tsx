import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconDots } from '@tabler/icons-react';
import { LayoutGroup, motion } from 'motion/react';
import type React from 'react';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
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
import { zIndex } from '../../../tokens/zIndex.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { mergeRefs } from '../../../utils/mergeRefs';
import { styleArray } from '../../../utils/styleArray';
import { Icon } from '../../display/Icon';
import { buttonStyles } from '../../input/Button';
import { Menu } from '../../overlays/Menu';

type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
type TabsVariant = 'underline' | 'button';
type TabValue = ComponentProps<typeof BaseTabs.Tab>['value'];

type IndicatorPoint = { left: number; top: number };

interface TabRegistration {
  id: string;
  value: TabValue;
  label: string;
  labelNode: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  width: number;
}

interface TabsRootContextValue {
  layoutId: string;
  indicatorRectRef: RefObject<IndicatorPoint | null>;
  activeValue: TabValue;
  selectValue: (value: TabValue) => void;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  background: boolean;
  fill: boolean;
  registerTab: (tab: Omit<TabRegistration, 'width'> & { width?: number }) => void;
  updateTabWidth: (id: string, width: number) => void;
  unregisterTab: (id: string) => void;
  isTabVisible: (id: string) => boolean;
  gapPx: number;
}

const TabsRootContext = createContext<TabsRootContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue | null>(null);

function useTabsRootContext() {
  const ctx = useContext(TabsRootContext);
  if (!ctx) {
    throw new Error('Tabs compound parts must be used within Tabs.Root');
  }
  return ctx;
}

function useTabsListContext() {
  const ctx = useContext(TabsListContext);
  if (!ctx) {
    throw new Error('Tabs.Tab must be used within Tabs.List');
  }
  return ctx;
}

function labelFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(labelFromChildren).filter(Boolean).join(' ');
  }
  if (children != null && typeof children === 'object' && 'props' in children) {
    return labelFromChildren(
      (children as React.ReactElement<{ children?: ReactNode }>).props.children,
    );
  }
  return 'Tab';
}

const GAP_PX: Record<TabsVariant, number> = {
  underline: 16, // spacing.s4
  button: 8, // spacing.s2
};

function fitVisibleCount(
  containerWidth: number,
  widths: number[],
  moreWidth: number,
  gap: number,
): number {
  const count = widths.length;
  if (count === 0) return 0;

  const allWidth = widths.reduce((sum, w) => sum + w, 0) + gap * Math.max(0, count - 1);
  if (allWidth <= containerWidth + 0.5) return count;

  let best = 0;
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += widths[i] ?? 0;
    const between = gap * i;
    const beforeMore = gap;
    if (sum + between + beforeMore + moreWidth <= containerWidth + 0.5) {
      best = i + 1;
    } else {
      break;
    }
  }
  return best;
}

/* ---------- Root ---------- */
export interface TabsRootProps
  extends Omit<ComponentProps<typeof BaseTabs.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
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
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const [activeValue, setActiveValue] = useState<TabValue>(() => value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setActiveValue(value);
    }
  }, [value]);

  const selectValue = useCallback((next: TabValue) => {
    setActiveValue(next);
    onValueChangeRef.current?.(next, {
      reason: 'none',
      cancel() {},
      allowPropagation() {},
      isCanceled: false,
      isPropagationAllowed: true,
      event: undefined,
      trigger: undefined,
      activationDirection: 'none',
    } as unknown as Parameters<NonNullable<typeof onValueChange>>[1]);
  }, []);

  return (
    <TabsRootContext.Provider value={{ layoutId, indicatorRectRef, activeValue, selectValue }}>
      <LayoutGroup id={layoutId}>
        <BaseTabs.Root
          data-slot='tabs'
          ref={ref}
          value={activeValue}
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
    maxWidth: '100%',
    minWidth: 0,
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

const moreStyles = stylex.create({
  trigger: {
    position: 'relative',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s, background-color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  triggerUnderline: {
    marginBottom: size.n1,
  },
  triggerActiveUnderline: {
    color: colors.foregroundPrimary,
  },
  triggerActiveButton: {
    color: colors.buttonPrimaryFg,
  },
  triggerContent: {
    position: 'relative',
    zIndex: zIndex.raised,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSlot: {
    marginInlineStart: 'auto',
    color: colors.foregroundSecondary,
  },
  measure: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
  },
});

function MoreOverflow({
  items,
  size: sizeProp,
  variant,
}: {
  items: TabRegistration[];
  size: TabsSize;
  variant: TabsVariant;
}) {
  const { activeValue, selectValue, indicatorRectRef } = useTabsRootContext();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const activeItem = items.find(item => item.value === activeValue);
  const activeInOverflow = Boolean(activeItem);
  const wasActiveRef = useRef(activeInOverflow);
  const durationRef = useRef(0);

  if (activeInOverflow && !wasActiveRef.current && triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect();
    const prev = indicatorRectRef.current;
    durationRef.current = prev
      ? tabIndicatorDuration(Math.hypot(rect.left - prev.left, rect.top - prev.top))
      : 0;
  }
  if (!activeInOverflow) {
    durationRef.current = 0;
  }
  wasActiveRef.current = activeInOverflow;

  useLayoutEffect(() => {
    if (!activeInOverflow || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    indicatorRectRef.current = { left: rect.left, top: rect.top };
  }, [activeInOverflow, indicatorRectRef]);

  const ariaLabel = activeItem ? `More tabs, ${activeItem.label} selected` : 'More tabs';

  return (
    <Menu.Root>
      <Menu.Trigger
        data-slot='tabs-more'
        aria-label={ariaLabel}
        ref={triggerRef}
        render={
          <button
            type='button'
            {...stylex.props(
              moreStyles.trigger,
              buttonStyles[sizeProp],
              variant === 'underline' && moreStyles.triggerUnderline,
              activeInOverflow && variant === 'underline' && moreStyles.triggerActiveUnderline,
              activeInOverflow && variant === 'button' && moreStyles.triggerActiveButton,
            )}
          />
        }
      >
        {activeInOverflow && <TabIndicator duration={durationRef.current} />}
        <span {...stylex.props(moreStyles.triggerContent)}>
          <Icon icon={IconDots} />
        </span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={4}>
          <Menu.Popup>
            <Menu.RadioGroup
              value={activeValue}
              onValueChange={next => {
                selectValue(next);
              }}
            >
              {items.map(item => (
                <Menu.RadioItem key={item.id} value={item.value} disabled={item.disabled}>
                  {item.leading}
                  <span>{item.labelNode}</span>
                  {item.trailing}
                  <Menu.RadioItemIndicator {...stylex.props(moreStyles.indicatorSlot)}>
                    <Icon icon={IconCheck} size={14} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

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
  const gapPx = GAP_PX[variant];
  const listRef = useRef<HTMLDivElement | null>(null);
  const moreMeasureRef = useRef<HTMLButtonElement | null>(null);
  const orderRef = useRef<string[]>([]);
  const [tabs, setTabs] = useState<TabRegistration[]>([]);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  const registerTab = useCallback((tab: Omit<TabRegistration, 'width'> & { width?: number }) => {
    setTabs(prev => {
      const existing = prev.find(t => t.id === tab.id);
      const next: TabRegistration = {
        ...tab,
        width: tab.width ?? existing?.width ?? 0,
      };
      if (existing) {
        return prev.map(t => (t.id === tab.id ? { ...next, width: tab.width ?? t.width } : t));
      }
      if (!orderRef.current.includes(tab.id)) {
        orderRef.current.push(tab.id);
      }
      return [...prev, next];
    });
  }, []);

  const updateTabWidth = useCallback((id: string, width: number) => {
    setTabs(prev =>
      prev.map(t => (t.id === id && Math.abs(t.width - width) > 0.5 ? { ...t, width } : t)),
    );
  }, []);

  const unregisterTab = useCallback((id: string) => {
    orderRef.current = orderRef.current.filter(x => x !== id);
    setTabs(prev => prev.filter(t => t.id !== id));
  }, []);

  const orderedTabs = useMemo(() => {
    const byId = new Map(tabs.map(t => [t.id, t]));
    return orderRef.current.map(id => byId.get(id)).filter(Boolean) as TabRegistration[];
  }, [tabs]);

  const isTabVisible = useCallback(
    (id: string) => {
      if (visibleCount === null) return true;
      const index = orderRef.current.indexOf(id);
      return index > -1 && index < visibleCount;
    },
    [visibleCount],
  );

  const recompute = useCallback(() => {
    const listEl = listRef.current;
    if (!listEl || orderedTabs.length === 0) return;

    const styles = getComputedStyle(listEl);
    const padding =
      (Number.parseFloat(styles.paddingLeft) || 0) + (Number.parseFloat(styles.paddingRight) || 0);
    const containerWidth = listEl.clientWidth - padding;
    if (containerWidth <= 0) return;

    const widths = orderedTabs.map(t => Math.max(t.width, 1));
    if (widths.some(w => w <= 1) && visibleCount === null) {
      // Wait until tabs have reported real widths.
      return;
    }

    const moreWidth = moreMeasureRef.current?.offsetWidth ?? 36;
    const next = fitVisibleCount(containerWidth, widths, moreWidth, gapPx);
    setVisibleCount(prev => (prev === next ? prev : next));
  }, [gapPx, orderedTabs, visibleCount]);

  useLayoutEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const frame = requestAnimationFrame(() => recompute());
    const ro = new ResizeObserver(() => recompute());
    ro.observe(listEl);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [recompute]);

  const overflowItems =
    visibleCount !== null && visibleCount < orderedTabs.length
      ? orderedTabs.slice(visibleCount)
      : [];

  const listContext = useMemo<TabsListContextValue>(
    () => ({
      variant,
      size: sizeProp,
      background: withBackground,
      fill,
      registerTab,
      updateTabWidth,
      unregisterTab,
      isTabVisible,
      gapPx,
    }),
    [
      variant,
      sizeProp,
      withBackground,
      fill,
      registerTab,
      updateTabWidth,
      unregisterTab,
      isTabVisible,
      gapPx,
    ],
  );

  return (
    <TabsListContext.Provider value={listContext}>
      <BaseTabs.List
        data-slot='tabs-list'
        data-variant={variant}
        data-size={sizeProp}
        ref={mergeRefs(listRef, ref)}
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
        {/* Hidden probe to measure More trigger width without affecting layout. */}
        <button
          type='button'
          aria-hidden
          tabIndex={-1}
          ref={moreMeasureRef}
          {...stylex.props(
            moreStyles.trigger,
            moreStyles.measure,
            buttonStyles[sizeProp],
            variant === 'underline' && moreStyles.triggerUnderline,
          )}
        >
          <Icon icon={IconDots} />
        </button>
        {overflowItems.length > 0 && (
          <MoreOverflow items={overflowItems} size={sizeProp} variant={variant} />
        )}
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
  measure: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    height: 'auto',
    width: 'max-content',
    flex: 'none',
  },
  content: {
    position: 'relative',
    zIndex: zIndex.raised,
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
    zIndex: zIndex.base,
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
  const { variant, size: sizeProp } = useTabsListContext();

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

function Tab({ style, ref, children, leading, trailing, value, disabled, ...props }: TabsTabProps) {
  const { activeValue, indicatorRectRef } = useTabsRootContext();
  const {
    variant,
    size: sizeProp,
    fill,
    registerTab,
    updateTabWidth,
    unregisterTab,
    isTabVisible,
  } = useTabsListContext();
  const id = useId();
  const tabRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const visible = isTabVisible(id);
  const active = activeValue === value;
  const wasActiveRef = useRef(active);
  const durationRef = useRef(0);
  const label = labelFromChildren(children);

  useLayoutEffect(() => {
    registerTab({
      id,
      value,
      label,
      labelNode: children,
      leading,
      trailing,
      disabled,
    });
    return () => unregisterTab(id);
  }, [id, value, label, children, leading, trailing, disabled, registerTab, unregisterTab]);

  useLayoutEffect(() => {
    if (!measureRef.current) return;
    updateTabWidth(id, measureRef.current.getBoundingClientRect().width);
  }, [id, updateTabWidth, children, leading, trailing, sizeProp, variant]);

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
    if (!active || !visible || !tabRef.current) return;
    const rect = tabRef.current.getBoundingClientRect();
    indicatorRectRef.current = { left: rect.left, top: rect.top };
  }, [active, visible, indicatorRectRef]);

  return (
    <>
      <span
        ref={measureRef}
        aria-hidden
        {...stylex.props(
          tabStyles.base,
          tabStyles.measure,
          variant === 'underline' && tabStyles.underline,
          variant === 'underline' && underlineSizeStyles[sizeProp],
          variant === 'button' && buttonStyles.base,
          variant === 'button' && buttonStyles[sizeProp],
        )}
      >
        {leading && leading}
        <span {...stylex.props(tabStyles.children)}>{children}</span>
        {trailing && trailing}
      </span>
      {visible ? (
        <BaseTabs.Tab
          data-slot='tabs-tab'
          ref={mergeRefs(tabRef, ref)}
          value={value}
          disabled={disabled}
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
      ) : null}
    </>
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
