import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { buttonStyles } from '../../input/Button';
import {
  type MenuTriggerLabel,
  MenuTriggerLabelContext,
  TabsListContext,
  type TabsListContextValue,
  TabsRootContext,
  type TabsRootContextValue,
  type TabsSize,
  type TabsVariant,
  type TabValue,
  useTabsListContext,
  useTabsRootContext,
} from './context';
import { ActiveIndicator } from './indicator';
import { TabsMenu, TabsMenuItem, type TabsMenuItemProps, type TabsMenuProps } from './menu';

export type { TabsMenuItemProps, TabsMenuProps };

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
  // Menu publishes trigger id + menu values; Panels read for aria-labelledby.
  const [menuTriggerLabel, setMenuTriggerLabel] = useState<MenuTriggerLabel | null>(null);
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
      setMenuTriggerLabel,
    }),
    [activeValue, layoutGroupId, fill, setActive],
  );

  return (
    <TabsRootContext.Provider value={rootContext}>
      <MenuTriggerLabelContext.Provider value={menuTriggerLabel}>
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
      </MenuTriggerLabelContext.Provider>
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
  const menuTriggerLabel = useContext(MenuTriggerLabelContext);

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

        // When the active value lives in the menu, label the panel from the menu trigger.
        const labelledBy =
          activeValue === value && menuTriggerLabel?.values.has(value)
            ? menuTriggerLabel.triggerId
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
