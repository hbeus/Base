import { Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { docStyles } from '~/styles/docs';

interface DocsPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function DocsPage({ title, description, children }: DocsPageProps) {
  return (
    <Flex direction='column' gap='s24'>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          {title}
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          {description}
        </Text>
      </header>
      {children}
    </Flex>
  );
}
