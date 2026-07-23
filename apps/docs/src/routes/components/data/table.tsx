import { Flex, Text } from '@base/ui';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { PropsTable } from '~/components/PropsTable';
import { columnMetaProps, tableRootProps } from '~/data/components/table';
import TableCellTypes from '~/examples/table/cell-types';
import TableEmptyState from '~/examples/table/empty-state';
import TableHero from '~/examples/table/hero';
import TablePagination from '~/examples/table/pagination';
import TableSelection from '~/examples/table/selection';
import TableSorting from '~/examples/table/sorting';
import { highlightCode } from '~/lib/highlight';
import { docStyles } from '~/styles/docs';

import cellTypesRaw from '~/examples/table/cell-types.tsx?raw';
import emptyStateRaw from '~/examples/table/empty-state.tsx?raw';
import heroRaw from '~/examples/table/hero.tsx?raw';
import paginationRaw from '~/examples/table/pagination.tsx?raw';
import selectionRaw from '~/examples/table/selection.tsx?raw';
import sortingRaw from '~/examples/table/sorting.tsx?raw';

export const Route = createFileRoute('/components/data/table')({
  loader: async () => {
    const sources = {
      heroRaw,
      sortingRaw,
      paginationRaw,
      selectionRaw,
      cellTypesRaw,
      emptyStateRaw,
    };
    const entries = await Promise.all(
      Object.entries(sources).map(async ([key, code]) => {
        const html = await highlightCode({ data: { code } });
        return [key, html] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<string, string>;
  },
  component: PageComponent,
});

function PageComponent() {
  const highlighted = Route.useLoaderData();

  return (
    <Flex direction='column' gap='s24'>
      <header {...stylex.props(docStyles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Table
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Data table built on TanStack Table with CSS Grid sizing. Columns use
          fr-unit proportional widths with per-column minimum widths. Includes
          sorting, pagination, row selection, column resizing, and a set of
          presentational cell atoms for common data types.
        </Text>
      </header>

      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <TableHero />
      </ComponentExample>

      <ComponentExample
        title='Sorting'
        code={highlighted.sortingRaw}
        rawCode={sortingRaw}
      >
        <TableSorting />
      </ComponentExample>

      <ComponentExample
        title='Pagination'
        code={highlighted.paginationRaw}
        rawCode={paginationRaw}
      >
        <TablePagination />
      </ComponentExample>

      <ComponentExample
        title='Row Selection'
        code={highlighted.selectionRaw}
        rawCode={selectionRaw}
      >
        <TableSelection />
      </ComponentExample>

      <ComponentExample
        title='Cell Types'
        code={highlighted.cellTypesRaw}
        rawCode={cellTypesRaw}
      >
        <TableCellTypes />
      </ComponentExample>

      <ComponentExample
        title='Empty State'
        code={highlighted.emptyStateRaw}
        rawCode={emptyStateRaw}
      >
        <TableEmptyState />
      </ComponentExample>

      <PropsTable props={tableRootProps} />

      <section>
        <Text
          as='h2'
          size='label'
          weight='medium'
          color='secondary'
          style={metaHeaderStyle.title}
        >
          Column Meta
        </Text>
        <Text as='p' size='bodySm' color='secondary' style={metaHeaderStyle.description}>
          Set via the meta field on column definitions to control grid sizing.
        </Text>
      </section>

      <PropsTable props={columnMetaProps} />
    </Flex>
  );
}

const metaHeaderStyle = stylex.create({
  title: {
    paddingInline: spacing.s8,
  },
  description: {
    paddingInline: spacing.s8,
    marginBottom: spacing.s8,
  },
});
