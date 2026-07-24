import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { DocsPage } from '~/components/DocsPage';
import { PropsTable } from '~/components/PropsTable';
import { tabsListProps, tabsTabProps } from '~/data/components/tabs';
import TabsButtonBackground from '~/examples/tabs/button-background';
import TabsButtonVariant from '~/examples/tabs/button-variant';
import TabsFill from '~/examples/tabs/fill';
import TabsHero from '~/examples/tabs/hero';
import TabsLeadingSlots from '~/examples/tabs/leading-slots';
import TabsOverflow from '~/examples/tabs/overflow';
import TabsOverflowFill from '~/examples/tabs/overflow-fill';
import { highlightCode } from '~/lib/highlight';

import buttonBackgroundRaw from '~/examples/tabs/button-background.tsx?raw';
import buttonVariantRaw from '~/examples/tabs/button-variant.tsx?raw';
import fillRaw from '~/examples/tabs/fill.tsx?raw';
import heroRaw from '~/examples/tabs/hero.tsx?raw';
import leadingSlotsRaw from '~/examples/tabs/leading-slots.tsx?raw';
import overflowRaw from '~/examples/tabs/overflow.tsx?raw';
import overflowFillRaw from '~/examples/tabs/overflow-fill.tsx?raw';

export const Route = createFileRoute('/components/navigation/tabs')({
  loader: async () => {
    const sources = {
      heroRaw,
      leadingSlotsRaw,
      buttonVariantRaw,
      buttonBackgroundRaw,
      fillRaw,
      overflowRaw,
      overflowFillRaw,
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
      title='Tabs'
      description='Tabbed content with a motion-shared active indicator. Supports underline and button variants with leading and trailing icon slots.'
    >
      <ComponentExample
        title='Default'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <TabsHero />
      </ComponentExample>

      <ComponentExample
        title='Leading slots'
        code={highlighted.leadingSlotsRaw}
        rawCode={leadingSlotsRaw}
      >
        <TabsLeadingSlots />
      </ComponentExample>

      <ComponentExample
        title='Button variant'
        code={highlighted.buttonVariantRaw}
        rawCode={buttonVariantRaw}
      >
        <TabsButtonVariant />
      </ComponentExample>

      <ComponentExample
        title='Button with background'
        code={highlighted.buttonBackgroundRaw}
        rawCode={buttonBackgroundRaw}
      >
        <TabsButtonBackground />
      </ComponentExample>

      <ComponentExample
        title='Fill'
        code={highlighted.fillRaw}
        rawCode={fillRaw}
      >
        <TabsFill />
      </ComponentExample>

      <ComponentExample
        title='Overflow'
        code={highlighted.overflowRaw}
        rawCode={overflowRaw}
      >
        <TabsOverflow />
      </ComponentExample>

      <ComponentExample
        title='Overflow with fill'
        code={highlighted.overflowFillRaw}
        rawCode={overflowFillRaw}
      >
        <TabsOverflowFill />
      </ComponentExample>

      <PropsTable props={tabsListProps} title='Tabs.List Props' />
      <PropsTable props={tabsTabProps} title='Tabs.Tab Props' />
    </DocsPage>
  );
}
