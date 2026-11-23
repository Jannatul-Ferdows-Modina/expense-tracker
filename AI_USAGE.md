# AI Tool Usage Report

**Tool:** Claude Code (VS Code extension, agentic mode), model Claude Opus 5.5.

## 1. Configuration

| Feature | File(s) | Purpose |
|---------|---------|---------|
| **Rules** | [`CLAUDE.md`](CLAUDE.md) | Loaded into every session: repo layout, the non-negotiable TDD loop, code rules (no `any`, logic only in core, cents math, `data-testid` selectors, injectable "today"), commit conventions. |
| **Skill: `tdd`** | [`.claude/skills/tdd/SKILL.md`](.claude/skills/tdd/SKILL.md) | Step-by-step red→green→refactor procedure, including "see it fail for the right reason" and a pre-move-on checklist. |
| **Skill: `playwright-e2e`** | [`.claude/skills/playwright-e2e/SKILL.md`](.claude/skills/playwright-e2e/SKILL.md) | E2E conventions (one spec per user story, one test per AC, clean localStorage, web-first assertions) and how to explore the app with the Playwright MCP. |
| **Workflow: `/feature <id>`** | [`.claude/commands/feature.md`](.claude/commands/feature.md) | Reads context → proposes a plan and waits for approval → TDD cycles → E2E → full test run → update context → bump submodules. |
| **Workflow: `/check`** | [`.claude/commands/check.md`](.claude/commands/check.md) | Runs every suite with coverage and lists gaps as proposed test cases. |
| **Workflow: `/sync-context`** | [`.claude/commands/sync-context.md`](.claude/commands/sync-context.md) | Detects drift between `context/` docs, exported API and test titles. |
| **Hook: test-on-edit** | [`.claude/hooks/test-on-edit.sh`](.claude/hooks/test-on-edit.sh) + `.claude/settings.json` | `PostToolUse` on `Edit`/`Write`: when the AI edits `core/src/*.ts`, the core tests run automatically, and failures are fed back to the model (exit 2). |
| **MCP server** | [`.mcp.json`](.mcp.json) | `@playwright/mcp` gives the agent a real browser (`browser_navigate`, `browser_snapshot`, `browser_click`…) to explore the UI and verify selectors before writing specs. |
| **Context folder** | [`context/`](context) | Functional spec (features, business rules, acceptance criteria) and module docs. Every test cites the rule/AC it covers (e.g. `(BR2)`, `AC1.3`). |
| **Memory** | Claude Code auto-memory | Persists user preferences across sessions. |

## 2. How the AI was used, phase by phase

| Phase | What the AI did | What the human did |
|-------|-----------------|--------------------|
| Requirements | Mapped each capstone requirement to a concrete Claude Code feature; explained in plain terms when asked | Chose the feature (expense tracker) and stack; clarified that a backend wasn't required |
| Context-first | Wrote `context/functional` and `context/modules` **before any code** | Reviewed scope |
| AI config | Wrote CLAUDE.md, skills, commands, hook script, MCP config | Added `.claude/settings.json` manually (the agent's own safety classifier blocks it from editing its own permissions/hooks) |
| Core TDD | 4 red→green cycles plus 1 refactor (see `git log` in `core/`), 100 % coverage threshold | Reviewed commits |
| Web TDD | Store specs → E2E specs for all user stories (outside-in) → component specs → implementation | — |
| Verification | Ran Playwright E2E headless; took desktop + mobile screenshots to inspect layout | — |
| Docs & CI | README, CI workflows, coverage collection script, chat-log exporter with redaction | Created GitHub repos, pushed |

## 3. Advanced features used

- **Skills** as reusable, auto-discoverable procedures rather than one-off prompts.
- **Custom slash commands** with `$ARGUMENTS` for repeatable multi-step workflows.
- **Hooks** for automatic feedback loops (tests on every edit).
- **MCP** to extend the agent with a browser.
- **Background tasks**: long installs (Playwright browser download) ran in the background while the agent kept writing specs.
- **Injected test seams** (`CLOCK`, `BROWSER_STORAGE`) suggested by the AI to keep tests deterministic.
- **Chat-log tooling**: `scripts/export-chat.mjs` turns raw `.jsonl` transcripts into readable Markdown and redacts emails and account IDs.

## 4. Metrics

| Metric | Value |
|--------|-------|
| Unit tests (core / web) | 50 / 47 |
| E2E tests | 17 (covering all 7 user stories) |
| Coverage | core 100 %, web ≈ 99 % lines |
| TDD evidence | `test:` commits precede `feat:` commits in both submodules |
