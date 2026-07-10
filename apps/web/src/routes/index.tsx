import { Card, Flex, Grid, Pressable, SidebarAnchor, Text } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconChevronRight } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

import { Link } from '~/components/Link';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const styles = stylex.create({
  main: {
    position: 'relative',
    maxWidth: '640px',
    minHeight: '100vh',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s4,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spacing.s8,
    minHeight: '100vh',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.s2,
  },
  navLink: {
    paddingBlock: spacing.s16,
  },
  introductionContainer: {
    paddingBlock: spacing.s16,
  },
});

function HomePage() {
  return (
    <Flex as='main' direction='column' justify='center' gap={'s40'} style={styles.main}>
      <section {...stylex.props(styles.section)}>
        <Flex as='header' direction='column' gap={'s4'} style={styles.header}>
          <Text as='h1' size='hero'>
            Base
          </Text>
          <Text as='p' size='display' color='secondary'>
            Simple monorepo starter built with TanStack Start, StyleX, and Base UI.
          </Text>
        </Flex>
        <Grid columns={2} gap='s40'>
          <Pressable as='section' role='link' variant='filled' style={styles.introductionContainer}>
            <Flex direction='column' gap={'s4'}>
              <Text as='h2' size='title'>
                Introduction
              </Text>
              <Text as='p' size='body' color='secondary'>
                The principles and building blocks
              </Text>
            </Flex>
          </Pressable>
          <Pressable as='section' role='link' variant='filled' style={styles.introductionContainer}>
            <Flex direction='column' gap={'s4'}>
              <Text as='h2' size='title'>
                Introduction
              </Text>
              <Text as='p' size='body' color='secondary'>
                The principles and building blocks
              </Text>
            </Flex>
          </Pressable>
        </Grid>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Components
        </Text>
        <nav {...stylex.props(styles.nav)}>
          <Pressable inset='s16' role='link'>
            <Link to='/overview'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Text>Overview</Text>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
          <Pressable inset='s16' role='link'>
            <Link to='/mock'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Text>Mock</Text>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
          <Pressable inset='s16' role='link'>
            <Link to='/showcase'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Text>Components</Text>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
          <Pressable inset='s16' role='link'>
            <Link to='/typography'>
              <Flex
                direction='row'
                justify='between'
                align='center'
                gap='s16'
                style={styles.navLink}
              >
                <Text>Typography</Text>
                <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
              </Flex>
            </Link>
          </Pressable>
        </nav>
      </section>
      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary'>
          Patterns
        </Text>
        <Pressable inset='s16' role='link'>
          <Link to='/data'>
            <Flex direction='row' justify='between' align='center' gap='s16' style={styles.navLink}>
              <Text>Data</Text>
              <IconChevronRight size={16} stroke={1.5} color={colors.foregroundSecondary} />
            </Flex>
          </Link>
        </Pressable>
      </section>
      <SidebarAnchor href='/introduction'>
        <Text>Introduction</Text>
      </SidebarAnchor>
    </Flex>
  );
}
