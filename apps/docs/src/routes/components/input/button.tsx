import { Flex, Text } from '@base/ui';
import * as stylex from '@stylexjs/stylex';
import { createFileRoute } from '@tanstack/react-router';
import { ComponentExample } from '~/components/ComponentExample';
import { PropsTable } from '~/components/PropsTable';
import { buttonProps } from '~/data/components/button';
import ButtonDisabled from '~/examples/button/disabled';
import ButtonFullWidth from '~/examples/button/full-width';
import ButtonHero from '~/examples/button/hero';
import ButtonRounded from '~/examples/button/rounded';
import ButtonSizes from '~/examples/button/sizes';
import ButtonVariants from '~/examples/button/variants';
import { highlightCode } from '~/lib/highlight';
import { docStyles } from '~/styles/docs';

import disabledRaw from '~/examples/button/disabled.tsx?raw';
import fullWidthRaw from '~/examples/button/full-width.tsx?raw';
import heroRaw from '~/examples/button/hero.tsx?raw';
import roundedRaw from '~/examples/button/rounded.tsx?raw';
import sizesRaw from '~/examples/button/sizes.tsx?raw';
import variantsRaw from '~/examples/button/variants.tsx?raw';

export const Route = createFileRoute('/components/input/button')({
  loader: async () => {
    const sources = { heroRaw, variantsRaw, sizesRaw, roundedRaw, fullWidthRaw, disabledRaw };
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
          Button
        </Text>
        <Text as='p' size='bodySm' color='secondary'>
          A button with variant and size props, powered by Base UI and motion.dev.
        </Text>
      </header>

      <ComponentExample
        title='Usage'
        code={highlighted.heroRaw}
        rawCode={heroRaw}
        defaultExpanded
      >
        <ButtonHero />
      </ComponentExample>

      <ComponentExample
        title='Variants'
        code={highlighted.variantsRaw}
        rawCode={variantsRaw}
      >
        <ButtonVariants />
      </ComponentExample>

      <ComponentExample
        title='Sizes'
        code={highlighted.sizesRaw}
        rawCode={sizesRaw}
      >
        <ButtonSizes />
      </ComponentExample>

      <ComponentExample
        title='Rounded'
        code={highlighted.roundedRaw}
        rawCode={roundedRaw}
      >
        <ButtonRounded />
      </ComponentExample>

      <ComponentExample
        title='Full Width'
        code={highlighted.fullWidthRaw}
        rawCode={fullWidthRaw}
      >
        <ButtonFullWidth />
      </ComponentExample>

      <ComponentExample
        title='Disabled'
        code={highlighted.disabledRaw}
        rawCode={disabledRaw}
      >
        <ButtonDisabled />
      </ComponentExample>

      <PropsTable props={buttonProps} />
    </Flex>
  );
}
