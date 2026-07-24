// @vitest-environment jsdom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from '.';

vi.mock('@stylexjs/stylex', () => {
  const passthrough = <Value,>(value: Value) => value;
  return {
    create: passthrough,
    createTheme: () => ({}),
    defineVars: passthrough,
    props: () => ({}),
  };
});

class TestResizeObserver implements ResizeObserver {
  readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  disconnect() {}
  observe() {}
  unobserve() {}
}

describe('Tabs selection state', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.ResizeObserver = TestResizeObserver;

    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(500);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      const width =
        this instanceof HTMLButtonElement && this.getAttribute('aria-hidden') === 'true' ? 40 : 80;
      return {
        bottom: 32,
        height: 32,
        left: 0,
        right: width,
        top: 0,
        width,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
    });

    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.restoreAllMocks();
  });

  it('does not mutate when a controlled owner keeps the same value', async () => {
    const onValueChange = vi.fn();

    await act(async () => {
      root.render(
        <Tabs.Root value='account' onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Tab value='account'>Account</Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='account'>Account panel</Tabs.Panel>
          <Tabs.Panel value='settings'>Settings panel</Tabs.Panel>
        </Tabs.Root>,
      );
    });

    const settings = Array.from(container.querySelectorAll('[role="tab"]')).find(
      tab => tab.textContent === 'Settings',
    );
    expect(settings).toBeInstanceOf(HTMLButtonElement);

    await act(async () => {
      settings?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onValueChange).toHaveBeenCalledOnce();
    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe(
      'Account',
    );
    expect(container.textContent).toContain('Account panel');
    expect(container.textContent).not.toContain('Settings panel');
  });

  it('honors cancellation for an uncontrolled selection', async () => {
    await act(async () => {
      root.render(
        <Tabs.Root defaultValue='account' onValueChange={(_next, details) => details.cancel()}>
          <Tabs.List>
            <Tabs.Tab value='account'>Account</Tabs.Tab>
            <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='account'>Account panel</Tabs.Panel>
          <Tabs.Panel value='settings'>Settings panel</Tabs.Panel>
        </Tabs.Root>,
      );
    });

    const settings = Array.from(container.querySelectorAll('[role="tab"]')).find(
      tab => tab.textContent === 'Settings',
    );

    await act(async () => {
      settings?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe(
      'Account',
    );
    expect(container.textContent).toContain('Account panel');
    expect(container.textContent).not.toContain('Settings panel');
  });
});
