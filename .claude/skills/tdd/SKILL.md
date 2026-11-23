---
name: tdd
description: Red-green-refactor workflow for this repo. Use whenever adding or changing behaviour in core/ or web/ — before writing any production code.
---

# TDD workflow

1. **Locate the requirement.** Find the business rule (BRx) or acceptance criterion (ACx.y) in `context/functional/`. If none exists, stop and ask, or add it to the context first.
2. **Write one failing test.**
   - `core/`: `src/<file>.spec.ts`, Vitest, pure inputs/outputs, inject `today` when dates matter.
   - `web/` component/service: `*.spec.ts` beside the file, Angular TestBed, query by `data-testid`.
   - user-visible flow: `web/e2e/<story>.spec.ts`, Playwright (see `playwright-e2e` skill).
   - Name the test after the behaviour, and reference the rule: `it('rejects amount with 3 decimals (BR2)', ...)`.
3. **Run it and see it fail** for the expected reason (not a typo/import error). Paste the failing line in the chat.
4. **Commit red**: `git commit -m "test(<scope>): <behaviour>"`.
5. **Make it pass** with the smallest change. Run the whole suite of that package.
6. **Commit green**: `feat(<scope>): <behaviour>`.
7. **Refactor** if duplication or unclear naming appeared; suite must stay green. Commit `refactor(...)`.
8. Repeat for the next criterion. Keep each cycle small (one rule at a time).

## Checklist before moving on
- [ ] Edge cases: empty, boundary (0, max), invalid type, whitespace.
- [ ] Coverage did not drop (`npm run coverage`).
- [ ] `context/modules/*.md` updated if the public API changed.
