type PropsObject = Record<string, unknown>;

export function mergeProps(...propSets: (PropsObject | undefined)[]): PropsObject {
  const merged: PropsObject = {};

  for (const props of propSets) {
    if (!props) continue;
    for (const [key, value] of Object.entries(props)) {
      if (key === 'className') {
        merged.className = [merged.className, value].filter(Boolean).join(' ');
      } else if (key === 'style' && typeof value === 'object' && typeof merged.style === 'object') {
        merged.style = {
          ...(merged.style as Record<string, unknown>),
          ...(value as Record<string, unknown>),
        };
      } else {
        merged[key] = value;
      }
    }
  }

  return merged;
}
