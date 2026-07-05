/// <reference types="vite/client" />

import { colors, lightTheme, themeBackground } from '@base/ui/tokens/colors.stylex';

import * as stylex from '@stylexjs/stylex';
import { IconArrowLeft, IconContrast } from '@tabler/icons-react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { MotionProvider } from '~/providers/MotionProvider';
import { QueryProvider } from '~/providers/QueryProvider';
import { ThemeProvider, useTheme } from '~/providers/ThemeProvider';
import { getThemeFromCookie } from '~/server/theme';
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
    links: [
      {
        rel: 'preload',
        href: '/fonts/inter-latin-wght-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
    ],
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
      // @ts-expect-error
      import('virtual:stylex:css-only');
    }
  }, []);

  return import.meta.env.DEV ? (
    <link rel='stylesheet' href='/virtual:stylex.css' />
  ) : (
    <link rel='stylesheet' href='/stylex.css' />
  );
}

const bodyStyles = stylex.create({
  base: {
    backgroundColor: colors.background,
    color: colors.foregroundPrimary,
    minHeight: '100vh',
  },
});

const fixedButtonStyles = stylex.create({
  base: {
    position: 'fixed',
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
  topRight: {
    top: '16px',
    right: '16px',
  },
  topLeft: {
    top: '16px',
    left: '16px',
  },
});

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      {...stylex.props(fixedButtonStyles.base, fixedButtonStyles.topRight)}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <IconContrast size={18} />
    </button>
  );
}

function BackButton() {
  const router = useRouter();
  const pathname = useRouterState({ select: s => s.location.pathname });

  if (pathname === '/') return null;

  return (
    <button
      {...stylex.props(fixedButtonStyles.base, fixedButtonStyles.topLeft)}
      onClick={() => router.history.back()}
      aria-label='Go back'
    >
      <IconArrowLeft size={18} />
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
        <BackButton />
        <ThemeToggle />
        {children}
      </body>
      <Scripts />
    </html>
  );
}
