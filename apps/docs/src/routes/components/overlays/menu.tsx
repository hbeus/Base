import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { menuProps } from '~/data/components/menu';
import MenuHero from '~/examples/menu/hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/menu/hero.tsx?raw';

export const Route = createFileRoute('/components/overlays/menu')({
  loader: async () => {
    const sources = { heroRaw };
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
    <DocsPage
      title='Menu'
      description='Dropdown menu with items, icons, and separators.'
    >
      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <MenuHero />
      </ComponentExample>

      <PropsTable props={menuProps} />
    </DocsPage>
  );
}
