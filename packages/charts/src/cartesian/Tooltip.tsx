import * as stylex from '@stylexjs/stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { size } from '@base/ui/tokens/size.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { chartMotion } from '../motion';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';

export type CartesianTooltipContext = {
  index: number;
  category: string;
  series: { label: string; value: number; color: string }[];
};

export type CartesianTooltipProps = {
  children?: (ctx: CartesianTooltipContext) => ReactNode;
};

const styles = stylex.create({
  panel: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2,
    minWidth: 120,
    padding: size.s8,
    borderRadius: radii.r8,
    backgroundColor: colors.chartTooltipBg,
    color: colors.chartTooltipFg,
    boxShadow: colors.shadowElevated,
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: size.s6,
    marginTop: size.s4,
  },
  swatch: {
    width: size.s8,
    height: size.s8,
    borderRadius: radii.r4,
    flexShrink: 0,
  },
  label: {
    flex: 1,
    opacity: 0.75,
  },
  value: {
    fontVariantNumeric: 'tabular-nums',
  },
  title: {
    fontWeight: 600,
  },
});

export function Tooltip({ children }: CartesianTooltipProps) {
  const { activeIndex, xValues, data, series, margin, width, hostRef } = useCartesian();
  const { xScale } = useCartesianScales();
  const reduce = useReducedMotion();

  const open = activeIndex != null && series.length > 0;
  const category = activeIndex != null ? (xValues[activeIndex] ?? '') : '';
  const row = activeIndex != null ? data[activeIndex] : undefined;

  const ctx: CartesianTooltipContext | null =
    open && row
      ? {
          index: activeIndex!,
          category,
          series: series.map(s => ({
            label: s.label ?? s.dataKey,
            value: Number(row[s.dataKey]) || 0,
            color: s.color,
          })),
        }
      : null;

  const xVal = category;
  const bandX = xScale(xVal) ?? 0;
  const left = Math.min(
    width - 140,
    Math.max(8, margin.left + bandX + xScale.bandwidth() / 2 - 60),
  );
  const top = margin.top + 8;

  const host = hostRef.current;
  if (!host) return null;

  return createPortal(
    <AnimatePresence>
      {ctx ? (
        <motion.div
          {...stylex.props(styles.panel)}
          style={{ left, top }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={chartMotion.tooltip}
        >
          {children ? (
            children(ctx)
          ) : (
            <>
              <div {...stylex.props(styles.title)}>{ctx.category}</div>
              {ctx.series.map(s => (
                <div key={s.label} {...stylex.props(styles.row)}>
                  <span {...stylex.props(styles.swatch)} style={{ background: s.color }} />
                  <span {...stylex.props(styles.label)}>{s.label}</span>
                  <span {...stylex.props(styles.value)}>{s.value}</span>
                </div>
              ))}
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}
