import { Progress as BaseProgress } from '@base-ui/react/progress';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface ProgressRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseProgress.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const rootStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s6,
  },
});

function Root({ style, ref, ...props }: ProgressRootProps) {
  return (
    <BaseProgress.Root
      ref={ref}
      {...stylex.props(rootStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Track ---------- */
export interface ProgressTrackProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseProgress.Track>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const trackStyles = stylex.create({
  base: {
    position: 'relative',
    height: size.s8,
    borderRadius: radii.full,
    backgroundColor: colors.lighten8,
    overflow: 'hidden',
  },
});

function Track({ style, ref, ...props }: ProgressTrackProps) {
  return (
    <BaseProgress.Track
      ref={ref}
      {...stylex.props(trackStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Indicator ---------- */
export interface ProgressIndicatorProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseProgress.Indicator>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const indicatorStyles = stylex.create({
  base: {
    height: '100%',
    borderRadius: radii.full,
    backgroundColor: colors.highlight,
    transition: 'width 0.3s ease',
  },
});

function Indicator({ style, ref, ...props }: ProgressIndicatorProps) {
  return (
    <BaseProgress.Indicator
      ref={ref}
      {...stylex.props(indicatorStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Label ---------- */
export interface ProgressLabelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseProgress.Label>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLSpanElement>;
}

const labelStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    fontWeight: 500,
    color: colors.foregroundPrimary,
  },
});

function Label({ style, ref, ...props }: ProgressLabelProps) {
  return (
    <BaseProgress.Label
      ref={ref}
      {...stylex.props(labelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Value ---------- */
export interface ProgressValueProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseProgress.Value>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLSpanElement>;
}

const valueStyles = stylex.create({
  base: {
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    color: colors.foregroundSecondary,
  },
});

function Value({ style, ref, ...props }: ProgressValueProps) {
  return (
    <BaseProgress.Value
      ref={ref}
      {...stylex.props(valueStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Progress = {
  Root,
  Track,
  Indicator,
  Label,
  Value,
};
