# Expense Tracker — Agentic Capstone

A browser-based expense tracker (add/edit/delete expenses, month & category filters, category breakdown, monthly budget with warnings, localStorage persistence) built end-to-end with **Claude Code** using strict **TDD**, a documented **`context/`** folder, and a **multi-repo layout with git submodules**.

| | |
|---|---|
| **Stack** | Angular 22 (signals, standalone, OnPush) · TypeScript · Vitest · Playwright |
| **Repos** | this parent repo + [`core/`](core) (expense-core) + [`web/`](web) (expense-web) as submodules |
| **Tests** | 50 core unit · 47 web unit/component · 17 Playwright E2E — all passing |
| **Coverage** | core 100 % · web ≈ 99 % lines — see [coverage/SUMMARY.md](coverage/SUMMARY.md) |

## Repository layout

```
expense-tracker/                 ← this repo (parent)
├── core/      submodule → expense-core: pure TS business rules (validation, money, filters, budget)
├── web/       submodule → expense-web: Angular UI, unit + Playwright tests
├── context/   project knowledge for humans and the AI
│   ├── functional/  features.md (F1–F10, BR1–BR9), user-stories.md (US1–US7, acceptance criteria)
│   └── modules/     architecture.md, core.md, web.md
├── .claude/   AI configuration: skills/, commands/, hooks/
├── .mcp.json  Playwright MCP server
├── CLAUDE.md  project rules for the AI
├── chat-logs/ exported AI sessions
├── coverage/  committed coverage reports (HTML + LCOV + summary)
├── scripts/   coverage collection, chat-log export
├── EXPERIENCE.md   experience report
└── AI_USAGE.md     AI tool usage report
```

## Setup

Prerequisites: Node.js 22+, npm, git.

```bash
git clone --recurse-submodules <parent-repo-url> expense-tracker
cd expense-tracker
npm run setup          # init submodules, install core + web deps, install Playwright Chromium
```

Already cloned without submodules? `git submodule update --init --recursive`, then `npm run setup`.

## Run

```bash
npm start              # http://localhost:4200
```

## Test

```bash
npm run test:core      # core unit tests (Vitest)
npm run test:web       # Angular unit/component tests (Vitest + jsdom)
npm run test:e2e       # Playwright E2E (starts the dev server)
npm run test:all       # all three
npm run coverage       # core + web coverage → coverage/ (HTML, LCOV, SUMMARY.md)
```

**CI:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) checks out submodules, runs type-check, unit tests with coverage, and Playwright E2E on every push/PR, and uploads coverage and the Playwright HTML report as artifacts. `expense-core` also has its own CI.

## Working with the submodules

```bash
# change code in a submodule
cd core && git checkout main && <edit, test, commit> && git push
# record the new submodule commit in the parent
cd .. && git add core && git commit -m "chore: bump core" && git push

# pull everything
git pull && git submodule update --init --recursive
```

The parent pins an exact commit of each submodule, so every parent commit is a known-good combination. `web` imports `@expense/core` through a TypeScript path alias to `../core/src`, which is why it is built from inside the parent checkout.

## Architecture in one paragraph

All business rules (validation BR1–BR5, cent-based money math BR6, sorting BR7, budget thresholds BR8, breakdown BR9) are pure functions in `expense-core`, tested in milliseconds. The Angular app holds raw state in an `ExpenseStore` built on signals and derives everything (visible list, total, breakdown, budget status) with `computed()` calls into core. Components are thin. `ExpenseList` is purely presentational, and the rest read from the store. Time and storage are injected (`CLOCK`, `BROWSER_STORAGE`) so tests are deterministic. Details are in [context/modules/architecture.md](context/modules/architecture.md).

## AI workflow

See [AI_USAGE.md](AI_USAGE.md) for the full configuration (rules, skills, slash commands, hooks, MCP) and [EXPERIENCE.md](EXPERIENCE.md) for what worked and what didn't.
