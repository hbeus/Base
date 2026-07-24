const LAYOUT_TOLERANCE = 0.5;

export interface FitVisibleTabsOptions {
  availableWidth: number;
  tabWidths: readonly number[];
  moreWidth: number;
  gap: number;
}

export function fitVisibleTabs({
  availableWidth,
  tabWidths,
  moreWidth,
  gap,
}: FitVisibleTabsOptions): number {
  if (tabWidths.length === 0) {
    return 0;
  }

  const totalTabsWidth =
    tabWidths.reduce((sum, width) => sum + width, 0) + gap * (tabWidths.length - 1);

  if (totalTabsWidth <= availableWidth + LAYOUT_TOLERANCE) {
    return tabWidths.length;
  }

  let visibleWidth = 0;

  for (let index = 0; index < tabWidths.length; index += 1) {
    visibleWidth += tabWidths[index] ?? 0;
    const tabGaps = gap * index;
    const widthWithMore = visibleWidth + tabGaps + gap + moreWidth;

    if (widthWithMore > availableWidth + LAYOUT_TOLERANCE) {
      return index;
    }
  }

  return tabWidths.length;
}

function horizontalPadding(element: Element): number {
  const styles = getComputedStyle(element);
  return (
    (Number.parseFloat(styles.paddingLeft) || 0) + (Number.parseFloat(styles.paddingRight) || 0)
  );
}

function availableOverflowWidth(element: HTMLElement, fill: boolean): number {
  const ownPadding = horizontalPadding(element);
  if (fill) {
    return element.clientWidth - ownPadding;
  }

  const constraint = element.parentElement ?? element;
  return constraint.clientWidth - horizontalPadding(constraint) - ownPadding;
}

export function measureVisibleTabs({
  overflowElement,
  listElement,
  moreElement,
  tabWidths,
  registeredTabCount,
  fill,
}: {
  overflowElement: HTMLDivElement;
  listElement: HTMLDivElement;
  moreElement: HTMLButtonElement | null;
  tabWidths: number[];
  registeredTabCount: number;
  fill: boolean;
}): number | null {
  const renderedTabCount = listElement.querySelectorAll('[data-tabs-measure-id]').length;
  if (renderedTabCount === 0) {
    return registeredTabCount === 0 ? 0 : null;
  }
  if (tabWidths.length !== registeredTabCount || tabWidths.length !== renderedTabCount) {
    return null;
  }

  const availableWidth = availableOverflowWidth(overflowElement, fill);
  const moreWidth = moreElement?.getBoundingClientRect().width ?? 0;
  if (tabWidths.some(width => width <= 0) || availableWidth <= 0 || moreWidth <= 0) {
    return null;
  }

  const styles = getComputedStyle(listElement);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
  return fitVisibleTabs({ availableWidth, tabWidths, moreWidth, gap });
}
