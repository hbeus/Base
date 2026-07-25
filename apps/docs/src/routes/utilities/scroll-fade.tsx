import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import ScrollFadeScrollArea from '~/examples/scroll-fade/scroll-area';
import ScrollFadeStandalone from '~/examples/scroll-fade/standalone';
import { highlightCode } from '~/lib/highlight';

import scrollAreaRaw from '~/examples/scroll-fade/scroll-area.tsx?raw';
import standaloneRaw from '~/examples/scroll-fade/standalone.tsx?raw';

export const Route = createFileRoute('/utilities/scroll-fade')({
  loader: async () => {
    const sources = { scrollAreaRaw, standaloneRaw };
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
      title='Scroll Fade'
      description='CSS utility for scroll-aware edge fades via mask-image. Import @base/ui/styles/scroll-fade.css (included in @base/shared global CSS). ScrollArea.Viewport enables it by default (scrollFade={false} to disable). Apply .scroll-fade / .scroll-fade-y / .scroll-fade-x on any overflow container.'
    >
      <ComponentExample
        title='With Scroll Area'
        code={highlighted.scrollAreaRaw}
        rawCode={scrollAreaRaw}
        defaultExpanded
      >
        <ScrollFadeScrollArea />
      </ComponentExample>

      <ComponentExample
        title='Standalone Class'
        code={highlighted.standaloneRaw}
        rawCode={standaloneRaw}
      >
        <ScrollFadeStandalone />
      </ComponentExample>
    </DocsPage>
  );
}
