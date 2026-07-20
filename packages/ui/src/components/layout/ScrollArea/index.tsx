import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface ScrollAreaRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseScrollArea.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    overflow: 'hidden',
  },
});

function Root({ style, ref, ...props }: ScrollAreaRootProps) {
  return (
    <BaseScrollArea.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Viewport ---------- */
export interface ScrollAreaViewportProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const viewportStyles = stylex.create({
  base: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: '100%',
    width: '100%',
  },
});

function Viewport({ style, ref, ...props }: ScrollAreaViewportProps) {
  return (
    <BaseScrollArea.Viewport
      ref={ref}
      {...stylex.props(viewportStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
function Content(props: ComponentPropsWithoutRef<typeof BaseScrollArea.Content>) {
  return <BaseScrollArea.Content {...props} />;
}

/* ---------- Scrollbar ---------- */
export interface ScrollAreaScrollbarProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const scrollbarStyles = stylex.create({
  base: {
    display: 'flex',
    touchAction: 'none',
    userSelect: 'none',
    padding: size.s1,
    transition: 'opacity 0.2s',
  },
  vertical: {
    width: size.s8,
  },
  horizontal: {
    flexDirection: 'column',
    height: size.s8,
  },
});

function Scrollbar({ style, ref, ...props }: ScrollAreaScrollbarProps) {
  const orientation = props.orientation ?? 'vertical';
  return (
    <BaseScrollArea.Scrollbar
      ref={ref}
      {...stylex.props(scrollbarStyles.base, scrollbarStyles[orientation], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Thumb ---------- */
export interface ScrollAreaThumbProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const thumbStyles = stylex.create({
  base: {
    flex: 1,
    borderRadius: radii.full,
    backgroundColor: colors.lighten16,
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.lighten16,
    },
  },
});

function Thumb({ style, ref, ...props }: ScrollAreaThumbProps) {
  return (
    <BaseScrollArea.Thumb
      ref={ref}
      {...stylex.props(thumbStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Corner ---------- */
function Corner(props: ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>) {
  return <BaseScrollArea.Corner {...props} />;
}

/* ---------- Export ---------- */
export const ScrollArea = {
  Root,
  Viewport,
  Content,
  Scrollbar,
  Thumb,
  Corner,
};
