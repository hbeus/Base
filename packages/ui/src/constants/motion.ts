export const INPUT_SCALE_DOWN = 0.99;
export const INPUT_SCALE_FOCUS = 1.01;

/** Target travel speed (px/s) for tab indicator slides. */
const TAB_INDICATOR_VELOCITY = 2000;
const TAB_INDICATOR_MIN_DURATION = 0.15;
const TAB_INDICATOR_MAX_DURATION = 0.35;

/** Distance-scaled duration so short and long hops feel equally smooth. */
export function tabIndicatorDuration(distancePx: number): number {
  return Math.min(
    TAB_INDICATOR_MAX_DURATION,
    Math.max(TAB_INDICATOR_MIN_DURATION, distancePx / TAB_INDICATOR_VELOCITY),
  );
}
