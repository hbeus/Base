import { Collapsible } from '@base-ui/react/collapsible';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { createContext, type ReactNode, type Ref, useContext, useState } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Text } from '../../typography/Text';

/* ---------- Context ---------- */

interface TreeViewContextValue {
  activeHref: string | null;
  depth: number;
}

const TreeViewContext = createContext<TreeViewContextValue>({
  activeHref: null,
  depth: 0,
});

/* ---------- Root ---------- */

export interface TreeViewRootProps extends BaseProps {
  children: ReactNode;
  activeHref?: string | null;
  ref?: Ref<HTMLElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
});

function Root({ children, activeHref, style, ref }: TreeViewRootProps) {
  return (
    <TreeViewContext.Provider value={{ activeHref: activeHref ?? null, depth: 0 }}>
      <nav ref={ref} {...stylex.props(rootStyles.base, ...styleArray(style))}>
        {children}
      </nav>
    </TreeViewContext.Provider>
  );
}

/* ---------- Group ---------- */

export interface TreeViewGroupProps extends BaseProps {
  children: ReactNode;
  label: ReactNode;
  defaultOpen?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const groupStyles = stylex.create({
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    width: '100%',
    cursor: 'pointer',
    paddingBlock: spacing.s4,
    paddingInline: spacing.s8,
    borderRadius: radii.r6,
    color: colors.foregroundSecondary,
    transition: 'color 0.15s, background-color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: colors.lighten4,
    },
  },
  chevron: {
    display: 'flex',
    flexShrink: 0,
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
    paddingLeft: spacing.s16,
  },
});

function Group({ label, children, defaultOpen = false, style, ref }: TreeViewGroupProps) {
  const { activeHref, depth } = useContext(TreeViewContext);
  const [open, setOpen] = useState(defaultOpen);

  return (
    <TreeViewContext.Provider value={{ activeHref, depth: depth + 1 }}>
      <Collapsible.Root
        ref={ref}
        open={open}
        onOpenChange={setOpen}
        {...stylex.props(...styleArray(style))}
      >
        <Collapsible.Trigger {...stylex.props(groupStyles.trigger)}>
          <motion.span
            {...stylex.props(groupStyles.chevron)}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <IconChevronRight size={14} />
          </motion.span>
          <Text size='bodySm' color='inherit' weight='medium'>
            {label}
          </Text>
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <motion.div
            initial={false}
            animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div {...stylex.props(groupStyles.children)}>{children}</div>
          </motion.div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </TreeViewContext.Provider>
  );
}

/* ---------- Item ---------- */

export interface TreeViewItemProps extends BaseProps {
  children: ReactNode;
  href: string;
  ref?: Ref<HTMLAnchorElement>;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const itemStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingBlock: spacing.s4,
    paddingInline: spacing.s8,
    borderRadius: radii.r6,
    textDecoration: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.15s, background-color 0.15s',
    ':hover': {
      color: colors.foregroundPrimary,
      backgroundColor: colors.lighten4,
    },
  },
  active: {
    color: colors.foregroundPrimary,
    backgroundColor: colors.lighten4,
  },
});

function Item({ children, href, style, ref, onClick }: TreeViewItemProps) {
  const { activeHref } = useContext(TreeViewContext);
  const isActive = activeHref === href;

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      {...stylex.props(itemStyles.base, isActive && itemStyles.active, ...styleArray(style))}
    >
      <Text size='bodySm' color='inherit'>
        {children}
      </Text>
    </a>
  );
}

/* ---------- Export ---------- */

export const TreeView = {
  Root,
  Group,
  Item,
};
