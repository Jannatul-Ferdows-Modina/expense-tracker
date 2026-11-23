---
description: Implement a feature from context/functional using strict TDD
argument-hint: <feature id or user story, e.g. F9 or US6>
---

Implement **$ARGUMENTS** for the expense tracker.

1. Read `context/functional/features.md`, `context/functional/user-stories.md` and the relevant `context/modules/*.md`. List the business rules and acceptance criteria that apply.
2. Propose a short plan: which pure functions go in `core/`, which components/services change in `web/`, which E2E specs to add. Wait for my OK.
3. Execute with the `tdd` skill — one rule/criterion per red→green(→refactor) cycle, committing each step inside the relevant submodule.
4. Add/extend the Playwright spec for the user story using the `playwright-e2e` skill.
5. Run `npm run test:all` from the parent. Report results and coverage.
6. Update `context/` if the API or behaviour changed, then commit the submodule pointers in the parent.
