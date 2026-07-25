import { motion, useReducedMotion } from 'motion/react';
import { chartMotion } from '../motion';
import { useCartesian } from './context';
import { useCartesianScales } from './scales';
import { useSeriesRegistration } from './useSeriesRegistration';

export type CartesianBarProps = {
  dataKey: string;
  label?: string;
  color?: string;
};

export function Bar({ dataKey, label, color }: CartesianBarProps) {
  const { data, xKey, innerHeight, animate } = useCartesian();
  const { xScale, yScale } = useCartesianScales();
  const { color: fill } = useSeriesRegistration('bar', dataKey, label, color);
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  const bandwidth = xScale.bandwidth();

  return (
    <g>
      {data.map((row, i) => {
        const xVal = String(row[xKey] ?? '');
        const x = xScale(xVal) ?? 0;
        const value = Number(row[dataKey]) || 0;
        const y = yScale(value) ?? innerHeight;
        const height = Math.max(0, innerHeight - y);

        return (
          <motion.rect
            key={`${xVal}-${dataKey}`}
            x={x}
            width={bandwidth}
            fill={fill}
            initial={shouldAnimate ? { y: innerHeight, height: 0 } : false}
            animate={{ y, height }}
            transition={chartMotion.series}
          />
        );
      })}
    </g>
  );
}
