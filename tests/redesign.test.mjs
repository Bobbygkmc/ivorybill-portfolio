import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  attributeValue,
  findBrokenLocalLinks,
  findElements,
  normalizeHtmlText,
} from '../scripts/check-redesign.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = readFileSync(join(root, 'index.html'), 'utf8');

function section(id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = homepage.match(new RegExp(`<section\\b[^>]*\\bid=(["'])${escaped}\\1[^>]*>([\\s\\S]*?)<\\/section>`, 'i'));
  assert.ok(match, `homepage should contain section #${id}`);
  return match[2];
}

test('hero states the local service promise and links its CTA to contact', () => {
  const hero = findElements(homepage, 'section', 'uy-hero');
  assert.equal(hero.length, 1, 'homepage should have one hero');

  const headings = findElements(hero[0].innerHtml, 'h1');
  assert.equal(headings.length, 1);
  assert.equal(headings[0].text, 'I run the shift, not just the code.');

  const ledes = findElements(hero[0].innerHtml, 'p', 'uy-lede');
  assert.ok(ledes.some(({ text }) => text === 'Tech for local businesses — cameras, networks, POS, Wi-Fi, websites. Installed, documented, supported.'));

  const links = findElements(hero[0].innerHtml, 'a');
  const cta = links.find(({ text }) => text === "Got a broken network or a project? Let's talk." || text === 'Got a broken network or a project? Let’s talk.');
  assert.ok(cta, 'hero should contain the approved CTA copy');
  assert.match(attributeValue(cta.attributes, 'href') ?? '', /^(?:#contact|\/contact|contact\.html)$/);

  assert.doesNotMatch(hero[0].innerHtml, /<img\b/i, 'hero should not contain a broken or placeholder work photo');
  assert.doesNotMatch(normalizeHtmlText(hero[0].innerHtml), /reserved for a real work photo/i);
});

test('numbered homepage sections appear in the requested order', () => {
  const expected = [
    ['services', '01 Services'],
    ['selected-work', '02 Selected work'],
    ['how-i-work', '03 How I work'],
    ['about', '04 About'],
    ['contact', '05 Contact'],
  ];
  const positions = [];

  for (const [id, label] of expected) {
    const markup = section(id);
    assert.ok(normalizeHtmlText(markup).includes(label), `#${id} should show “${label}”`);
    positions.push(homepage.search(new RegExp(`<section\\b[^>]*\\bid=(["'])${id}\\1`, 'i')));
  }

  assert.deepEqual(positions, [...positions].sort((left, right) => left - right));
});

test('services are five work-order tickets with scope, timeline, and handoff fields', () => {
  const services = section('services');
  const tickets = findElements(services, 'article', 'work-ticket');
  assert.equal(tickets.length, 5);

  const serviceNames = tickets.map(({ innerHtml }) => findElements(innerHtml, 'h3')[0]?.text.toLowerCase());
  for (const expectedName of ['security cameras', 'networking & wi-fi', 'pos systems', 'websites', 'restaurant systems']) {
    assert.ok(serviceNames.includes(expectedName), `missing ${expectedName} work ticket`);
  }

  for (const ticket of tickets) {
    assert.equal(findElements(ticket.innerHtml, 'div', 'work-ticket__scope').length, 1);
    assert.equal(findElements(ticket.innerHtml, 'div', 'work-ticket__timeline').length, 1);
    assert.equal(findElements(ticket.innerHtml, 'div', 'work-ticket__handoff').length, 1);
    assert.match(ticket.text, /\bScope\b/);
    assert.match(ticket.text, /\bTimeline\b/);
    assert.match(ticket.text, /\bHandoff\b/);
  }
});

test('selected work uses each documented status badge variant', () => {
  const selectedWork = section('selected-work');
  const badges = findElements(selectedWork, 'span', 'status-badge');
  const statuses = new Set(badges.map(({ attributes }) => attributeValue(attributes, 'data-status')));

  assert.deepEqual(statuses, new Set(['deployed', 'in-progress', 'supported']));
  for (const badge of badges) {
    assert.match(badge.text, /^(?:DEPLOYED|IN PROGRESS|SUPPORTED)$/);
  }
});

test('public HTML routes do not contain broken local links or fragment targets', () => {
  assert.deepEqual(findBrokenLocalLinks(root), []);
});

test('the linked pricing page is not redirected away by Cloudflare', () => {
  assert.ok(homepage.includes('href="/pricing"'));
  const redirects = readFileSync(join(root, '_redirects'), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
  assert.ok(!redirects.some((line) => /^\/pricing(?:\s|\/|\*)/.test(line)),
    'the homepage pricing link must reach the pricing page');
});

test('Cloudflare receives a real not-found page instead of the homepage fallback', () => {
  const notFound = readFileSync(join(root, '404.html'), 'utf8');
  assert.match(notFound, /<h1\b[^>]*>Page not found\.<\/h1>/);
  assert.match(notFound, /name="robots" content="noindex"/);
  assert.match(notFound, /href="\/css\/style\.css"/);
  assert.match(notFound, /href="\/"/);
});
