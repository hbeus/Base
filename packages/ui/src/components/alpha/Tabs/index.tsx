import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconDots } from '@tabler/icons-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactElement,
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
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Icon } from '../../display/Icon';
import { buttonStyles } from '../../input/Button';
import { Menu } from '../../overlays/Menu';

type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
type TabsVariant = 'underline' | 'button';
type TabValue = ComponentProps<typeof BaseTabs.Tab>['value'];

const INDICATOR_TRANSITION = { type: 'spring', bounce: 0.15, duration: 0.4 } as const;

/* ---------- Contexts ---------- */

interface TabsRootContextValue {
  activeValue: TabValue;
  indicatorLayoutId: string;
  layoutGroupId: string;
  fill: boolean;
  menuLabelId: string | undefined;
  selectValue: (value: TabValue) => void;
  setMenuLabelId: (id: string | undefined) => void;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fill: boolean;
}

interface TabsMenuContextValue {
  registerValue: (value: TabValue) => void;
  unregisterValue: (value: TabValue) => void;
}

const TabsRootContext = createContext<TabsRootContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue | null>(null);
const TabsMenuContext = createContext<TabsMenuContextValue | null>(null);

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

/* ---------- Indicator ---------- */

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

function ActiveIndicator({ variant, size }: { variant: TabsVariant; size: TabsSize }) {
  const { indicatorLayoutId } = useTabsRootContext();

  return (
    <motion.span
      aria-hidden
      data-slot='tabs-indicator'
      layoutId={indicatorLayoutId}
      transition={INDICATOR_TRANSITION}
      {...stylex.props(
        indicatorStyles.base,
        variant === 'underline' ? indicatorStyles.underline : indicatorStyles.button,
        variant === 'button' && indicatorRadiusStyles[size],
      )}
    />
  );
}

/* ---------- Root ---------- */

export interface TabsRootProps
  extends Omit<ComponentProps<typeof BaseTabs.Root>, 'style'>,
    BaseProps {
  /** Stretch the root and equal-width tab items to fill the parent. */
  fill?: boolean;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  fill: {
    width: '100%',
    alignSelf: 'stretch',
  },
  // Stack panels in one cell so enter/exit never sum heights.
  panelStack: {
    display: 'grid',
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
  fill = false,
  ...props
}: TabsRootProps) {
  const layoutGroupId = useId();
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const controlled = value !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState<TabValue>(() =>
    defaultValue === undefined ? 0 : defaultValue,
  );
  const [menuLabelId, setMenuLabelId] = useState<string>();
  const activeValue = controlled ? value : uncontrolledValue;

  const selectValue = useCallback(
    (next: TabValue) => {
      onValueChangeRef.current?.(next, {
        reason: 'none',
        event: new Event('tabs-value-change'),
        cancel() {},
        allowPropagation() {},
        isCanceled: false,
        isPropagationAllowed: false,
        trigger: undefined,
        activationDirection: 'none',
      } as Parameters<NonNullable<ComponentProps<typeof BaseTabs.Root>['onValueChange']>>[1]);
      if (!controlled) {
        setUncontrolledValue(next);
      }
    },
    [controlled],
  );

  const rootContext = useMemo<TabsRootContextValue>(
    () => ({
      activeValue,
      layoutGroupId,
      indicatorLayoutId: `${layoutGroupId}-indicator`,
      fill,
      menuLabelId,
      selectValue,
      setMenuLabelId,
    }),
    [activeValue, layoutGroupId, fill, menuLabelId, selectValue],
  );

  const childArray = Children.toArray(children);
  const panels: ReactNode[] = [];
  const rest: ReactNode[] = [];
  for (const child of childArray) {
    if (isValidElement(child) && child.type === Panel) {
      panels.push(child);
    } else {
      rest.push(child);
    }
  }

  return (
    <TabsRootContext.Provider value={rootContext}>
      <BaseTabs.Root
        data-slot='tabs'
        ref={ref}
        value={activeValue}
        onValueChange={(next, details) => {
          // Menu-only values have no visible Tab; ignore Base UI's missing-tab fallback.
          if (details.reason === 'missing') {
            return;
          }
          onValueChangeRef.current?.(next, details);
          if (!controlled && !details.isCanceled) {
            setUncontrolledValue(next);
          }
        }}
        {...stylex.props(rootStyles.base, fill && rootStyles.fill, ...styleArray(style))}
        {...props}
      >
        {rest}
        {panels.length > 0 && <div {...stylex.props(rootStyles.panelStack)}>{panels}</div>}
      </BaseTabs.Root>
    </TabsRootContext.Provider>
  );
}

/* ---------- List ---------- */

export interface TabsListProps
  extends Omit<ComponentProps<typeof BaseTabs.List>, 'style'>,
    BaseProps {
  variant?: TabsVariant;
  size?: TabsSize;
}

const listStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minWidth: 0,
  },
  fill: {
    width: '100%',
    alignSelf: 'stretch',
  },
  button: {
    gap: spacing.s4,
  },
});

function List({
  style,
  ref,
  children,
  variant = 'underline',
  size = 'md',
  ...props
}: TabsListProps) {
  const { layoutGroupId, fill } = useTabsRootContext();
  const listContext = useMemo<TabsListContextValue>(
    () => ({ variant, size, fill }),
    [variant, size, fill],
  );

  return (
    <TabsListContext.Provider value={listContext}>
      {/* Scope shared layout to the tab list only — panel height must not disturb layoutId. */}
      <LayoutGroup id={layoutGroupId}>
        <BaseTabs.List
          data-slot='tabs-list'
          data-variant={variant}
          data-size={size}
          ref={ref}
          {...stylex.props(
            listStyles.base,
            fill && listStyles.fill,
            variant === 'button' && listStyles.button,
            ...styleArray(style),
          )}
          {...props}
        >
          {children}
        </BaseTabs.List>
      </LayoutGroup>
    </TabsListContext.Provider>
  );
}

/* ---------- Tab ---------- */

export interface TabsTabProps
  extends Omit<ComponentProps<typeof BaseTabs.Tab>, 'style'>,
    BaseProps {}

const tabStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontWeight: 500,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s',
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
    backgroundColor: 'transparent',
    color: colors.buttonPrimaryFg,
    ':hover': {
      backgroundColor: 'transparent',
      color: colors.buttonPrimaryFg,
    },
  },
  label: {
    position: 'relative',
    zIndex: 1,
  },
  fill: {
    flex: 1,
    width: '100%',
    minWidth: 0,
  },
});

const underlineSizeStyles = {
  xs: tabStyles.underlineXs,
  sm: tabStyles.underlineSm,
  md: tabStyles.underlineMd,
  lg: tabStyles.underlineLg,
} as const;

function Tab({ style, ref, children, value, disabled, ...props }: TabsTabProps) {
  const { activeValue } = useTabsRootContext();
  const { variant, size, fill } = useTabsListContext();
  const active = activeValue === value;

  return (
    <BaseTabs.Tab
      data-slot='tabs-tab'
      ref={ref}
      value={value}
      disabled={disabled}
      {...stylex.props(
        tabStyles.base,
        ...(variant === 'underline'
          ? [tabStyles.underline, underlineSizeStyles[size], active && tabStyles.underlineActive]
          : [
              buttonStyles.base,
              buttonStyles[size],
              active ? tabStyles.buttonActive : tabStyles.buttonInactive,
            ]),
        fill && tabStyles.fill,
        ...styleArray(style),
      )}
      {...props}
    >
      <span {...stylex.props(tabStyles.label)}>{children}</span>
      {active && <ActiveIndicator variant={variant} size={size} />}
    </BaseTabs.Tab>
  );
}

/* ---------- Menu ---------- */

export interface TabsMenuProps extends BaseProps {
  children: ReactNode;
  label?: string;
  ref?: RefObject<HTMLButtonElement | null>;
}

const menuStyles = stylex.create({
  trigger: {
    position: 'relative',
    // Never grow under fill — stay intrinsic width.
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: 'transparent',
    },
  },
  triggerActiveUnderline: {
    color: colors.foregroundPrimary,
  },
  triggerActiveButton: {
    color: colors.buttonPrimaryFg,
    ':hover': {
      color: colors.buttonPrimaryFg,
      backgroundColor: 'transparent',
    },
  },
  triggerContent: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    marginInlineStart: 'auto',
    color: colors.foregroundSecondary,
  },
  // Keep Base UI aware of menu-only values without showing extra tabs.
  hiddenTab: {
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden',
    padding: 0,
    borderWidth: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
});

function TabsMenu({ children, label, style, ref }: TabsMenuProps) {
  const { activeValue, selectValue, setMenuLabelId } = useTabsRootContext();
  const { variant, size } = useTabsListContext();
  const triggerId = useId();
  const valuesRef = useRef(new Set<TabValue>());
  const [, rerender] = useState(0);

  const activeInMenu = valuesRef.current.has(activeValue);

  useLayoutEffect(() => {
    setMenuLabelId(activeInMenu ? triggerId : undefined);
    return () => setMenuLabelId(undefined);
  }, [activeInMenu, setMenuLabelId, triggerId]);

  const registerValue = useCallback((menuValue: TabValue) => {
    valuesRef.current.add(menuValue);
    rerender(n => n + 1);
  }, []);

  const unregisterValue = useCallback((menuValue: TabValue) => {
    valuesRef.current.delete(menuValue);
    rerender(n => n + 1);
  }, []);

  const menuContext = useMemo<TabsMenuContextValue>(
    () => ({ registerValue, unregisterValue }),
    [registerValue, unregisterValue],
  );

  const hiddenTabs = Children.map(children, child => {
    if (!isValidElement(child) || child.type !== TabsMenuItem) {
      return null;
    }
    const item = child as ReactElement<TabsMenuItemProps>;
    return (
      <BaseTabs.Tab
        key={String(item.props.value)}
        value={item.props.value}
        disabled={item.props.disabled}
        tabIndex={-1}
        aria-hidden
        {...stylex.props(menuStyles.hiddenTab)}
      />
    );
  });

  return (
    <TabsMenuContext.Provider value={menuContext}>
      {hiddenTabs}
      <Menu.Root>
        <Menu.Trigger
          data-slot='tabs-menu'
          data-active={activeInMenu ? '' : undefined}
          id={triggerId}
          aria-label={label ?? 'More tabs'}
          ref={ref}
          render={
            <button
              type='button'
              {...stylex.props(
                menuStyles.trigger,
                buttonStyles[size],
                activeInMenu && variant === 'underline' && menuStyles.triggerActiveUnderline,
                activeInMenu && variant === 'button' && menuStyles.triggerActiveButton,
                ...styleArray(style),
              )}
            />
          }
        >
          <span {...stylex.props(menuStyles.triggerContent)}>
            <Icon icon={IconDots} />
          </span>
          {activeInMenu && <ActiveIndicator variant={variant} size={size} />}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align='end' sideOffset={4}>
            <Menu.Popup>
              <Menu.RadioGroup
                value={activeValue}
                onValueChange={next => {
                  selectValue(next);
                }}
              >
                {children}
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </TabsMenuContext.Provider>
  );
}

/* ---------- MenuItem ---------- */

export interface TabsMenuItemProps extends BaseProps {
  value: TabValue;
  children: ReactNode;
  disabled?: boolean;
  ref?: RefObject<HTMLElement | null>;
}

function TabsMenuItem({ value, children, disabled, style, ref }: TabsMenuItemProps) {
  const menuCtx = useContext(TabsMenuContext);

  useLayoutEffect(() => {
    menuCtx?.registerValue(value);
    return () => menuCtx?.unregisterValue(value);
  }, [value, menuCtx]);

  return (
    <Menu.RadioItem
      data-slot='tabs-menu-item'
      value={value}
      disabled={disabled}
      ref={ref}
      {...stylex.props(...styleArray(style))}
    >
      {children}
      <Menu.RadioItemIndicator {...stylex.props(menuStyles.check)}>
        <Icon icon={IconCheck} size={14} />
      </Menu.RadioItemIndicator>
    </Menu.RadioItem>
  );
}

/* ---------- Panel ---------- */

export interface TabsPanelProps
  extends Omit<ComponentProps<typeof BaseTabs.Panel>, 'style'>,
    BaseProps {}

const panelStyles = stylex.create({
  base: {
    gridArea: '1 / 1',
    minWidth: 0,
    outline: 'none',
    // Keep laid out while AnimatePresence plays exit (Base UI sets native `hidden`).
    display: {
      default: 'block',
      ':is([hidden])': 'block',
    },
  },
  content: {
    paddingTop: spacing.s16,
  },
});

function Panel({
  style,
  ref,
  value,
  children,
  keepMounted,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TabsPanelProps) {
  const { activeValue, menuLabelId } = useTabsRootContext();
  const isActive = activeValue === value;
  const labelledBy = isActive && menuLabelId ? menuLabelId : ariaLabelledBy;

  return (
    <BaseTabs.Panel
      data-slot='tabs-panel'
      ref={ref}
      value={value}
      keepMounted={keepMounted ?? true}
      aria-labelledby={labelledBy}
      {...stylex.props(panelStyles.base, ...styleArray(style))}
      {...props}
    >
      <AnimatePresence mode='wait' initial={false}>
        {isActive && (
          <motion.div
            key={String(value)}
            layout='position'
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{
              opacity: 0,
              filter: 'blur(5px)',
              transition: { duration: 0.15 },
            }}
            {...stylex.props(panelStyles.content)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseTabs.Panel>
  );
}

/* ---------- Export ---------- */

export const Tabs = {
  Root,
  List,
  Tab,
  Menu: TabsMenu,
  MenuItem: TabsMenuItem,
  Panel,
};
