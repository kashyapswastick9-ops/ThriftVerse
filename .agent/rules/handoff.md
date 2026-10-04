# THRIFTVERSE — Agent Rules (Workspace)

> These rules are automatically applied to every Antigravity task in this workspace.
> They are also reproduced in full in `PROJECT_HANDOFF.md` section 0.

## Rules

1. After EVERY task that changes files, update `CHANGELOG.md` (new top entry) and the affected sections of `PROJECT_HANDOFF.md` (progress checklist, file tree, routes, stores, issues, next steps, last-updated timestamp) **BEFORE** reporting completion.

2. Never mark a feature DONE unless it compiles (`npm run typecheck`) and its acceptance criteria were checked; otherwise mark **NEEDS FIX** and log it in KNOWN ISSUES.

3. Never delete or rewrite old CHANGELOG entries; only append.

4. Keep NEXT STEPS accurate: the first item is always the immediate next task.

5. Record every architectural decision or deviation from the original prompts in `PROJECT_HANDOFF.md` section 8.

6. End every reply with one line: `Handoff updated: <files touched>`.

7. When `package.json` first exists (Prompt 1), add the scripts:
   - `"handoff:tree": "node scripts/tree.mjs"`
   - `"handoff:check": "node scripts/handoff-check.mjs"`
   - `"typecheck": "tsc --noEmit"`
