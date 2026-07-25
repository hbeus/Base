import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import BarHero from '~/examples/charts/bar-hero';
import { highlightCode } from '~/lib/highlight';

import heroRaw from '~/examples/charts/bar-hero.tsx?raw';

export const Route = createFileRoute('/charts/bar')({
  loader: async () => {
    const hero = await highlightCode({ data: { code: heroRaw } });
    return { hero };
  },
  component: BarPage,
});

function BarPage() {
  const { hero } = Route.useLoaderData();

  return (
    <DocsPage
      title='Bar'
      description='Cartesian bar series on the shared CartesianChart shell — theme Data colors, mount motion, and Chart tooltip.'
    >
      <ComponentExample title='Playground' code={hero} rawCode={heroRaw} defaultExpanded>
        <BarHero />
      </ComponentExample>
    </DocsPage>
  );
}
