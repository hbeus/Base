import { describe, expect, it } from 'vitest';
import { fitVisibleTabs } from './overflow';

describe('fitVisibleTabs', () => {
  it('keeps every tab when they fit without a More trigger', () => {
    expect(
      fitVisibleTabs({
        availableWidth: 240,
        gap: 8,
        moreWidth: 40,
        tabWidths: [64, 72, 80],
      }),
    ).toBe(3);
  });

  it('reserves one gap and the More trigger when tabs overflow', () => {
    expect(
      fitVisibleTabs({
        availableWidth: 220,
        gap: 8,
        moreWidth: 40,
        tabWidths: [64, 72, 80],
      }),
    ).toBe(2);
  });

  it('returns zero visible tabs when only the More trigger fits', () => {
    expect(
      fitVisibleTabs({
        availableWidth: 56,
        gap: 8,
        moreWidth: 40,
        tabWidths: [64, 72],
      }),
    ).toBe(0);
  });

  it('uses a half-pixel tolerance at layout boundaries', () => {
    expect(
      fitVisibleTabs({
        availableWidth: 119.5,
        gap: 8,
        moreWidth: 40,
        tabWidths: [72],
      }),
    ).toBe(1);
  });

  it('handles an empty tab set', () => {
    expect(
      fitVisibleTabs({
        availableWidth: 100,
        gap: 8,
        moreWidth: 40,
        tabWidths: [],
      }),
    ).toBe(0);
  });
});
