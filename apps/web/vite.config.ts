import stylex from '@stylexjs/unplugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

import path from 'node:path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV === 'development',
      devMode: 'css-only',
      runtimeInjection: false,
      aliases: {
        '~/*': [path.resolve(__dirname, 'src', '*')],
        '@base/ui/*': [path.resolve(__dirname, '..', '..', 'packages', 'ui', 'src', '*')],
      },
    }),
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
    nitro(),
  ],
});
