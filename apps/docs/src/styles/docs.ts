import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';

export const docStyles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s8,
    marginBottom: spacing.s32,
  },
  section: {
    marginBottom: spacing.s32,
  },
  sectionTitle: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s12,
    alignItems: 'center',
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  previewColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s12,
    padding: spacing.s20,
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
  },
});
