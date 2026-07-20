import * as stylex from '@stylexjs/stylex';
import { createContext, type ReactNode, type Ref, useContext, useState } from 'react';
import { breakpoints } from '../../../tokens/breakpoints.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { zIndex } from '../../../tokens/zIndex.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';
import { Text } from '../../typography/Text';

/* ---------- Config ---------- */

const CONFIG = {
  barBaseWidth: 8, // px — resting bar width
  barMaxWidth: 16, // px — active bar width
};

/* ---------- Context ---------- */

type SidebarPosition = 'left' | 'right';

interface SidebarContextValue {
  activeId: string | null;
  position: SidebarPosition;
  onNavigate?: (hash: string) => void;
}

const SidebarContext = createContext<SidebarContextValue>({ activeId: null, position: 'left' });

/* ---------- Root ---------- */

export interface SidebarRootProps extends BaseProps {
  children: ReactNode;
  activeId?: string | null;
  position?: SidebarPosition;
  onNavigate?: (hash: string) => void;
}

const rootStyles = stylex.create({
  base: {
    position: 'fixed',
    display: {
      default: 'flex',
      [breakpoints.md]: 'none',
    },
    justifyContent: 'center',
    flexDirection: 'column',
    gap: spacing.s4,
    top: 0,
    paddingBlock: spacing.s16,
    paddingInline: spacing.s16,
    width: 'fit-content',
    height: '100%',
    zIndex: zIndex.fixed,
    listStyle: 'none',
    margin: 0,
  },
  left: {
    left: 0,
    alignItems: 'flex-start',
  },
  right: {
    right: 0,
    alignItems: 'flex-end',
  },
});

function Root({ children, activeId, position = 'left', onNavigate, style }: SidebarRootProps) {
  return (
    <SidebarContext.Provider value={{ activeId: activeId ?? null, position, onNavigate }}>
      <ul {...stylex.props(rootStyles.base, rootStyles[position], ...styleArray(style))}>
        {children}
      </ul>
    </SidebarContext.Provider>
  );
}

/* ---------- Anchor ---------- */

export interface SidebarAnchorProps extends BaseProps {
  ref?: Ref<HTMLAnchorElement>;
  id: string;
  href: string;
  children?: ReactNode;
}

const anchorStyles = stylex.create({
  item: {
    pointerEvents: 'auto',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    textDecoration: 'none',
    color: colors.foregroundSecondary,
    transition: 'color 0.2s',
    flexDirection: 'row',
  },
  linkRight: {
    flexDirection: 'row-reverse',
  },
  linkActive: {
    color: colors.foregroundPrimary,
  },
  bar: {
    flexShrink: 0,
    height: size.s2,
    borderRadius: radii.full,
    backgroundColor: 'currentcolor',
    transition: 'width 0.2s',
    width: `${CONFIG.barBaseWidth}px`,
  },
  barActive: {
    width: `${CONFIG.barMaxWidth}px`,
  },
});

function Anchor({ id, href, children, style, ref }: SidebarAnchorProps) {
  const { activeId, position, onNavigate } = useContext(SidebarContext);
  const isActive = activeId === id;
  const [hovered, setHovered] = useState(false);
  const expanded = isActive || hovered;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = href.startsWith('#') ? href.slice(1) : undefined;
    if (!hash) return;

    e.preventDefault();

    if (onNavigate) {
      onNavigate(hash);
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', href);
    }
  };

  return (
    <li {...stylex.props(anchorStyles.item, ...styleArray(style))}>
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...stylex.props(
          anchorStyles.link,
          position === 'right' && anchorStyles.linkRight,
          expanded && anchorStyles.linkActive,
        )}
      >
        <span {...stylex.props(anchorStyles.bar, expanded && anchorStyles.barActive)} />
        <Text color='inherit'>{children}</Text>
      </a>
    </li>
  );
}

/* ---------- Export ---------- */

export const Sidebar = {
  Root,
  Anchor,
};
