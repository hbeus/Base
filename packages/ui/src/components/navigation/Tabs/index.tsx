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
import { measureVisibleTabs } from './overflow';

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
  overflowLabelId: string | undefined;
  selectValue: (value: TabValue, event?: Event) => void;
  registerLogicalTab: (id: string, tab: Pick<TabRegistration, 'value' | 'disabled'>) => void;
  unregisterLogicalTab: (id: string) => void;
  setOverflowLabelId: (id: string | undefined) => void;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  background: boolean;
  fill: boolean;
  /** False until the first overflow fit pass — avoid fill-flex squashing pre-measure. */
  overflowReady: boolean;
  registerTab: (tab: Omit<TabRegistration, 'width'> & { width?: number }) => void;
  updateTabWidth: (id: string, width: number) => void;
  unregisterTab: (id: string) => void;
  isTabVisible: (id: string) => boolean;
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

type TabsChangeDetails = Parameters<
  NonNullable<ComponentProps<typeof BaseTabs.Root>['onValueChange']>
>[1];

interface LogicalTab {
  id: string;
  value: TabValue;
  disabled?: boolean;
}

type LogicalSelectionResolution =
  | { type: 'none' }
  | { type: 'notify-initial' }
  | {
      type: 'fallback';
      nextValue: TabValue;
      reason: 'initial' | 'disabled' | 'missing';
    };

function createChangeDetails(
  reason: TabsChangeDetails['reason'],
  event?: Event,
  cancelable = true,
): TabsChangeDetails {
  let canceled = false;
  let propagationAllowed = false;
  const sourceEvent = event ?? new Event('tabs-value-change');

  return {
    reason,
    event: sourceEvent,
    trigger: sourceEvent.target instanceof Element ? sourceEvent.target : undefined,
    activationDirection: 'none',
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return propagationAllowed;
    },
    cancel() {
      if (cancelable) {
        canceled = true;
      }
    },
    allowPropagation() {
      propagationAllowed = true;
    },
  } as TabsChangeDetails;
}

function resolveLogicalSelection(
  activeValue: TabValue,
  tabs: LogicalTab[],
  hasExplicitDefaultValue: boolean,
  isInitialResolution: boolean,
): LogicalSelectionResolution {
  const selected = tabs.find(tab => tab.value === activeValue);
  const selectionIsValid = Boolean(selected && !selected.disabled);

  if (isInitialResolution && !hasExplicitDefaultValue && selectionIsValid) {
    return { type: 'notify-initial' };
  }
  if (activeValue === null || selectionIsValid) {
    return { type: 'none' };
  }

  const firstEnabled = tabs.find(tab => !tab.disabled);
  const reason = selected?.disabled ? 'disabled' : hasExplicitDefaultValue ? 'missing' : 'initial';

  return {
    type: 'fallback',
    nextValue: firstEnabled?.value ?? null,
    reason,
  };
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
  defaultValue,
  onValueChange,
  ...props
}: TabsRootProps) {
  const reactId = useId();
  const layoutId = `tabs-indicator-${reactId}`;
  const indicatorRectRef = useRef<IndicatorPoint | null>(null);
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const controlledRef = useRef(value !== undefined);
  controlledRef.current = value !== undefined;
  const hasExplicitDefaultValueRef = useRef(defaultValue !== undefined);
  const initialSelectionResolvedRef = useRef(false);

  const [uncontrolledValue, setUncontrolledValue] = useState<TabValue>(() =>
    defaultValue === undefined ? 0 : defaultValue,
  );
  const [logicalTabs, setLogicalTabs] = useState<LogicalTab[]>([]);
  const [overflowLabelId, setOverflowLabelId] = useState<string>();
  const activeValue = value !== undefined ? value : uncontrolledValue;

  const commitValue = useCallback((next: TabValue, details: TabsChangeDetails) => {
    onValueChangeRef.current?.(next, details);
    if (!details.isCanceled && !controlledRef.current) {
      setUncontrolledValue(next);
    }
  }, []);

  const selectValue = useCallback(
    (next: TabValue, event?: Event) => {
      commitValue(next, createChangeDetails('none', event));
    },
    [commitValue],
  );

  const registerLogicalTab = useCallback(
    (id: string, tab: Pick<TabRegistration, 'value' | 'disabled'>) => {
      setLogicalTabs(previous => {
        const index = previous.findIndex(item => item.id === id);
        const next = { id, ...tab };
        if (index === -1) {
          return [...previous, next];
        }
        const current = previous[index];
        if (current?.value === tab.value && current.disabled === tab.disabled) {
          return previous;
        }
        return previous.map(item => (item.id === id ? next : item));
      });
    },
    [],
  );

  const unregisterLogicalTab = useCallback((id: string) => {
    setLogicalTabs(previous => previous.filter(tab => tab.id !== id));
  }, []);

  useLayoutEffect(() => {
    if (controlledRef.current || logicalTabs.length === 0) {
      return;
    }

    const isInitialResolution = !initialSelectionResolvedRef.current;
    initialSelectionResolvedRef.current = true;
    const resolution = resolveLogicalSelection(
      activeValue,
      logicalTabs,
      hasExplicitDefaultValueRef.current,
      isInitialResolution,
    );

    if (resolution.type === 'notify-initial') {
      onValueChangeRef.current?.(activeValue, createChangeDetails('initial', undefined, false));
    }
    if (resolution.type === 'fallback') {
      commitValue(resolution.nextValue, createChangeDetails(resolution.reason, undefined, false));
    }
  }, [activeValue, commitValue, logicalTabs]);

  const rootContext = useMemo<TabsRootContextValue>(
    () => ({
      layoutId,
      indicatorRectRef,
      activeValue,
      overflowLabelId,
      selectValue,
      registerLogicalTab,
      unregisterLogicalTab,
      setOverflowLabelId,
    }),
    [layoutId, activeValue, overflowLabelId, selectValue, registerLogicalTab, unregisterLogicalTab],
  );

  return (
    <TabsRootContext.Provider value={rootContext}>
      <LayoutGroup id={layoutId}>
        <BaseTabs.Root
          data-slot='tabs'
          ref={ref}
          value={activeValue}
          onValueChange={(next, details) => {
            commitValue(next, details);
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
    // Keep resize transitions clipped after the initial atomic fit.
    overflow: 'hidden',
  },
  pending: {
    visibility: 'hidden',
  },
  fill: {
    width: '100%',
    alignSelf: 'stretch',
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

const tabListStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minWidth: 0,
    overflow: 'hidden',
    flexShrink: 1,
  },
  fill: {
    width: '100%',
    flex: 1,
  },
  underline: {
    gap: spacing.s4,
  },
  button: {
    gap: spacing.s2,
  },
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
  const { activeValue, selectValue, indicatorRectRef, setOverflowLabelId } = useTabsRootContext();
  const triggerId = useId();
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

  useLayoutEffect(() => {
    setOverflowLabelId(activeInOverflow ? triggerId : undefined);
    return () => setOverflowLabelId(undefined);
  }, [activeInOverflow, setOverflowLabelId, triggerId]);

  const ariaLabel = activeItem ? `More tabs, ${activeItem.label} selected` : 'More tabs';

  return (
    <Menu.Root>
      <Menu.Trigger
        data-slot='tabs-more'
        id={triggerId}
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
        <Menu.Positioner align='end' sideOffset={4}>
          <Menu.Popup>
            <Menu.RadioGroup
              value={activeValue}
              onValueChange={(next, details) => {
                selectValue(next, details.event);
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
  const listRef = useRef<HTMLDivElement | null>(null);
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const moreMeasureRef = useRef<HTMLButtonElement | null>(null);
  const tabWidthsRef = useRef(new Map<string, number>());
  const [tabs, setTabs] = useState<TabRegistration[]>([]);
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  const registerTab = useCallback((tab: Omit<TabRegistration, 'width'> & { width?: number }) => {
    setVisibleCount(null);
    setTabs(prev => {
      const existing = prev.find(t => t.id === tab.id);
      const next: TabRegistration = {
        ...tab,
        width: tab.width ?? existing?.width ?? 0,
      };
      if (existing) {
        const updated = { ...next, width: tab.width ?? existing.width };
        if (
          existing.value === updated.value &&
          existing.label === updated.label &&
          existing.labelNode === updated.labelNode &&
          existing.leading === updated.leading &&
          existing.trailing === updated.trailing &&
          existing.disabled === updated.disabled &&
          existing.width === updated.width
        ) {
          return prev;
        }
        return prev.map(t => (t.id === tab.id ? updated : t));
      }
      return [...prev, next];
    });
  }, []);

  const updateTabWidth = useCallback((id: string, width: number) => {
    const previousWidth = tabWidthsRef.current.get(id);
    if (previousWidth !== undefined && Math.abs(previousWidth - width) <= 0.5) return;

    tabWidthsRef.current.set(id, width);
    setVisibleCount(null);
    setTabs(prev => prev.map(tab => (tab.id === id ? { ...tab, width } : tab)));
  }, []);

  const unregisterTab = useCallback((id: string) => {
    tabWidthsRef.current.delete(id);
    setVisibleCount(null);
    setTabs(prev => prev.filter(t => t.id !== id));
    setOrderIds(prev => prev.filter(tabId => tabId !== id));
  }, []);

  const orderedTabs = useMemo(() => {
    const byId = new Map(tabs.map(t => [t.id, t]));
    return orderIds.map(id => byId.get(id)).filter(Boolean) as TabRegistration[];
  }, [orderIds, tabs]);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const nextOrder = Array.from(
      listElement.querySelectorAll<HTMLElement>('[data-tabs-measure-id]'),
    )
      .map(element => element.dataset.tabsMeasureId)
      .filter((id): id is string => Boolean(id));

    const orderUnchanged =
      orderIds.length === nextOrder.length &&
      orderIds.every((id, index) => id === nextOrder[index]);
    if (orderUnchanged) return;

    setVisibleCount(null);
    setOrderIds(nextOrder);
  });

  const isTabVisible = useCallback(
    (id: string) => {
      if (visibleCount === null) return true;
      const index = orderIds.indexOf(id);
      return index > -1 && index < visibleCount;
    },
    [orderIds, visibleCount],
  );

  const recompute = useCallback(() => {
    const overflowElement = overflowRef.current;
    const listElement = listRef.current;
    if (!overflowElement || !listElement) return;

    const next = measureVisibleTabs({
      overflowElement,
      listElement,
      moreElement: moreMeasureRef.current,
      tabWidths: orderedTabs.map(tab => tab.width),
      registeredTabCount: tabs.length,
      fill,
    });
    if (next === null) return;

    setVisibleCount(prev => (prev === next ? prev : next));
  }, [fill, orderedTabs, tabs]);

  useLayoutEffect(() => {
    const overflowElement = overflowRef.current;
    const listEl = listRef.current;
    if (!overflowElement || !listEl) return;

    const constraintEl = overflowElement.parentElement ?? overflowElement;
    recompute();
    const ro = new ResizeObserver(() => recompute());
    ro.observe(overflowElement);
    ro.observe(listEl);
    if (moreMeasureRef.current) {
      ro.observe(moreMeasureRef.current);
    }
    if (constraintEl !== overflowElement) {
      ro.observe(constraintEl);
    }
    return () => {
      ro.disconnect();
    };
  }, [recompute]);

  const overflowReady = visibleCount !== null;
  const overflowItems =
    overflowReady && visibleCount < orderedTabs.length ? orderedTabs.slice(visibleCount) : [];

  const listContext = useMemo<TabsListContextValue>(
    () => ({
      variant,
      size: sizeProp,
      background: withBackground,
      fill,
      overflowReady,
      registerTab,
      updateTabWidth,
      unregisterTab,
      isTabVisible,
    }),
    [
      variant,
      sizeProp,
      withBackground,
      fill,
      overflowReady,
      registerTab,
      updateTabWidth,
      unregisterTab,
      isTabVisible,
    ],
  );

  return (
    <TabsListContext.Provider value={listContext}>
      <div
        data-slot='tabs-overflow'
        data-overflow-state={overflowReady ? 'ready' : 'pending'}
        data-variant={variant}
        data-size={sizeProp}
        ref={overflowRef}
        {...stylex.props(
          listStyles.base,
          !overflowReady && listStyles.pending,
          fill && listStyles.fill,
          variant === 'underline' ? listStyles.underline : listStyles.button,
          withBackground && listStyles.background,
          withBackground && listRadiusStyles[sizeProp],
          ...styleArray(style),
        )}
      >
        <BaseTabs.List
          data-slot='tabs-list'
          data-variant={variant}
          data-size={sizeProp}
          ref={mergeRefs(listRef, ref)}
          {...stylex.props(
            tabListStyles.base,
            fill && tabListStyles.fill,
            variant === 'underline' ? tabListStyles.underline : tabListStyles.button,
          )}
          {...props}
        >
          {children}
        </BaseTabs.List>
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
      </div>
    </TabsListContext.Provider>
  );
}

/* ---------- Tab ---------- */
export interface TabsTabProps
  extends Omit<ComponentProps<typeof BaseTabs.Tab>, 'style'>,
    BaseProps {
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const tabStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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

function tabVariantStyles(variant: TabsVariant, sizeProp: TabsSize, active: boolean) {
  if (variant === 'underline') {
    return [
      tabStyles.underline,
      underlineSizeStyles[sizeProp],
      active && tabStyles.underlineActive,
    ];
  }

  return [
    buttonStyles.base,
    buttonStyles[sizeProp],
    active ? tabStyles.buttonActive : tabStyles.buttonInactive,
  ];
}

function tabMeasureStyles(variant: TabsVariant, sizeProp: TabsSize) {
  if (variant === 'underline') {
    return [tabStyles.underline, underlineSizeStyles[sizeProp]];
  }

  return [buttonStyles.base, buttonStyles[sizeProp]];
}

function useTabIndicatorDuration({
  active,
  visible,
  tabRef,
  indicatorRectRef,
}: {
  active: boolean;
  visible: boolean;
  tabRef: RefObject<HTMLElement | null>;
  indicatorRectRef: RefObject<IndicatorPoint | null>;
}) {
  const wasActiveRef = useRef(active);
  const durationRef = useRef(0);

  if (active && !wasActiveRef.current && tabRef.current) {
    const rect = tabRef.current.getBoundingClientRect();
    const previous = indicatorRectRef.current;
    durationRef.current = previous
      ? tabIndicatorDuration(Math.hypot(rect.left - previous.left, rect.top - previous.top))
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
  }, [active, visible, indicatorRectRef, tabRef]);

  return durationRef.current;
}

function Tab({
  style,
  ref,
  children,
  label: labelProp,
  leading,
  trailing,
  value,
  disabled,
  ...props
}: TabsTabProps) {
  const { activeValue, indicatorRectRef, registerLogicalTab, unregisterLogicalTab } =
    useTabsRootContext();
  const {
    variant,
    size: sizeProp,
    fill,
    overflowReady,
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
  const label = labelProp ?? labelFromChildren(children);
  const indicatorDuration = useTabIndicatorDuration({
    active,
    visible,
    tabRef,
    indicatorRectRef,
  });

  useLayoutEffect(() => {
    return () => {
      unregisterTab(id);
      unregisterLogicalTab(id);
    };
  }, [id, unregisterLogicalTab, unregisterTab]);

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
    registerLogicalTab(id, { value, disabled });
  }, [id, value, label, children, leading, trailing, disabled, registerLogicalTab, registerTab]);

  useLayoutEffect(() => {
    const measureElement = measureRef.current;
    if (!measureElement) return;

    const measure = () => updateTabWidth(id, measureElement.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(measureElement);
    return () => observer.disconnect();
  }, [id, updateTabWidth]);

  return (
    <>
      <span
        ref={measureRef}
        aria-hidden
        data-tabs-measure-id={id}
        {...stylex.props(
          tabStyles.base,
          ...tabMeasureStyles(variant, sizeProp),
          ...styleArray(style),
          tabStyles.measure,
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
            ...tabVariantStyles(variant, sizeProp, active),
            fill && overflowReady && tabStyles.fill,
            ...styleArray(style),
          )}
          {...props}
        >
          {active && <TabIndicator duration={indicatorDuration} />}
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

function Panel({ style, ref, value, 'aria-labelledby': ariaLabelledBy, ...props }: TabsPanelProps) {
  const { activeValue, overflowLabelId } = useTabsRootContext();
  const activeOverflowLabel =
    activeValue === value && overflowLabelId ? overflowLabelId : ariaLabelledBy;

  return (
    <BaseTabs.Panel
      data-slot='tabs-panel'
      ref={ref}
      value={value}
      aria-labelledby={activeOverflowLabel}
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
