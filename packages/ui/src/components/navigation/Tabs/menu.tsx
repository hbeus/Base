import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconDots } from '@tabler/icons-react';
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Icon } from '../../display/Icon';
import { buttonStyles } from '../../input/Button';
import { Menu } from '../../overlays/Menu';
import { Tooltip } from '../../overlays/Tooltip';
import { type TabValue, useTabsListContext, useTabsRootContext } from './context';
import { ActiveIndicator } from './indicator';

export interface TabsMenuProps extends BaseProps {
  children: ReactNode;
  label?: string;
  ref?: RefObject<HTMLButtonElement | null>;
}

export interface TabsMenuItemProps extends BaseProps {
  value: TabValue;
  /** Plain text used for the trigger tooltip and aria-label when this item is active. */
  children: ReactNode;
  disabled?: boolean;
  ref?: RefObject<HTMLElement | null>;
}

interface MenuItemData {
  value: TabValue;
  title: string;
  disabled?: boolean;
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
  // Span host: nested Tooltip.Trigger → Menu.Trigger render composition does not
  // forward hover handlers onto the button through our Menu.Trigger wrapper.
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

/** Plain string/number children only (no element recursion). */
function getPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }
  return '';
}

function useMenuItems(children: ReactNode, label: string | undefined) {
  const { activeValue } = useTabsRootContext();

  const items = useMemo(() => {
    const next: MenuItemData[] = [];
    Children.forEach(children, child => {
      if (!isValidElement(child) || child.type !== TabsMenuItem) {
        return;
      }
      const item = child as ReactElement<TabsMenuItemProps>;
      next.push({
        value: item.props.value,
        title: getPlainText(item.props.children).trim(),
        disabled: item.props.disabled,
      });
    });
    return next;
  }, [children]);

  const values = useMemo(() => new Set(items.map(item => item.value)), [items]);
  const activeInMenu = values.has(activeValue);
  const activeTitle = items.find(item => item.value === activeValue)?.title;
  const fallbackLabel = label ?? 'More tabs';
  const triggerLabel =
    activeInMenu && activeTitle != null && activeTitle !== '' ? activeTitle : fallbackLabel;

  return { items, values, activeInMenu, triggerLabel };
}

function MenuHiddenTabs({ items }: { items: MenuItemData[] }) {
  return items.map(item => (
    <BaseTabs.Tab
      key={String(item.value)}
      value={item.value}
      disabled={item.disabled}
      tabIndex={-1}
      aria-hidden
      {...stylex.props(menuStyles.hiddenTab)}
    />
  ));
}

function MenuTrigger({
  activeInMenu,
  triggerId,
  triggerLabel,
  style,
  ref,
}: {
  activeInMenu: boolean;
  triggerId: string;
  triggerLabel: string;
  style: TabsMenuProps['style'];
  ref: TabsMenuProps['ref'];
}) {
  const { variant, size } = useTabsListContext();

  // Keep span host: Tooltip.Trigger + Menu.Trigger render-function merge onto one
  // <button> drops hover/click handlers through our Menu.Trigger wrapper.
  return (
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
  );
}

function MenuPopup({ children }: { children: ReactNode }) {
  const { activeValue, setActive } = useTabsRootContext();

  return (
    <Menu.Portal>
      <Menu.Positioner align='end' sideOffset={4}>
        <Menu.Popup>
          <Menu.RadioGroup value={activeValue} onValueChange={setActive}>
            {children}
          </Menu.RadioGroup>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export function TabsMenu({ children, label, style, ref }: TabsMenuProps) {
  const { setMenuTriggerLabel } = useTabsRootContext();
  const triggerId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, values, activeInMenu, triggerLabel } = useMenuItems(children, label);

  // Publish trigger id + menu values for Panels aria-labelledby when a menu value is active.
  useLayoutEffect(() => {
    setMenuTriggerLabel({ triggerId, values });
    return () => setMenuTriggerLabel(null);
  }, [values, setMenuTriggerLabel, triggerId]);

  return (
    <>
      <MenuHiddenTabs items={items} />
      <Tooltip.Provider>
        <Menu.Root onOpenChange={setMenuOpen}>
          <Tooltip.Root disabled={menuOpen}>
            <MenuTrigger
              activeInMenu={activeInMenu}
              triggerId={triggerId}
              triggerLabel={triggerLabel}
              style={style}
              ref={ref}
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side='top' sideOffset={4}>
                <Tooltip.Popup>
                  {triggerLabel}
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
          <MenuPopup>{children}</MenuPopup>
        </Menu.Root>
      </Tooltip.Provider>
    </>
  );
}

export function TabsMenuItem({ value, children, disabled, style, ref }: TabsMenuItemProps) {
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
