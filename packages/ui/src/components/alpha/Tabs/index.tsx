import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useId,
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
import { buttonStyles } from '../../input/Button';

type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
type TabsVariant = 'underline' | 'button';
type TabValue = ComponentProps<typeof BaseTabs.Tab>['value'];

/* ---------- Contexts ---------- */

interface TabsRootContextValue {
  activeValue: TabValue;
  indicatorLayoutId: string;
  layoutGroupId: string;
}

interface TabsListContextValue {
  variant: TabsVariant;
  size: TabsSize;
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
  ...props
}: TabsRootProps) {
  const layoutGroupId = useId();
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const controlled = value !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState<TabValue>(() =>
    defaultValue === undefined ? 0 : defaultValue,
  );
  const activeValue = controlled ? value : uncontrolledValue;

  const rootContext = useMemo<TabsRootContextValue>(
    () => ({
      activeValue,
      layoutGroupId,
      indicatorLayoutId: `${layoutGroupId}-indicator`,
    }),
    [activeValue, layoutGroupId],
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
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next, details) => {
          onValueChangeRef.current?.(next, details);
          if (!controlled && !details.isCanceled) {
            setUncontrolledValue(next);
          }
        }}
        {...stylex.props(rootStyles.base, ...styleArray(style))}
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
  const { layoutGroupId } = useTabsRootContext();
  const listContext = useMemo<TabsListContextValue>(() => ({ variant, size }), [variant, size]);

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

function Tab({ style, ref, children, value, disabled, ...props }: TabsTabProps) {
  const { activeValue, indicatorLayoutId } = useTabsRootContext();
  const { variant, size } = useTabsListContext();
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
        ...styleArray(style),
      )}
      {...props}
    >
      <span {...stylex.props(tabStyles.label)}>{children}</span>
      {active && (
        <motion.span
          aria-hidden
          data-slot='tabs-indicator'
          layoutId={indicatorLayoutId}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
          {...stylex.props(
            indicatorStyles.base,
            variant === 'underline' ? indicatorStyles.underline : indicatorStyles.button,
            variant === 'button' && indicatorRadiusStyles[size],
          )}
        />
      )}
    </BaseTabs.Tab>
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

function Panel({ style, ref, value, children, keepMounted, ...props }: TabsPanelProps) {
  const { activeValue } = useTabsRootContext();
  const isActive = activeValue === value;

  return (
    <BaseTabs.Panel
      data-slot='tabs-panel'
      ref={ref}
      value={value}
      keepMounted={keepMounted ?? true}
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
  Panel,
};
