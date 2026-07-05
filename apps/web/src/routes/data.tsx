import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, Text } from '@base/ui';
import { colors } from '@base/ui/tokens/colors.stylex';
import { size } from '@base/ui/tokens/size.stylex';

import { usersListOptions } from '~/features/users/queries';

export const Route = createFileRoute('/data')({
  component: DataPage,
});

const styles = stylex.create({
  page: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: size.s24,
    paddingBlock: size.s64,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: size.s8,
    marginBottom: size.s48,
  },
  section: {
    marginBottom: size.s40,
  },
  sectionTitle: {
    marginBottom: size.s16,
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: size.s10,
  },
  userRowBorder: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
});

function DataPage() {
  const { data: users } = useSuspenseQuery(usersListOptions());

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <Text as='h1' size='display' weight='semibold'>
          Data
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          Server functions fetch data on the server via createServerFn, then hydrate into React
          Query on the client. This gives you SSR'd initial loads with client-side cache,
          refetching, and optimistic updates — no API layer to maintain.
        </Text>
      </header>

      <section {...stylex.props(styles.section)}>
        <Text as='h2' size='label' weight='medium' color='secondary' style={styles.sectionTitle}>
          Users (server function → React Query)
        </Text>
        <Card>
          {users.map((user, i) => (
            <div
              key={user.id}
              {...stylex.props(styles.userRow, i < users.length - 1 && styles.userRowBorder)}
            >
              <div>
                <Text as='div' size='bodySm'>
                  {user.name}
                </Text>
                <Text as='div' size='caption' color='secondary'>
                  {user.email}
                </Text>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
