import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface ScrollAreaRootProps
  extends Omit<ComponentProps<typeof BaseScrollArea.Root>, 'style'>,
    BaseProps {}

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    overflow: 'hidden',
  },
});

function Root({ style, ref, ...props }: ScrollAreaRootProps) {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Viewport ---------- */
export interface ScrollAreaViewportProps
  extends Omit<ComponentProps<typeof BaseScrollArea.Viewport>, 'style'>,
    BaseProps {}

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
      data-slot="scroll-area-viewport"
      ref={ref}
      {...stylex.props(viewportStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Content ---------- */
function Content(props: ComponentProps<typeof BaseScrollArea.Content>) {
  return <BaseScrollArea.Content data-slot="scroll-area-content" {...props} />;
}

/* ---------- Scrollbar ---------- */
export interface ScrollAreaScrollbarProps
  extends Omit<ComponentProps<typeof BaseScrollArea.Scrollbar>, 'style'>,
    BaseProps {}

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
      data-slot="scroll-area-scrollbar"
      ref={ref}
      {...stylex.props(scrollbarStyles.base, scrollbarStyles[orientation], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Thumb ---------- */
export interface ScrollAreaThumbProps
  extends Omit<ComponentProps<typeof BaseScrollArea.Thumb>, 'style'>,
    BaseProps {}

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
      data-slot="scroll-area-thumb"
      ref={ref}
      {...stylex.props(thumbStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Corner ---------- */
function Corner(props: ComponentProps<typeof BaseScrollArea.Corner>) {
  return <BaseScrollArea.Corner data-slot="scroll-area-corner" {...props} />;
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
