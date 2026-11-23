# Project Rules — Expense Tracker

Read `context/` before changing code. It is the source of truth for requirements (`context/functional/`) and module design (`context/modules/`).

## Repository layout
- Parent repo with two git submodules: `core/` (expense-core, pure TS) and `web/` (expense-web, Angular 22).
- Commit inside the submodule first, then commit the updated submodule pointer in the parent.

## Non-negotiable workflow: TDD
1. **Red** — write a failing test that encodes one acceptance criterion or business rule (cite it, e.g. `// BR2`). Run it and confirm it fails for the right reason. Commit: `test(<scope>): ...`
2. **Green** — write the minimum code to pass. Commit: `feat(<scope>): ...`
3. **Refactor** — clean up with tests green. Commit: `refactor(<scope>): ...`
Never write production code without a failing test first. Use the `tdd` skill.

## Code rules
- TypeScript strict; no `any`.
- `core/` must not import Angular or touch the DOM / localStorage.
- Business logic belongs in `core/`; `web/` components only orchestrate and render.
- Money math in integer cents (BR6).
- Angular: standalone components, signals, `inject()`, new control flow (`@if`, `@for`), `OnPush`.
- Tests select elements with `data-testid` only.
- Functions that depend on "today" take it as a parameter.

## Commands
- Core tests: `cd core && npm test` · coverage: `npm run coverage`
- Web unit tests: `cd web && npm test` · E2E: `npm run e2e`
- Everything: `npm run test:all` from the parent.

## Commit messages
Conventional Commits: `test|feat|refactor|fix|docs|chore(scope): summary`.

## When unsure
Ask rather than guess about requirements; update `context/` when a requirement changes.
