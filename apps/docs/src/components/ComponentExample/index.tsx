import { Card, Flex, Text } from '@base/ui';
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
    <Flex as='section' direction='column' gap='s12'>
      <Flex direction='row' gap='s8' align='center' justify='between'>
        <Text as='h2' size='body' weight='medium'>
          {title}
        </Text>
        <button
          type='button'
          onClick={handleCopy}
          {...stylex.props(styles.copyButton)}
          aria-label='Copy code'
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </button>
      </Flex>

      <Card variant='outline' gap='none' padding='none' style={styles.container}>
        <div {...stylex.props(styles.preview)}>{children}</div>
        <Flex direction='row' gap='s16' align='center' justify='between' style={styles.toolbar}>
          <button
            type='button'
            onClick={() => setExpanded(v => !v)}
            {...stylex.props(styles.toggleButton)}
          >
            <IconChevronDown
              size={14}
              {...stylex.props(styles.chevron, expanded && styles.chevronExpanded)}
            />
            <span>{expanded ? 'Hide code' : 'Show code'}</span>
          </button>
        </Flex>
        <div
          {...stylex.props(styles.codeBlock, expanded && styles.codeBlockExpanded)}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </Card>
    </Flex>
  );
}

const styles = stylex.create({
  container: {
    borderRadius: radii.r24,
    overflow: 'hidden',
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.s24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.s32,
    minHeight: '200px',
  },
  toolbar: {
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
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
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '120px',
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    overscrollBehavior: 'none',
  },
  codeBlockExpanded: {
    maxHeight: '300px',
  },
});
