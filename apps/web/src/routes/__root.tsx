/// <reference types="vite/client" />

import '@fontsource-variable/inter';
import * as stylex from '@stylexjs/stylex';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { MotionProvider } from '~/providers/MotionProvider';
import { QueryProvider } from '~/providers/QueryProvider';
import { ThemeProvider, useTheme } from '~/providers/ThemeProvider';
import { getThemeFromCookie } from '~/server/theme';
import { colors, lightTheme, themeBackground } from '@base/ui/tokens/colors.stylex';
import appCss from '~/styles/global.css?url';

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

const toggleStyles = stylex.create({
  button: {
    position: 'fixed',
    top: '16px',
    right: '16px',
    zIndex: 9999,
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: colors.lighten8,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: 1,
    border: 'none',
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.lighten16,
    },
  },
});

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      {...stylex.props(toggleStyles.button)}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const themeStyle = theme === 'light' ? stylex.props(lightTheme) : {};

  return (
    <html
      lang='en'
      className={themeStyle.className}
      style={{ ...themeStyle.style, colorScheme: theme }}
    >
      <head>
        <HeadContent />
        <meta name='theme-color' content={themeBackground[theme]} />
        <StyleXCSS />
      </head>
      <body {...stylex.props(bodyStyles.base)}>
        <ThemeToggle />
        {children}
      </body>
      <Scripts />
    </html>
  );
}
