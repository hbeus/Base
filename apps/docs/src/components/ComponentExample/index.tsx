import { Text } from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconChevronDown, IconCopy } from '@tabler/icons-react';
import { type ReactNode, useCallback, useRef, useState } from 'react';

interface ComponentExampleProps {
  title: string;
  children: ReactNode;
  code: string;
  rawCode: string;
  defaultExpanded?: boolean;
}

export function ComponentExample({
  title,
  children,
  code,
  rawCode,
  defaultExpanded = false,
}: ComponentExampleProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [rawCode]);

  return (
    <section {...stylex.props(styles.section)}>
      <Text
        as='h2'
        size='label'
        weight='medium'
        color='secondary'
        style={styles.title}
      >
        {title}
      </Text>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.preview)}>{children}</div>
        <div {...stylex.props(styles.toolbar)}>
          <button
            type='button'
            onClick={() => setExpanded((v) => !v)}
            {...stylex.props(styles.toggleButton)}
          >
            <IconChevronDown
              size={14}
              {...stylex.props(
                styles.chevron,
                expanded && styles.chevronExpanded,
              )}
            />
            <span>{expanded ? 'Hide code' : 'Show code'}</span>
          </button>
          <button
            type='button'
            onClick={handleCopy}
            {...stylex.props(styles.copyButton)}
            aria-label='Copy code'
          >
            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          </button>
        </div>
        {expanded && (
          <div
            {...stylex.props(styles.codeBlock)}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        )}
      </div>
    </section>
  );
}

const styles = stylex.create({
  section: {
    marginBottom: spacing.s8,
  },
  title: {
    marginBottom: spacing.s8,
    paddingInline: spacing.s8,
  },
  container: {
    borderRadius: radii.r12,
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    overflow: 'hidden',
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s12,
    alignItems: 'center',
    padding: spacing.s20,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: spacing.s12,
    paddingBlock: spacing.s6,
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    backgroundColor: colors.lighten4,
  },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s6,
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.foregroundSecondary,
    cursor: 'pointer',
    fontFamily: typography.fontSans,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    padding: spacing.s4,
    borderRadius: radii.r4,
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  chevron: {
    transition: 'transform 0.15s',
    transform: 'rotate(0deg)',
  },
  chevronExpanded: {
    transform: 'rotate(180deg)',
  },
  copyButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.foregroundSecondary,
    cursor: 'pointer',
    padding: spacing.s4,
    borderRadius: radii.r4,
    ':hover': {
      color: colors.foregroundPrimary,
    },
  },
  codeBlock: {
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    overflowX: 'auto',
  },
});
