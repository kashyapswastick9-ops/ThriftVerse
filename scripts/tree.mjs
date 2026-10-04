#!/usr/bin/env node
/**
 * scripts/tree.mjs
 * Prints the src/ directory tree to depth 3.
 * Uses Node built-ins only — no dependencies.
 * Ignores: node_modules, dist, .git, .DS_Store
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');

const IGNORE = new Set(['node_modules', 'dist', '.git', '.DS_Store', '.cache']);
const MAX_DEPTH = 3;

// ── ANSI helpers ─────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  cyan:   '\x1b[36m',
  yellow: '\x1b[33m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
};

function fmt(s, ...codes) {
  return codes.join('') + s + c.reset;
}

// ── Tree printer ──────────────────────────────────────────────────────────────
function printTree(dir, prefix = '', depth = 0) {
  if (depth > MAX_DEPTH) return;

  let entries;
  try {
    entries = readdirSync(dir).filter(e => !IGNORE.has(e)).sort();
  } catch {
    console.error(fmt(`  Cannot read directory: ${dir}`, c.red));
    return;
  }

  entries.forEach((entry, idx) => {
    const fullPath = join(dir, entry);
    const isLast   = idx === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPfx  = isLast ? '    ' : '│   ';

    let stat;
    try { stat = statSync(fullPath); } catch { return; }

    if (stat.isDirectory()) {
      console.log(prefix + connector + fmt(entry + '/', c.bold, c.cyan));
      printTree(fullPath, prefix + childPfx, depth + 1);
    } else {
      const ext = entry.split('.').pop() ?? '';
      const color = ['ts', 'tsx'].includes(ext) ? c.green
                  : ['css', 'scss'].includes(ext) ? c.yellow
                  : c.reset;
      console.log(prefix + connector + fmt(entry, color));
    }
  });
}

// ── Entry point ───────────────────────────────────────────────────────────────
console.log();
if (!existsSync(SRC)) {
  console.log(fmt('  ℹ  src/ does not exist yet — nothing to display.', c.yellow));
  console.log(fmt('     Run Prompt 1 to scaffold the app in this directory.', c.dim));
  console.log();
  process.exit(0);
}

console.log(fmt('THRIFTVERSE — src/ tree (depth ≤ 3)', c.bold));
console.log(fmt('─'.repeat(50), c.dim));
console.log(fmt('src/', c.bold, c.cyan));
printTree(SRC);
console.log(fmt('─'.repeat(50), c.dim));
console.log(fmt(`Root: ${relative(process.cwd(), SRC)}`, c.dim));
console.log();
