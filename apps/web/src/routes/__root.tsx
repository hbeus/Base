/// <reference types="vite/client" />

import '@fontsource-variable/inter';
import * as stylex from '@stylexjs/stylex';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { MotionProvider } from '~/providers/MotionProvider';
import { QueryProvider } from '~/providers/QueryProvider';
import { ThemeProvider, useTheme } from '~/providers/ThemeProvider';
import { getThemeFromCookie } from '~/server/theme';
import { colors } from '@base/ui/tokens/colors.stylex';
import { lightTheme } from '@base/ui/tokens/colors.stylex';
import appCss from '~/styles/global.css?url';
import { useEffect } from 'react';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const theme = await getThemeFromCookie();
    return { theme };
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'base' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { theme } = Route.useRouteContext();

  return (
    <QueryProvider>
      <ThemeProvider initialTheme={theme}>
        <MotionProvider>
          <RootDocument>
            <Outlet />
          </RootDocument>
        </MotionProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

function StyleXCSS() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      // @ts-ignore
      import('virtual:stylex:css-only');
    }
  }, []);

  return import.meta.env.DEV ? (
    <link rel="stylesheet" href="/virtual:stylex.css" />
  ) : (
    <link rel="stylesheet" href="/stylex.css" />
  );
}

const bodyStyles = stylex.create({
  base: {
    backgroundColor: colors.background,
    color: colors.foregroundPrimary,
    minHeight: '100vh',
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const themeProps = theme === 'light' ? stylex.props(lightTheme) : {};

  return (
    <html lang='en' {...themeProps}>
      <head>
        <HeadContent />
        <StyleXCSS />
      </head>
      <body {...stylex.props(bodyStyles.base)}>{children}</body>
      <Scripts />
    </html>
  );
}
