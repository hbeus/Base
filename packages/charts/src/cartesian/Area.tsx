import { curveMonotoneX } from '@visx/curve';
import { AreaClosed } from '@visx/shape';
import { motion, useReducedMotion } from 'motion/react';
import { chartMotion } from '../motion';
import type { ChartDatum } from '../types';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';
import { useSeriesRegistration } from './useSeriesRegistration';

export type CartesianAreaProps = {
  dataKey: string;
  label?: string;
  color?: string;
};

export function Area({ dataKey, label, color }: CartesianAreaProps) {
  const { data, xKey, animate } = useCartesian();
  const { xScale, yScale } = useCartesianScales();
  const { color: fill } = useSeriesRegistration('area', dataKey, label, color);
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <AreaClosed<ChartDatum>
      data={data}
      x={d => (xScale(String(d[xKey] ?? '')) ?? 0) + xScale.bandwidth() / 2}
      y={d => yScale(Number(d[dataKey]) || 0) ?? 0}
      yScale={yScale}
      curve={curveMonotoneX}
    >
      {({ path }) => (
        <motion.path
          d={path(data) || ''}
          fill={fill}
          fillOpacity={0.35}
          stroke={fill}
          strokeWidth={1.5}
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={chartMotion.series}
        />
      )}
    </AreaClosed>
  );
}
