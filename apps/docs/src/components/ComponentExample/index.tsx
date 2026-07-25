import { Button, Card, Flex, ScrollArea, Text } from '@base/ui';
import { borders } from '@base/ui/tokens/borders.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { type ReactNode, useCallback, useRef, useState } from 'react';

interface ComponentExampleProps {
  title: string;
  children: ReactNode;
  code: string;
  rawCode: string;
  defaultExpanded?: boolean;
}

const CODE_HEIGHT_COLLAPSED = 120;
const CODE_HEIGHT_EXPANDED = 320;

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

        <div {...stylex.props(styles.codeBlockContainer)}>
          <div {...stylex.props(styles.toggleButtonContainer)}>
            <Button onClick={() => setExpanded(v => !v)} variant='accent' size='xs' rounded>
              {expanded ? 'Hide code' : 'Show code'}
            </Button>
          </div>
          <motion.div
            initial={false}
            animate={{ height: expanded ? CODE_HEIGHT_EXPANDED : CODE_HEIGHT_COLLAPSED }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            {...stylex.props(styles.codeBlock)}
          >
            <ScrollArea.Root style={styles.scrollArea}>
              <ScrollArea.Viewport style={styles.viewport}>
                <ScrollArea.Content dangerouslySetInnerHTML={{ __html: code }} />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Scrollbar orientation='horizontal'>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </motion.div>
        </div>
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
  toggleButtonContainer: {
    position: 'absolute',
    bottom: spacing.s16,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
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
  codeBlockContainer: {
    position: 'relative',
  },
  codeBlock: {
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  scrollArea: {
    height: '100%',
  },
  viewport: {
    overflowX: 'scroll',
    overscrollBehavior: 'none',
  },
});
