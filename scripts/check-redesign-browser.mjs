import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ORIGIN = pathToFileURL(resolve(SCRIPT_DIR, '..', 'dist')).href.replace(/\/$/, '');
const DEFAULT_CDP = 'http://127.0.0.1:9226';
const ROUTES = ['/', '/about', '/cameras', '/contact', '/cv', '/forgeworks', '/orion', '/pricing', '/projects', '/services'];
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 1, mobile: true },
  { name: 'desktop', width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false },
];
const EXPECTED_HOME_SECTIONS = ['services', 'selected-work', 'how-i-work', 'about', 'contact'];
const TIMEOUT_MS = 10_000;

function routeUrl(origin, route) {
  if (!origin.startsWith('file:')) return `${origin}${route}`;
  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  return `${origin.replace(/\/$/, '')}/${filename}`;
}

class CdpClient {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    await new Promise((resolveOpen, rejectOpen) => {
      const timer = setTimeout(() => rejectOpen(new Error('Timed out connecting to Chromium CDP')), TIMEOUT_MS);
      this.socket.addEventListener('open', () => {
        clearTimeout(timer);
        resolveOpen();
      }, { once: true });
      this.socket.addEventListener('error', () => {
        clearTimeout(timer);
        rejectOpen(new Error('Could not connect to Chromium CDP'));
      }, { once: true });
    });

    this.socket.addEventListener('message', async ({ data }) => {
      const raw = typeof data === 'string'
        ? data
        : data instanceof Blob
          ? await data.text()
          : new TextDecoder().decode(data);
      const message = JSON.parse(raw);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        clearTimeout(pending.timer);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result ?? {});
        return;
      }

      const callbacks = this.listeners.get(message.method) ?? [];
      for (const callback of callbacks) callback(message.params ?? {});
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolveSend, rejectSend) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        rejectSend(new Error(`${method} timed out`));
      }, TIMEOUT_MS);
      this.pending.set(id, { resolve: resolveSend, reject: rejectSend, timer, method });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, callback) {
    const callbacks = this.listeners.get(method) ?? [];
    this.listeners.set(method, [...callbacks, callback]);
    return () => this.listeners.set(method, (this.listeners.get(method) ?? []).filter((item) => item !== callback));
  }

  waitFor(method, predicate = () => true) {
    return new Promise((resolveEvent, rejectEvent) => {
      const timer = setTimeout(() => {
        unsubscribe();
        rejectEvent(new Error(`${method} timed out`));
      }, TIMEOUT_MS);
      const unsubscribe = this.on(method, (params) => {
        if (!predicate(params)) return;
        clearTimeout(timer);
        unsubscribe();
        resolveEvent(params);
      });
    });
  }

  close() {
    this.socket.close();
  }
}

async function createTarget(cdpOrigin) {
  const response = await fetch(`${cdpOrigin}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' });
  if (!response.ok) throw new Error(`Could not create CDP target: HTTP ${response.status}`);
  return response.json();
}

async function closeTarget(cdpOrigin, id) {
  await fetch(`${cdpOrigin}/json/close/${id}`).catch(() => {});
}

async function evaluate(client, expression, awaitPromise = false) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result?.value;
}

async function navigate(client, url) {
  const result = await client.send('Page.navigate', { url });
  if (result.errorText) throw new Error(`Navigation failed: ${result.errorText}`);
  const deadline = Date.now() + TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      if (await evaluate(client, `document.readyState === 'complete'`)) break;
    } catch {
      // The old execution context can disappear briefly during navigation.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 50));
  }
  if (Date.now() >= deadline) throw new Error(`Navigation timed out: ${url}`);
  await evaluate(client, 'document.fonts ? document.fonts.ready.then(() => true) : true', true);
}

function installFailureCollectors(client) {
  const failures = [];
  const requestUrls = new Map();
  const record = (message) => failures.push(message);

  client.on('Runtime.exceptionThrown', ({ exceptionDetails }) => {
    record(`uncaught exception: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`);
  });
  client.on('Runtime.consoleAPICalled', ({ type, args }) => {
    if (type !== 'error' && type !== 'assert') return;
    record(`console.${type}: ${args.map((item) => item.value ?? item.description ?? '').join(' ')}`);
  });
  client.on('Log.entryAdded', ({ entry }) => {
    if (entry.level === 'error') record(`browser log: ${entry.text}`);
  });
  client.on('Network.requestWillBeSent', ({ requestId, request }) => {
    requestUrls.set(requestId, request.url);
  });
  client.on('Network.loadingFailed', ({ requestId, errorText, canceled }) => {
    if (!canceled) record(`request failed: ${requestUrls.get(requestId) ?? requestId} (${errorText})`);
  });
  client.on('Network.responseReceived', ({ response }) => {
    if (response.status >= 400) record(`HTTP ${response.status}: ${response.url}`);
  });

  return failures;
}

async function inspectLayout(client) {
  return evaluate(client, `(async () => {
    const images = [...document.images];
    await Promise.all(images.map(async (image) => {
      image.loading = 'eager';
      if (image.complete) return;
      await Promise.race([
        new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        }),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
    }));
    const root = document.documentElement;
    const viewportWidth = window.innerWidth;
    const overflow = root.scrollWidth > viewportWidth + 1
      ? { scrollWidth: root.scrollWidth, viewportWidth }
      : null;
    const controls = [...document.querySelectorAll('a[href], button, input, select, textarea')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.getAttribute('aria-label') || element.textContent.trim().slice(0, 60) || element.name || element.tagName,
          left: Math.round(rect.left * 10) / 10,
          right: Math.round(rect.right * 10) / 10,
        };
      })
      .filter(({ left, right }) => left < -1 || right > viewportWidth + 1);
    const brokenImages = images
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);
    const parseColor = (value) => {
      const parts = value.match(/[\\d.]+/g)?.map(Number) ?? [];
      return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0, a: parts[3] ?? 1 };
    };
    const composite = (front, back) => ({
      r: front.r * front.a + back.r * (1 - front.a),
      g: front.g * front.a + back.g * (1 - front.a),
      b: front.b * front.a + back.b * (1 - front.a),
      a: 1,
    });
    const luminance = ({ r, g, b }) => {
      const channel = (value) => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const contrastTargets = [...document.querySelectorAll([
      '.uy-pagehead__crumb',
      '.uy-pagehead .uy-eyebrow',
      '.uy-pagehead .uy-lede',
      '.uy-pagehead .uy-body',
      '.uy-footer__social-link',
      '.uy-footer__bottom',
      '.uy-footer p',
      '.uy-footer a',
    ].join(','))];
    const contrastFailures = contrastTargets.flatMap((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
      const ancestors = [];
      for (let current = element; current; current = current.parentElement) ancestors.unshift(current);
      let background = { r: 255, g: 255, b: 255, a: 1 };
      for (const ancestor of ancestors) {
        const ancestorStyle = getComputedStyle(ancestor);
        const backgroundColor = parseColor(ancestorStyle.backgroundColor);
        const gradientColors = [...ancestorStyle.backgroundImage.matchAll(/rgba?\\([^)]*\\)/g)]
          .map(([value]) => parseColor(value))
          .filter(({ a }) => a >= 0.99);
        const paintedBackground = backgroundColor.a > 0 ? backgroundColor : gradientColors.at(-1);
        if (paintedBackground) background = composite(paintedBackground, background);
      }
      const foreground = composite(parseColor(style.color), background);
      const light = Math.max(luminance(foreground), luminance(background));
      const dark = Math.min(luminance(foreground), luminance(background));
      const ratio = (light + 0.05) / (dark + 0.05);
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
      const large = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const minimum = large ? 3 : 4.5;
      return ratio + 0.01 < minimum ? [{
        label: element.textContent.trim().replace(/\\s+/g, ' ').slice(0, 80),
        ratio: Math.round(ratio * 100) / 100,
        minimum,
      }] : [];
    });
    return { overflow, controls, brokenImages, contrastFailures };
  })()`, true);
}

async function checkHome(client, viewport, reviewDir) {
  const sections = await evaluate(client, `[
    ...document.querySelectorAll('main > section[id]')
  ].map((section) => section.id)`);
  assert.deepEqual(sections, EXPECTED_HOME_SECTIONS, 'homepage numbered section sequence');

  if (viewport.mobile) {
    const menuResult = await evaluate(client, `(async () => {
      const toggle = document.querySelector('.uy-nav__toggle');
      const menu = document.querySelector('#uy-mobile-menu');
      if (!toggle || !menu) return { error: 'mobile menu controls missing' };
      toggle.focus();
      toggle.click();
      const opened = toggle.getAttribute('aria-expanded') === 'true' && getComputedStyle(menu).display !== 'none';
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      return {
        opened,
        closed: toggle.getAttribute('aria-expanded') === 'false',
        focusReturned: document.activeElement === toggle,
      };
    })()`, true);
    assert.deepEqual(menuResult, { opened: true, closed: true, focusReturned: true });

    const linkClose = await evaluate(client, `(() => {
      const toggle = document.querySelector('.uy-nav__toggle');
      const link = document.querySelector('#uy-mobile-menu a');
      link.addEventListener('click', (event) => event.preventDefault(), { once: true });
      toggle.click();
      link.click();
      return toggle.getAttribute('aria-expanded') === 'false';
    })()`);
    assert.equal(linkClose, true, 'mobile menu link should close the menu');

    await evaluate(client, `document.querySelector('.uy-nav__toggle').click()`);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1200, height: viewport.height, deviceScaleFactor: 1, mobile: false,
    });
    const resizeClosed = await evaluate(client, `new Promise((resolve) => setTimeout(() => {
      resolve(document.querySelector('.uy-nav__toggle').getAttribute('aria-expanded') === 'false');
    }, 100))`, true);
    assert.equal(resizeClosed, true, 'desktop resize should close the mobile menu');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    });
  }

  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  });
  writeFileSync(join(reviewDir, `homepage-${viewport.width}.png`), Buffer.from(screenshot.data, 'base64'));
}

async function checkAboutDialog(client) {
  const result = await evaluate(client, `(() => {
    const trigger = document.querySelector('[data-uy-headshot-open]');
    const dialog = document.querySelector('#uy-headshot-dialog');
    if (!trigger || !dialog) return { error: 'headshot dialog controls missing' };
    trigger.click();
    const opened = dialog.open;
    dialog.close();
    return { opened, closed: !dialog.open };
  })()`);
  assert.deepEqual(result, { opened: true, closed: true });
}

async function checkPrintButton(client) {
  const calls = await evaluate(client, `(() => {
    const button = document.querySelector('[data-uy-print]');
    if (!button) return -1;
    button.click();
    return window.__printMockCalls;
  })()`);
  assert.equal(calls, 1, 'CV print button should call window.print once');
}

function summarizeCoverage(entries) {
  const ranges = [];
  const functions = new Map();
  let totalBytes = 0;
  for (const entry of entries) {
    for (const fn of entry.functions) {
      const rootRange = fn.ranges[0];
      totalBytes = Math.max(totalBytes, rootRange.endOffset);
      const key = `${fn.functionName}:${rootRange.startOffset}:${rootRange.endOffset}`;
      functions.set(key, (functions.get(key) ?? false) || rootRange.count > 0);
      ranges.push(...fn.ranges);
    }
  }

  const boundaries = [...new Set([0, totalBytes, ...ranges.flatMap(({ startOffset, endOffset }) => [startOffset, endOffset])])]
    .sort((left, right) => left - right);
  let coveredBytes = 0;
  for (let index = 0; index < boundaries.length - 1; index += 1) {
    const start = boundaries[index];
    const end = boundaries[index + 1];
    const matching = ranges
      .filter((range) => range.startOffset <= start && range.endOffset >= end)
      .sort((left, right) => (left.endOffset - left.startOffset) - (right.endOffset - right.startOffset));
    const mostSpecificWidth = matching[0] ? matching[0].endOffset - matching[0].startOffset : -1;
    const mostSpecific = matching.filter((range) => range.endOffset - range.startOffset === mostSpecificWidth);
    if (mostSpecific.some(({ count }) => count > 0)) coveredBytes += end - start;
  }

  const executedFunctions = [...functions.values()].filter(Boolean).length;
  return {
    coveredBytes,
    totalBytes,
    bytePercent: totalBytes ? (coveredBytes / totalBytes) * 100 : 0,
    executedFunctions,
    totalFunctions: functions.size,
    functionPercent: functions.size ? (executedFunctions / functions.size) * 100 : 0,
  };
}

async function checkContactForm(client) {
  const formResult = await evaluate(client, `(async () => {
    const form = document.querySelector('[data-uy-form]');
    const status = form?.querySelector('[data-uy-form-status]');
    if (!form || !status) return { error: 'contact form controls missing' };
    const set = (selector, value) => {
      const input = form.querySelector(selector);
      if (!input) throw new Error('missing field ' + selector);
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const waitFor = async (predicate) => {
      const deadline = performance.now() + 3000;
      while (!predicate()) {
        if (performance.now() > deadline) throw new Error('form result timed out');
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    };
    set('#name', 'Browser Check');
    set('#email', 'browser-check@example.invalid');
    set('#category', 'websites');
    set('#message', 'This message is intercepted locally and is never sent.');

    window.__contactMockMode = 'success';
    form.requestSubmit();
    await waitFor(() => status.textContent.includes('Mock request accepted.'));
    const success = status.textContent.trim();

    set('#name', 'Browser Check');
    set('#email', 'browser-check@example.invalid');
    set('#category', 'websites');
    set('#message', 'This second message is also intercepted locally.');
    window.__contactMockMode = 'failure';
    form.requestSubmit();
    await waitFor(() => status.textContent.includes('Mock request rejected.'));
    return { success, failure: status.textContent.trim(), calls: window.__contactMockCalls };
  })()`, true);

  assert.deepEqual(formResult, {
    success: 'Mock request accepted.',
    failure: 'Mock request rejected.',
    calls: 2,
  });
}

async function runViewport({ origin, cdpOrigin, viewport, reviewDir }) {
  const target = await createTarget(cdpOrigin);
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  const failures = installFailureCollectors(client);
  const coverageEntries = [];

  try {
    await Promise.all([
      client.send('Page.enable'),
      client.send('Runtime.enable'),
      client.send('Network.enable'),
      client.send('Log.enable'),
      client.send('Profiler.enable'),
    ]);
    await client.send('Profiler.startPreciseCoverage', { callCount: true, detailed: true });
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
    });
    await client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        const nativeFetch = window.fetch.bind(window);
        window.__contactMockMode = 'success';
        window.__contactMockCalls = 0;
        window.__printMockCalls = 0;
        window.print = () => { window.__printMockCalls += 1; };
        window.fetch = (...args) => {
          const requestUrl = String(args[0] instanceof Request ? args[0].url : args[0]);
          if (!requestUrl.endsWith('/api/contact')) return nativeFetch(...args);
          window.__contactMockCalls += 1;
          if (window.__contactMockMode === 'success') {
            return Promise.resolve(new Response(JSON.stringify({ ok: true, message: 'Mock request accepted.' }), {
              status: 200,
              headers: { 'content-type': 'application/json' },
            }));
          }
          return Promise.resolve(new Response(JSON.stringify({ ok: false, error: 'Mock request rejected.' }), {
            status: 503,
            headers: { 'content-type': 'application/json' },
          }));
        };
      })();`,
    });

    for (const route of ROUTES) {
      const failureStart = failures.length;
      await navigate(client, routeUrl(origin, route));
      const layout = await inspectLayout(client);
      assert.equal(layout.overflow, null, `${viewport.name} ${route}: horizontal document overflow`);
      assert.deepEqual(layout.controls, [], `${viewport.name} ${route}: controls outside viewport`);
      assert.deepEqual(layout.brokenImages, [], `${viewport.name} ${route}: broken images`);
      assert.deepEqual(layout.contrastFailures, [], `${viewport.name} ${route}: low text contrast`);
      assert.deepEqual(failures.slice(failureStart), [], `${viewport.name} ${route}: browser/runtime/request failures`);

      if (route === '/') await checkHome(client, viewport, reviewDir);
      if (route === '/about') await checkAboutDialog(client);
      if (route === '/contact') await checkContactForm(client);
      if (route === '/cv') await checkPrintButton(client);
      const routeCoverage = await client.send('Profiler.takePreciseCoverage');
      coverageEntries.push(...routeCoverage.result.filter(({ url }) => url === `${origin.replace(/\/$/, '')}/index.js`));
      console.log(`PASS ${viewport.width}px ${route}`);
    }
    await client.send('Profiler.stopPreciseCoverage');
    return coverageEntries;
  } finally {
    client.close();
    await closeTarget(cdpOrigin, target.id);
  }
}

export async function runBrowserChecks({
  origin = DEFAULT_ORIGIN,
  cdpOrigin = DEFAULT_CDP,
  reviewDir = resolve(SCRIPT_DIR, '..', '.impeccable', 'review'),
} = {}) {
  mkdirSync(reviewDir, { recursive: true });
  const coverageEntries = [];
  for (const viewport of VIEWPORTS) {
    coverageEntries.push(...await runViewport({ origin, cdpOrigin, viewport, reviewDir }));
  }
  const coverage = summarizeCoverage(coverageEntries);
  console.log(`index.js precise coverage: ${coverage.bytePercent.toFixed(1)}% bytes (${coverage.coveredBytes}/${coverage.totalBytes}), ${coverage.functionPercent.toFixed(1)}% functions (${coverage.executedFunctions}/${coverage.totalFunctions}).`);
  assert.ok(coverage.bytePercent >= 80, `index.js byte coverage ${coverage.bytePercent.toFixed(1)}% is below 80%`);
  assert.ok(coverage.functionPercent >= 80, `index.js function coverage ${coverage.functionPercent.toFixed(1)}% is below 80%`);
  console.log(`Browser checks passed for ${ROUTES.length} routes at ${VIEWPORTS.map(({ width }) => width).join('px and ')}px.`);
  return coverage;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const origin = process.argv[2] ?? DEFAULT_ORIGIN;
  const cdpOrigin = process.argv[3] ?? DEFAULT_CDP;
  await runBrowserChecks({ origin, cdpOrigin });
}
