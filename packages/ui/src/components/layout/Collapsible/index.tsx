import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

/* ---------- Root ---------- */
export interface CollapsibleRootProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCollapsible.Root>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

function Root({ style, ref, ...props }: CollapsibleRootProps) {
  return <BaseCollapsible.Root ref={ref} {...stylex.props(...styleArray(style))} {...props} />;
}

/* ---------- Trigger ---------- */
function Trigger({
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> & { ref?: Ref<HTMLButtonElement> }) {
  return <BaseCollapsible.Trigger ref={ref} {...props} />;
}

/* ---------- Panel ---------- */
export interface CollapsiblePanelProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const panelStyles = stylex.create({
  base: {
    overflow: 'hidden',
  },
});

function Panel({ style, ref, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      ref={ref}
      {...stylex.props(panelStyles.base, ...styleArray(style))}
      {...props}
    />
  );
}

/* ---------- Export ---------- */
export const Collapsible = {
  Root,
  Trigger,
  Panel,
};
