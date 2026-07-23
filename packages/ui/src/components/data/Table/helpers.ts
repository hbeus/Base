import { createColumnHelper } from '@tanstack/react-table';

export interface GridColumnMeta {
  /** Fractional unit weight for CSS Grid (default: 1) */
  fr?: number;
  /** Minimum column width in px (default: 100) */
  minWidth?: number;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends unknown, TValue> extends GridColumnMeta {}
}

export function createTableHelper<TData>() {
  return createColumnHelper<TData>();
}
