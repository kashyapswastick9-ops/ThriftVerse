#!/usr/bin/env node
/**
 * scripts/handoff-check.mjs
 * Cross-references files on disk under src/ with those listed in
 * PROJECT_HANDOFF.md section 3 (FILE TREE).
 * Also warns if PROJECT_HANDOFF.md is older than the newest file in src/.
 * Uses Node built-ins only — no dependencies.
 * Exits 0 in all cases (errors are warnings, not fatal).
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = join(__dirname, '..');
const SRC       = join(ROOT, 'src');
const HANDOFF   = join(ROOT, 'PROJECT_HANDOFF.md');

const IGNORE = new Set(['node_modules', 'dist', '.git', '.DS_Store', '.cache']);

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
const ok    = (s) => console.log(`  ${c.green}✔${c.reset}  ${s}`);
const warn  = (s) => console.log(`  ${c.yellow}⚠${c.reset}  ${s}`);
const info  = (s) => console.log(`  ${c.cyan}ℹ${c.reset}  ${s}`);
const err   = (s) => console.log(`  ${c.red}✖${c.reset}  ${s}`);
const head  = (s) => console.log(`\n${c.bold}${s}${c.reset}`);
const rule  = ()  => console.log(`${c.dim}${'─'.repeat(55)}${c.reset}`);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Recursively collect all file paths under dir (relative to ROOT) */
function collectFiles(dir, collected = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return collected; }

  for (const entry of entries) {
    if (IGNORE.has(entry)) continue;
    const full = join(dir, entry);
    let stat;
    try { stat = statSync(full); } catch { continue; }
    if (stat.isDirectory()) {
      collectFiles(full, collected);
    } else {
      collected.push(relative(ROOT, full)); // e.g. "src/main.tsx"
    }
  }
  return collected;
}

/** Find the modification time of the newest file in a list */
function newestMtime(files) {
  let newest = 0;
  for (const f of files) {
    try {
      const mt = statSync(join(ROOT, f)).mtimeMs;
      if (mt > newest) newest = mt;
    } catch { /* ignore */ }
  }
  return newest;
}

/**
 * Extract file paths from PROJECT_HANDOFF.md section 3 (FILE TREE).
 * Looks for code blocks between "## 3. FILE TREE" and the next "## " heading.
 * Treats any line that looks like a file path (contains a dot, no trailing /)
 * extracted from tree connectors (├── / └── / │) as a documented file.
 */
function parseHandoffTree(content) {
  const section3Match = content.match(/## 3\. FILE TREE([\s\S]*?)(?=\n## )/);
  if (!section3Match) return [];

  const block = section3Match[1];
  const documented = new Set();

  // Match tree-connector lines and extract the filename
  // Also match plain "src/..." paths
  const treeLineRe = /[├└│\s─]+([\w@./-]+(?:\.\w+)+)\s*$/gm;
  const plainPathRe = /`(src\/[\w@./-]+\.\w+)`/gm;

  let m;
  while ((m = treeLineRe.exec(block)) !== null) {
    const name = m[1].trim();
    if (name && !name.startsWith('(')) documented.add(name);
  }
  while ((m = plainPathRe.exec(block)) !== null) {
    documented.add(m[1]);
  }

  return [...documented];
}

// ── Entry point ───────────────────────────────────────────────────────────────
console.log();
head('THRIFTVERSE — Handoff Check');
rule();

// ── 0. Guard: src/ missing ───────────────────────────────────────────────────
if (!existsSync(SRC)) {
  info('src/ does not exist yet — nothing to check.');
  info('Run Prompt 1 to scaffold the app in this directory.');
  rule();
  ok('Handoff check complete. All clear (pre-scaffold state).');
  console.log();
  process.exit(0);
}

// ── 1. Collect disk files ────────────────────────────────────────────────────
head('1. Files on disk under src/');
const diskFiles = collectFiles(SRC);
info(`Found ${diskFiles.length} file(s) in src/`);

// ── 2. Parse documented files ────────────────────────────────────────────────
head('2. Files documented in PROJECT_HANDOFF.md § 3');
let handoffContent = '';
let documentedFiles = [];
try {
  handoffContent = readFileSync(HANDOFF, 'utf8');
  documentedFiles = parseHandoffTree(handoffContent);
  info(`Found ${documentedFiles.length} file path(s) in handoff section 3`);
} catch {
  warn('Could not read PROJECT_HANDOFF.md — skipping tree diff.');
}

// ── 3. Diff: undocumented files on disk ──────────────────────────────────────
head('3. Undocumented files (on disk but NOT in handoff § 3)');
const docSet = new Set(documentedFiles);
const undocumented = diskFiles.filter(f => !docSet.has(f));

if (undocumented.length === 0) {
  ok('All disk files are documented in the handoff.');
} else {
  undocumented.forEach(f => warn(`Undocumented: ${f}`));
  warn(`${undocumented.length} file(s) not listed in PROJECT_HANDOFF.md § 3`);
  info('Update the FILE TREE section to include these files.');
}

// ── 4. Diff: missing files (in handoff but NOT on disk) ──────────────────────
head('4. Missing files (in handoff § 3 but NOT on disk)');
const missing = documentedFiles.filter(f => !existsSync(join(ROOT, f)));

if (missing.length === 0 && documentedFiles.length > 0) {
  ok('All documented files exist on disk.');
} else if (documentedFiles.length === 0) {
  info('No file paths parsed from handoff § 3 — section may be empty.');
} else {
  missing.forEach(f => err(`Missing: ${f}`));
  if (missing.length > 0) warn(`${missing.length} file(s) listed in handoff but missing from disk.`);
}

// ── 5. Staleness check ───────────────────────────────────────────────────────
head('5. Staleness check');
let handoffMtime = 0;
try { handoffMtime = statSync(HANDOFF).mtimeMs; } catch { /* ignore */ }

const newestSrc = newestMtime(diskFiles);

if (newestSrc === 0) {
  info('No files in src/ to compare timestamps.');
} else if (handoffMtime === 0) {
  warn('Could not read PROJECT_HANDOFF.md modification time.');
} else if (handoffMtime < newestSrc) {
  const handoffDate = new Date(handoffMtime).toISOString();
  const srcDate     = new Date(newestSrc).toISOString();
  warn('PROJECT_HANDOFF.md is OLDER than the newest src/ file!');
  warn(`  Handoff last modified : ${handoffDate}`);
  warn(`  Newest src/ file      : ${srcDate}`);
  warn('  → Run `npm run handoff:tree` and update § 3, then commit.');
} else {
  ok('PROJECT_HANDOFF.md is up-to-date (newer than all src/ files).');
}

// ── Summary ───────────────────────────────────────────────────────────────────
head('Summary');
rule();
const issues = undocumented.length + missing.length + (handoffMtime < newestSrc && newestSrc > 0 ? 1 : 0);
if (issues === 0) {
  ok('Handoff check passed! Everything looks consistent.');
} else {
  warn(`${issues} issue(s) found — review the warnings above.`);
}
console.log();
