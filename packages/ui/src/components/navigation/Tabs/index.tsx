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
import { Tooltip } from '../../overlays/Tooltip';

type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
type TabsVariant = 'underline' | 'button';
type TabValue = ComponentProps<typeof BaseTabs.Tab>['value'];

interface MenuChrome {
  triggerId: string;
  values: ReadonlySet<TabValue>;
}

const INDICATOR_TRANSITION = { type: 'spring', bounce: 0.15, duration: 0.4 } as const;

/* ---------- Contexts ---------- */

interface TabsRootContextValue {
  activeValue: TabValue;
  indicatorLayoutId: string;
  layoutGroupId: string;
  fill: boolean;
  setActive: (value: TabValue) => void;
  setMenuChrome: (chrome: MenuChrome | null) => void;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fill: boolean;
}

const TabsRootContext = createContext<TabsRootContextValue | null>(null);
const TabsListContext = createContext<TabsListContextValue | null>(null);
const MenuChromeContext = createContext<MenuChrome | null>(null);

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
  extends Omit<ComponentProps<typeof BaseTabs.Root>, 'style' | 'onValueChange'>,
    BaseProps {
  fill?: boolean;
  onValueChange?: (value: TabValue) => void;
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
  const [menuChrome, setMenuChrome] = useState<MenuChrome | null>(null);
  const activeValue = controlled ? value : uncontrolledValue;

  const setActive = useCallback(
    (next: TabValue) => {
      onValueChangeRef.current?.(next);
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
      setActive,
      setMenuChrome,
    }),
    [activeValue, layoutGroupId, fill, setActive],
  );

  return (
    <TabsRootContext.Provider value={rootContext}>
      <MenuChromeContext.Provider value={menuChrome}>
        <BaseTabs.Root
          data-slot='tabs'
          ref={ref}
          value={activeValue}
          onValueChange={(next, details) => {
            if (details.reason === 'missing' || details.isCanceled) {
              return;
            }
            setActive(next);
          }}
          {...stylex.props(rootStyles.base, fill && rootStyles.fill, ...styleArray(style))}
          {...props}
        >
          {children}
        </BaseTabs.Root>
      </MenuChromeContext.Provider>
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
  tooltipTrigger: {
    display: 'inline-flex',
    flexShrink: 0,
    width: 'fit-content',
  },
  check: {
    marginInlineStart: 'auto',
    color: colors.foregroundSecondary,
  },
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

function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  if (isValidElement<{ children?: ReactNode }>(node) && node.props.children != null) {
    return getNodeText(node.props.children);
  }
  return '';
}

function TabsMenu({ children, label, style, ref }: TabsMenuProps) {
  const { activeValue, setActive, setMenuChrome } = useTabsRootContext();
  const { variant, size } = useTabsListContext();
  const triggerId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    const items: { value: TabValue; title: string; disabled?: boolean }[] = [];
    Children.forEach(children, child => {
      if (!isValidElement(child) || child.type !== TabsMenuItem) {
        return;
      }
      const item = child as ReactElement<TabsMenuItemProps>;
      items.push({
        value: item.props.value,
        title: getNodeText(item.props.children).trim(),
        disabled: item.props.disabled,
      });
    });
    return items;
  }, [children]);

  const menuValues = useMemo(() => new Set(menuItems.map(item => item.value)), [menuItems]);
  const activeInMenu = menuValues.has(activeValue);
  const activeTitle = menuItems.find(item => item.value === activeValue)?.title;
  const fallbackLabel = label ?? 'More tabs';
  const triggerLabel =
    activeInMenu && activeTitle != null && activeTitle !== '' ? activeTitle : fallbackLabel;

  useLayoutEffect(() => {
    setMenuChrome({ triggerId, values: menuValues });
    return () => setMenuChrome(null);
  }, [menuValues, setMenuChrome, triggerId]);

  const hiddenTabs = menuItems.map(item => (
    <BaseTabs.Tab
      key={String(item.value)}
      value={item.value}
      disabled={item.disabled}
      tabIndex={-1}
      aria-hidden
      {...stylex.props(menuStyles.hiddenTab)}
    />
  ));

  return (
    <>
      {hiddenTabs}
      <Tooltip.Provider>
        <Menu.Root onOpenChange={setMenuOpen}>
          <Tooltip.Root disabled={menuOpen}>
            <Tooltip.Trigger render={<span {...stylex.props(menuStyles.tooltipTrigger)} />}>
              <Menu.Trigger
                data-slot='tabs-menu'
                data-active={activeInMenu ? '' : undefined}
                id={triggerId}
                aria-label={triggerLabel}
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
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner side='top' sideOffset={4}>
                <Tooltip.Popup>
                  {triggerLabel}
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <Menu.Portal>
            <Menu.Positioner align='end' sideOffset={4}>
              <Menu.Popup>
                <Menu.RadioGroup value={activeValue} onValueChange={setActive}>
                  {children}
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </Tooltip.Provider>
    </>
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
  extends Omit<ComponentProps<typeof BaseTabs.Panel>, 'style' | 'children'>,
    BaseProps {
  children?: ReactNode;
}

/** Declarative descriptor — props are read by `Tabs.Panels`. */
function Panel(_props: TabsPanelProps) {
  return null;
}

/* ---------- Panels ---------- */

export interface TabsPanelsProps extends BaseProps {
  children: ReactNode;
}

const panelsStyles = stylex.create({
  root: {
    position: 'relative',
    minWidth: 0,
    paddingTop: spacing.s16,
  },
  shell: {
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

function isTabsPanel(child: ReactNode): child is ReactElement<TabsPanelProps> {
  return isValidElement(child) && child.type === Panel;
}

function Panels({ style, children }: TabsPanelsProps) {
  const { activeValue } = useTabsRootContext();
  const menuChrome = useContext(MenuChromeContext);

  const items = Children.toArray(children).filter(isTabsPanel);
  const active = items.find(item => item.props.value === activeValue);

  return (
    <div data-slot='tabs-panels' {...stylex.props(panelsStyles.root, ...styleArray(style))}>
      {items.map(item => {
        const {
          value,
          children: _content,
          keepMounted,
          style: panelStyle,
          ref,
          'aria-labelledby': ariaLabelledBy,
          ...panelProps
        } = item.props;

        const labelledBy =
          activeValue === value && menuChrome?.values.has(value)
            ? menuChrome.triggerId
            : ariaLabelledBy;

        return (
          <BaseTabs.Panel
            key={String(value)}
            data-slot='tabs-panel'
            ref={ref}
            value={value}
            keepMounted={keepMounted ?? true}
            aria-labelledby={labelledBy}
            {...stylex.props(panelsStyles.shell, ...styleArray(panelStyle))}
            {...panelProps}
          />
        );
      })}
      <AnimatePresence mode='popLayout' initial={false}>
        {active != null && (
          <motion.div
            key={String(active.props.value)}
            layout='position'
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{
              opacity: 0,
              filter: 'blur(5px)',
              transition: { duration: 0.15 },
            }}
          >
            {active.props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Export ---------- */

export const Tabs = {
  Root,
  List,
  Tab,
  Menu: TabsMenu,
  MenuItem: TabsMenuItem,
  Panels,
  Panel,
};
