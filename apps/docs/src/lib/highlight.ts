import { createServerFn } from '@tanstack/react-start';
import type { HighlighterCore } from 'shiki';

let highlighter: HighlighterCore | null = null;

async function getHighlighter() {
  if (highlighter) return highlighter;
  const { createHighlighter } = await import('shiki');
  highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['tsx'],
  });
  return highlighter;
}

export const highlightCode = createServerFn({ method: 'GET' })
  .validator((input: { code: string }) => input)
  .handler(async ({ data }) => {
    const h = await getHighlighter();
    return h.codeToHtml(data.code, {
      lang: 'tsx',
      themes: { dark: 'github-dark', light: 'github-light' },
    });
  });
