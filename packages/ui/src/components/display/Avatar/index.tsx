import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

type AvatarSize = 'sm' | 'md' | 'lg';

/* ---------- Root ---------- */
export interface AvatarRootProps
  extends Omit<ComponentProps<typeof BaseAvatar.Root>, 'style'>,
    BaseProps {
  size?: AvatarSize;
}

const rootStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    overflow: 'hidden',
    userSelect: 'none',
    flexShrink: 0,
    backgroundColor: colors.lighten8,
  },
  sm: {
    width: size.s24,
    height: size.s24,
  },
  md: {
    width: size.s32,
    height: size.s32,
  },
  lg: {
    width: size.s48,
    height: size.s48,
  },
});

function Root({ size: avatarSize = 'md', style, ref, ...props }: AvatarRootProps) {
  return (
    <BaseAvatar.Root
      data-slot="avatar"
      data-size={avatarSize}
      ref={ref}
      {...stylex.props(rootStyles.base, rootStyles[avatarSize], ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Image ---------- */
export interface AvatarImageProps
  extends Omit<ComponentProps<typeof BaseAvatar.Image>, 'style'>,
    BaseProps {}

const imageStyles = stylex.create({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

function Image({ style, ref, ...props }: AvatarImageProps) {
  return (
    <BaseAvatar.Image
      data-slot="avatar-image"
      ref={ref}
      {...stylex.props(imageStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Fallback ---------- */
export interface AvatarFallbackProps
  extends Omit<ComponentProps<typeof BaseAvatar.Fallback>, 'style'>,
    BaseProps {}

const fallbackStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontSize: typography.labelSize,
    fontWeight: 600,
    color: colors.foregroundSecondary,
  },
});

function Fallback({ style, ref, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      ref={ref}
      {...stylex.props(fallbackStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Avatar = {
  Root,
  Image,
  Fallback,
};
