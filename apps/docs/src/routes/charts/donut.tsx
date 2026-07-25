import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import DonutHero from '~/examples/charts/donut-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/charts/donut-hero.tsx?raw';

export const Route = createFileRoute('/charts/donut')({
  loader: async () => {
    const hero = await highlightCode({ data: { code: heroRaw } });
    return { hero };
  },
  component: DonutPage,
});

function DonutPage() {
  const { hero } = Route.useLoaderData();

  return (
    <DocsPage
      title='Donut'
      description='Polar DonutChart with Arc segments, optional center Label, and charts-owned Tooltip.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <DonutHero />
      </ComponentExample>
    </DocsPage>
  );
}
