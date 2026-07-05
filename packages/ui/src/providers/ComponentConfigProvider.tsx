import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';
import { createStore } from 'zustand';

import type { ButtonProps } from '../components/input/Button';
import type { InputProps } from '../components/input/Input';
import type { PressableProps } from '../components/input/Pressable';
import type { ToggleProps } from '../components/input/Toggle';
import type { CardProps } from '../components/layout/Card';
import type { DialogContentProps } from '../components/overlays/Dialog';
import type { TextProps } from '../components/typography/Text';

interface ComponentConfigMap {
  Button: Partial<ButtonProps>;
  Card: Partial<CardProps>;
  Dialog: Partial<DialogContentProps>;
  Input: Partial<InputProps>;
  Pressable: Partial<PressableProps>;
  Text: Partial<TextProps>;
  Toggle: Partial<ToggleProps>;
}

export type ComponentConfig = {
  [K in keyof ComponentConfigMap]?: ComponentConfigMap[K];
};

type ComponentConfigStore = ReturnType<typeof createComponentConfigStore>;

function createComponentConfigStore(config: ComponentConfig) {
  return createStore<ComponentConfig>()(() => config);
}

const ComponentConfigContext = createContext<ComponentConfigStore | null>(null);

export function ComponentConfigProvider({
  config,
  children,
}: {
  config: ComponentConfig;
  children: ReactNode;
}) {
  const storeRef = useRef<ComponentConfigStore>(null);
  if (!storeRef.current) {
    storeRef.current = createComponentConfigStore(config);
  }
  return <ComponentConfigContext value={storeRef.current}>{children}</ComponentConfigContext>;
}

export function useComponentConfig<K extends keyof ComponentConfigMap, P extends ComponentConfigMap[K]>(
  component: K,
  props: P,
): P {
  const store = useContext(ComponentConfigContext);
  if (!store) return props;
  const defaults = store.getState()[component];
  if (!defaults) return props;
  return { ...defaults, ...props };
}
