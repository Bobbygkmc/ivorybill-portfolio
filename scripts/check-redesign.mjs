import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const EXTERNAL_SCHEMES = /^(?:https?:|mailto:|tel:|data:|javascript:)/i;

export function normalizeHtmlText(markup) {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#39|apos);/gi, "'")
    .replace(/&(?:#8217|rsquo);/gi, '’')
    .replace(/&mdash;/gi, '—')
    .replace(/&ndash;/gi, '–')
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function findElements(markup, tagName, className) {
  const tag = tagName.replace(/[^a-z0-9-]/gi, '');
  const pattern = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  return [...markup.matchAll(pattern)]
    .filter((match) => {
      const classes = attributeValue(match[1], 'class')?.split(/\s+/) ?? [];
      return !className || classes.includes(className);
    })
    .map((match) => ({
      attributes: match[1],
      innerHtml: match[2],
      text: normalizeHtmlText(match[2]),
    }));
}

export function attributeValue(attributes, name) {
  const escapedName = name.replace(/[^a-z0-9-]/gi, '');
  const match = attributes.match(new RegExp(`(?:^|\\s)${escapedName}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2];
}

function routeFile(root, pathname, sourceFile) {
  if (!pathname) return sourceFile;

  const decoded = decodeURIComponent(pathname);
  if (decoded.startsWith('/')) {
    if (decoded === '/') return join(root, 'index.html');
    const relative = decoded.replace(/^\/+/, '');
    return extname(relative) ? join(root, relative) : join(root, `${relative}.html`);
  }

  const candidate = resolve(dirname(sourceFile), decoded);
  if (extname(candidate)) return candidate;
  return `${candidate}.html`;
}

function hasFragment(file, fragment) {
  if (!fragment) return true;
  const markup = readFileSync(file, 'utf8');
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\bid\\s*=\\s*(["'])${escaped}\\1`, 'i').test(markup);
}

export function findBrokenLocalLinks(root) {
  const htmlFiles = readdirSync(root)
    .filter((name) => name.endsWith('.html'))
    .map((name) => join(root, name));
  const failures = [];

  for (const sourceFile of htmlFiles) {
    const markup = readFileSync(sourceFile, 'utf8');
    for (const match of markup.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)) {
      const href = match[2].trim();
      if (!href || EXTERNAL_SCHEMES.test(href) || href.startsWith('//')) continue;

      const [pathname, rawFragment = ''] = href.split('#', 2);
      const targetFile = routeFile(root, pathname, sourceFile);
      const fragment = decodeURIComponent(rawFragment);
      if (!existsSync(targetFile)) {
        failures.push(`${sourceFile.slice(root.length + 1)}: ${href} targets a missing file`);
      } else if (!hasFragment(targetFile, fragment)) {
        failures.push(`${sourceFile.slice(root.length + 1)}: ${href} targets a missing id`);
      }
    }
  }

  return failures;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const root = resolve(process.argv[2] ?? '.');
  const failures = findBrokenLocalLinks(root);
  if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('All public HTML links resolve locally.');
  }
}
