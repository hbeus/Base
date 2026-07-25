import { Flex, Text } from '@base/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsPage } from '~/components/DocsPage';
import { InlineCode } from '~/components/InlineCode';

export const Route = createFileRoute('/shaders/')({
  component: ShadersOverviewPage,
});

function ShadersOverviewPage() {
  return (
    <DocsPage
      title='Shaders'
      description='GPU page backgrounds from @base/shaders — OGL fullscreen presets behind a compound Shader API. Progressive enhancement with Fallback and Reveal.'
    >
      <Flex direction='column' gap='s24'>
        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Install
          </Text>
          <Text color='secondary'>
            Add the workspace package in an app that already has React 19, then import the compound{' '}
            <InlineCode>Shader</InlineCode> export.
          </Text>
          <pre>
            {`pnpm add @base/shaders --filter <app>
import { Shader } from '@base/shaders'`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Compound API
          </Text>
          <Text color='secondary'>
            <InlineCode>Shader.Root</InlineCode> owns the canvas lifecycle. Exactly one named Preset
            (POC: <InlineCode>Shader.Aurora</InlineCode>) registers as a headless child.
          </Text>
          <pre>
            {`<Shader.Root style={{ height: 320 }} fallback={…}>
  <Shader.Aurora colorA="#0b1d36" colorB="#3d8bfd" />
</Shader.Root>`}
          </pre>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Runtime
          </Text>
          <Text color='secondary'>
            Client-only mount, RAF paused when offscreen or the tab is hidden, DPR capped,{' '}
            <InlineCode>prefers-reduced-motion</InlineCode> freezes after a static frame, and{' '}
            <InlineCode>fallback</InlineCode> stays visible until Reveal (first successful frame).
          </Text>
        </Flex>

        <Flex direction='column' gap='s8'>
          <Text as='h2' size='title'>
            Presets
          </Text>
          <Text color='secondary'>
            Start with{' '}
            <Link to='/shaders/aurora'>
              Aurora
            </Link>{' '}
            — DialKit-tuned live preview and props.
          </Text>
        </Flex>
      </Flex>
    </DocsPage>
  );
}
