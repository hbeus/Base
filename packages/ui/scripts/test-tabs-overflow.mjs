import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const docsUrl = 'http://127.0.0.1:4000/components/navigation/tabs';
const serverUrl = 'http://127.0.0.1:4000';

async function isReachable(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 30_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await isReachable(url)) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  throw new Error(`Docs server did not become ready at ${url}`);
}

let server;

if (!(await isReachable(serverUrl))) {
  server = spawn('pnpm', ['--filter', '@base/docs', 'dev'], {
    cwd: new URL('../../..', import.meta.url),
    env: process.env,
    stdio: 'ignore',
  });
  await waitForServer(serverUrl);
}

const browser = await chromium.launch();

try {
  const noScriptContext = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(docsUrl, { waitUntil: 'networkidle' });
  const serverRenderedOverflow = noScriptPage.locator(
    '[data-slot="tabs-overflow"][data-overflow-state="pending"]',
  );
  await serverRenderedOverflow.first().waitFor({ state: 'attached' });
  assert.equal(
    await serverRenderedOverflow.first().evaluate(element => getComputedStyle(element).visibility),
    'hidden',
    'Server-rendered overflow tabs must stay hidden until their final fit is known',
  );
  await noScriptContext.close();

  const page = await browser.newPage({ viewport: { width: 800, height: 900 } });

  await page.addInitScript(() => {
    window.__tabsOverflowSnapshots = [];

    const capture = () => {
      const timestamp = performance.now();
      const wrappers = Array.from(document.querySelectorAll('[data-slot="tabs-overflow"]'));

      for (const wrapper of wrappers) {
        const tabs = Array.from(wrapper.querySelectorAll('[data-slot="tabs-tab"]'))
          .filter(element => {
            const style = getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden';
          })
          .map(element => element.textContent?.trim() ?? '');

        window.__tabsOverflowSnapshots.push({
          timestamp,
          state: wrapper.getAttribute('data-overflow-state'),
          visibility: getComputedStyle(wrapper).visibility,
          tabs,
          moreVisible: Boolean(wrapper.querySelector('[data-slot="tabs-more"]')),
        });
      }
    };

    new MutationObserver(capture).observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    const sampleFrame = () => {
      capture();
      requestAnimationFrame(sampleFrame);
    };
    requestAnimationFrame(sampleFrame);
  });

  await page.goto(docsUrl, { waitUntil: 'networkidle' });
  await page.waitForSelector(
    '[data-slot="tabs-overflow"][data-overflow-state="ready"] [data-slot="tabs-more"]',
  );
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve())));

  const snapshots = await page.evaluate(() => window.__tabsOverflowSnapshots);
  const pending = snapshots.filter(snapshot => snapshot.state === 'pending');

  assert.equal(
    pending.some(snapshot => snapshot.visibility !== 'hidden'),
    false,
    'Pending overflow tabs were painted before their final fit was known',
  );
  assert.ok(
    await page
      .locator('[data-slot="tabs-overflow"][data-overflow-state="ready"] [data-slot="tabs-more"]')
      .count(),
    'Expected the constrained fixture to settle with a More trigger',
  );

  const matchingOverflow = page
    .locator('[data-slot="tabs-overflow"][data-overflow-state="ready"]')
    .filter({ has: page.locator('[data-slot="tabs-more"]') })
    .first();
  await matchingOverflow.evaluate(element => element.setAttribute('data-test-overflow', 'primary'));

  const overflow = page.locator('[data-test-overflow="primary"]');
  const tabList = overflow.locator('[data-slot="tabs-list"]');
  const more = overflow.locator('[data-slot="tabs-more"]');

  assert.equal(
    await tabList.locator('[data-slot="tabs-more"]').count(),
    0,
    'The More menu trigger must not be nested inside role="tablist"',
  );

  await overflow.evaluate(element => {
    const root = element.closest('[data-slot="tabs"]');
    if (root instanceof HTMLElement) {
      root.style.maxWidth = 'none';
      root.style.position = 'fixed';
      root.style.inset = '1rem auto auto 1rem';
      root.style.width = '70rem';
    }
  });
  await more.waitFor({ state: 'detached' });

  await overflow.evaluate(element => {
    const root = element.closest('[data-slot="tabs"]');
    if (root instanceof HTMLElement) {
      root.style.width = '20rem';
    }
  });
  await more.waitFor({ state: 'attached' });

  await more.click();
  await page
    .getByRole('menuitemradio', { name: /Notifications/ })
    .first()
    .click();

  const selectedPanel = page
    .locator('[data-slot="tabs-panel"]')
    .filter({ hasText: 'Email and push notification preferences.' })
    .first();
  await selectedPanel.waitFor();

  assert.equal(
    await selectedPanel.getAttribute('aria-labelledby'),
    await more.getAttribute('id'),
    'An overflow-selected panel must be labelled by the active More trigger',
  );
} finally {
  await browser.close();
  server?.kill('SIGTERM');
}
