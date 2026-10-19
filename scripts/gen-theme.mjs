/**
 * Generates src/theme.generated.css: the soft-light and dark colour overrides for the site.
 *
 * The components use fixed Tailwind colour classes (bg-white, text-[#202124], ...). Instead of
 * rewriting every component, this script finds those classes and emits per-theme overrides.
 * Re-run it after adding new colour classes:   node scripts/gen-theme.mjs
 *
 * Skip theming for a block (e.g. a phone screen mock-up that must stay white) with the class
 * "keep-theme" on it.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../src/', import.meta.url).pathname;

// ---- palettes ----------------------------------------------------------------------------
// Surfaces and borders. `light` is the soft light theme (never pure white), `dark` the dark theme.
const SURFACE = {
  white:     { light: '#f6f7f9', dark: '#1b1d21' },
  '#fff':    { light: '#f6f7f9', dark: '#1b1d21' },
  '#ffffff': { light: '#f6f7f9', dark: '#1b1d21' },
  '#f8f9fa': { light: '#eceff3', dark: '#15171a' },
  '#f8fafd': { light: '#e9eef6', dark: '#181b20' },
  '#f1f3f4': { light: '#e2e6ec', dark: '#26292e' },
  '#e8eaed': { light: '#d9dee5', dark: '#2d3036' },
  '#dadce0': { light: '#cdd3db', dark: '#363a41' },
  '#bdc1c6': { light: '#b3bac3', dark: '#4a4f57' },
  '#e8f0fe': { light: '#dce8fb', dark: '#1c2b45' },
  '#d2e3fc': { light: '#c6d9f7', dark: '#28406a' },
  '#e6f4ea': { light: '#dcefe2', dark: '#1b3326' },
  '#ceead6': { light: '#c2e4cc', dark: '#264d34' },
  '#fef7e0': { light: '#f8efd0', dark: '#3a3118' },
  '#fce8e6': { light: '#f6dcd9', dark: '#3d1f1d' },
  '#fad2cf': { light: '#f1c7c3', dark: '#5a2b28' },
  '#fdf7f7': { light: '#f6eded', dark: '#2a1f1f' },
  '#f6fbf7': { light: '#eaf3ec', dark: '#1b2a20' },
  '#f3fbf5': { light: '#e6f3ea', dark: '#1b2a20' },
  '#202124': { dark: '#24272c' }, // dark panels sit slightly above the dark page
  '#1b1c1f': { dark: '#0f1013' },
};
// Text colours (light theme keeps the existing ones)
const TEXT = {
  '#202124': { dark: '#e8eaed' },
  '#3c4043': { dark: '#c7cbd1' },
  '#5f6368': { dark: '#9aa0a6' },
  '#1a73e8': { light: '#1557b0', dark: '#8ab4f8' },
  '#1557b0': { dark: '#aecbfa' },
  '#137333': { dark: '#81c995' },
  '#0d5324': { dark: '#81c995' },
  '#1e8e3e': { light: '#137333', dark: '#81c995' },
  '#b06000': { light: '#8f4e00', dark: '#fdd663' },
  '#d93025': { light: '#c5221f', dark: '#f28b82' },
  '#c5221f': { dark: '#f28b82' },
};
// Border-like properties use the surface table plus a few brand blues that must stay visible on dark
const BORDER = { ...SURFACE, '#1a73e8': { dark: '#8ab4f8' } };

const PROPS = {
  bg: { map: SURFACE, css: (c) => `background-color:${c}` },
  text: { map: TEXT, css: (c) => `color:${c}` },
  border: { map: BORDER, css: (c) => `border-color:${c}` },
  ring: { map: BORDER, css: (c) => `--tw-ring-color:${c}` },
};
// bg-white/NN is a surface only when it is mostly opaque (navbar glass etc.); lower values are overlays
const SURFACE_MIN_OPACITY = 80;

// ---- scan --------------------------------------------------------------------------------
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(f)) files.push(p);
  }
})(SRC);

const TOKEN =
  /((?:(?:hover|focus|active|group-hover|placeholder):)*)(bg|text|border|ring)-(\[#[0-9a-fA-F]{3,8}\]|white)(?:\/(\d+|\[[\d.]+\]))?/g;
const found = new Map();
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(TOKEN)) found.set(m[0], { variants: m[1], prop: m[2], color: m[3], opacity: m[4] });
}

// ---- emit --------------------------------------------------------------------------------
const esc = (s) => s.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
const rules = { light: [], dark: [] };

for (const [token, t] of found) {
  const color = t.color.startsWith('[') ? t.color.slice(1, -1).toLowerCase() : t.color;
  const def = PROPS[t.prop];
  if (!def) continue;
  let pct = null;
  if (t.opacity) pct = t.opacity.startsWith('[') ? Math.round(parseFloat(t.opacity.slice(1, -1)) * 100) : Number(t.opacity);
  if (color === 'white' && t.prop === 'bg' && pct !== null && pct < SURFACE_MIN_OPACITY) continue; // overlays
  if (color === 'white' && t.prop !== 'bg') continue; // text-white, border-white/10 stay as they are

  // selector for the variants
  const vs = t.variants.split(':').filter(Boolean);
  let cls = '.' + esc(token);
  let pre = '';
  let post = '';
  for (const v of vs) {
    if (v === 'hover') post += ':hover';
    else if (v === 'focus') post += ':focus';
    else if (v === 'active') post += ':active';
    else if (v === 'placeholder') post += '::placeholder';
    else if (v === 'group-hover') pre = '.group:hover ';
  }
  const guard = ':not(.keep-theme):not(.keep-theme *)';

  for (const theme of ['light', 'dark']) {
    const to = def.map[color]?.[theme];
    if (!to) continue;
    const value = pct !== null ? `color-mix(in srgb, ${to} ${pct}%, transparent)` : to;
    rules[theme].push(`html[data-theme="${theme}"] ${pre}${cls}${guard}${post}{${def.css(value)}}`);
  }
}

const header = `/* GENERATED by scripts/gen-theme.mjs. Do not edit by hand; re-run the script. */\n`;
const base = `
html[data-theme="light"]{color-scheme:light}
html[data-theme="dark"]{color-scheme:dark}
html[data-theme="light"] body{background-color:#f6f7f9}
html[data-theme="dark"] body{background-color:#1b1d21;color:#e8eaed}
/* faint grid behind the hero */
html[data-theme="light"] #overview > div.absolute{background-image:linear-gradient(to right,#e2e6ec 1px,transparent 1px),linear-gradient(to bottom,#e2e6ec 1px,transparent 1px)}
html[data-theme="dark"] #overview > div.absolute{background-image:linear-gradient(to right,#26292e 1px,transparent 1px),linear-gradient(to bottom,#26292e 1px,transparent 1px)}
`;
const css = header + base + '\n/* soft light */\n' + rules.light.sort().join('\n') + '\n\n/* dark */\n' + rules.dark.sort().join('\n') + '\n';
writeFileSync(join(SRC, 'theme.generated.css'), css);
console.log(`classes found: ${found.size}; light rules: ${rules.light.length}; dark rules: ${rules.dark.length}`);
