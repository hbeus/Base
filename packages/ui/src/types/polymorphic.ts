import type { ComponentPropsWithoutRef, ComponentRef, Ref } from 'react';

import type { BaseProps } from './BaseProps';

export type PolymorphicProps<
  As extends keyof React.JSX.IntrinsicElements,
  OwnProps,
  OmitKeys extends string = never,
> = { as?: As; ref?: Ref<ComponentRef<As>> } & OwnProps &
  BaseProps &
  Omit<ComponentPropsWithoutRef<As>, 'as' | 'style' | OmitKeys | keyof OwnProps>;

export type PolymorphicComponent<
  DefaultAs extends keyof React.JSX.IntrinsicElements,
  OwnProps,
  OmitKeys extends string = never,
> = <As extends keyof React.JSX.IntrinsicElements = DefaultAs>(
  props: PolymorphicProps<As, OwnProps, OmitKeys>,
) => React.JSX.Element;
