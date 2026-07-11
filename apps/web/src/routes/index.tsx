import { Card, Flex, Grid, Pressable, Sidebar, Text, useActiveSection } from '@base/ui';
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
    gap: spacing.s40,
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

const SECTION_IDS = ['introduction', 'components', 'patterns'];

function HomePage() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <Flex as='main' direction='column' justify='center' gap={'s40'} style={styles.main}>
      <section id='introduction' {...stylex.props(styles.section)}>
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
      <section id='components' {...stylex.props(styles.section)}>
        <Flex direction='column' gap='s4'>
          <Text as='h2' size='display' weight='medium'>
            Components
          </Text>
          <Text as='p' size='headline' color='secondary'>
            A collection of components to build your next project.
          </Text>
        </Flex>
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
      <section id='patterns' {...stylex.props(styles.section)}>
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
      <Sidebar.Root activeId={activeId}>
        <Sidebar.Anchor id='introduction' href='#introduction'>
          Introduction
        </Sidebar.Anchor>
        <Sidebar.Anchor id='components' href='#components'>
          Components
        </Sidebar.Anchor>
        <Sidebar.Anchor id='patterns' href='#patterns'>
          Patterns
        </Sidebar.Anchor>
      </Sidebar.Root>
    </Flex>
  );
}
