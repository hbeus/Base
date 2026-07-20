import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { styleArray } from '../../../utils/styleArray';

export interface MenubarProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseMenubar>, 'style'>,
    BaseProps {
  ref?: Ref<HTMLDivElement>;
}

const styles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    padding: spacing.s4,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r12,
    backgroundColor: colors.surfaceRaised,
  },
});

export function Menubar({ style, ref, ...props }: MenubarProps) {
  return <BaseMenubar ref={ref} {...stylex.props(styles.base, ...styleArray(style))} {...props} />;
}
