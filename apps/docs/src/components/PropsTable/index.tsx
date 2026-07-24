import { Text } from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';

export interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
  title?: string;
}

const styles = stylex.create({
  wrapper: {
    overflowX: 'auto',
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: `${spacing.s10} ${spacing.s16}`,
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    letterSpacing: typography.labelLetterSpacing,
    fontWeight: 500,
    color: colors.foregroundSecondary,
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  td: {
    padding: `${spacing.s10} ${spacing.s16}`,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    letterSpacing: typography.bodySmLetterSpacing,
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    verticalAlign: 'top',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  code: {
    fontFamily: typography.fontMono,
    fontSize: typography.captionSize,
    backgroundColor: colors.lighten8,
    padding: `${spacing.s2} ${spacing.s6}`,
    borderRadius: radii.r4,
  },
});

export function PropsTable({ props, title = 'Props' }: PropsTableProps) {
  return (
    <section>
      <Text
        as='h2'
        size='label'
        weight='medium'
        color='secondary'
        style={headerStyles.title}
      >
        {title}
      </Text>
      <div {...stylex.props(styles.wrapper)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr>
              <th {...stylex.props(styles.th)}>Prop</th>
              <th {...stylex.props(styles.th)}>Type</th>
              <th {...stylex.props(styles.th)}>Default</th>
              <th {...stylex.props(styles.th)}>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, i) => (
              <tr key={prop.name}>
                <td
                  {...stylex.props(
                    styles.td,
                    i === props.length - 1 && styles.lastRow,
                  )}
                >
                  <code {...stylex.props(styles.code)}>{prop.name}</code>
                </td>
                <td
                  {...stylex.props(
                    styles.td,
                    i === props.length - 1 && styles.lastRow,
                  )}
                >
                  <code {...stylex.props(styles.code)}>{prop.type}</code>
                </td>
                <td
                  {...stylex.props(
                    styles.td,
                    i === props.length - 1 && styles.lastRow,
                  )}
                >
                  <code {...stylex.props(styles.code)}>{prop.default}</code>
                </td>
                <td
                  {...stylex.props(
                    styles.td,
                    i === props.length - 1 && styles.lastRow,
                  )}
                >
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const headerStyles = stylex.create({
  title: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
  },
});
