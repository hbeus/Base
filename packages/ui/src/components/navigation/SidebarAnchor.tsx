import * as stylex from '@stylexjs/stylex';
import { motion } from 'motion/react';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { spacing } from '../../tokens/spacing.stylex';
import { colors } from '../../tokens/themes.stylex';
import { zIndex } from '../../tokens/zIndex.stylex';
import type { BaseProps } from '../../types/BaseProps';
import { styleArray } from '../../utils/styleArray';

export interface SidebarAnchorProps
  extends Omit<ComponentPropsWithoutRef<'a'>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  children: React.ReactNode;
}

const styles = stylex.create({
  base: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: spacing.s4,
    top: 0,
    left: 0,
    paddingBlock: spacing.s16,
    paddingInline: spacing.s16,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: zIndex.fixed,
  },
});

export function SidebarAnchor({ href, children, style, ref, ...props }: SidebarAnchorProps) {
  return (
    <ul {...stylex.props(styles.base, ...styleArray(style))}>
      <motion.li>
        <a href={href} {...props}>
          {children}
        </a>
      </motion.li>
    </ul>
  );
}
