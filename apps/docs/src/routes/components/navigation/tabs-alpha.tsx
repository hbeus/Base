import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import TabsAlphaButton from '~/examples/tabs-alpha/button';
import buttonRaw from '~/examples/tabs-alpha/button.tsx?raw';
import TabsAlphaUnderline from '~/examples/tabs-alpha/underline';
import underlineRaw from '~/examples/tabs-alpha/underline.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/components/navigation/tabs-alpha')({
  loader: async () => {
    const sources = {
      underlineRaw,
      buttonRaw,
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
    <DocsPage
      title='Tabs (alpha)'
      description='Unstable rewrite with Motion layoutId indicators. Deep-import from @base/ui/alpha/Tabs.'
    >
      <ComponentExample
        title='Underline'
        code={highlighted.underlineRaw}
        rawCode={underlineRaw}
        defaultExpanded
      >
        <TabsAlphaUnderline />
      </ComponentExample>

      <ComponentExample title='Button' code={highlighted.buttonRaw} rawCode={buttonRaw}>
        <TabsAlphaButton />
      </ComponentExample>
    </DocsPage>
  );
}
