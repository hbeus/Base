import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import TabsAlphaButton from '~/examples/tabs-alpha/button';
import buttonRaw from '~/examples/tabs-alpha/button.tsx?raw';
import TabsAlphaFill from '~/examples/tabs-alpha/fill';
import TabsAlphaFillButton from '~/examples/tabs-alpha/fill-button';
import fillButtonRaw from '~/examples/tabs-alpha/fill-button.tsx?raw';
import fillRaw from '~/examples/tabs-alpha/fill.tsx?raw';
import TabsAlphaUnderline from '~/examples/tabs-alpha/underline';
import underlineRaw from '~/examples/tabs-alpha/underline.tsx?raw';
import { highlightCode } from '~/lib/highlight';

export const Route = createFileRoute('/components/navigation/tabs-alpha')({
  loader: async () => {
    const sources = {
      underlineRaw,
      buttonRaw,
      fillRaw,
      fillButtonRaw,
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

      <ComponentExample title='Fill' code={highlighted.fillRaw} rawCode={fillRaw}>
        <TabsAlphaFill />
      </ComponentExample>

      <ComponentExample
        title='Fill button'
        code={highlighted.fillButtonRaw}
        rawCode={fillButtonRaw}
      >
        <TabsAlphaFillButton />
      </ComponentExample>
    </DocsPage>
  );
}
