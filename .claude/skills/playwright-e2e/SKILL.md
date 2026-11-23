---
name: playwright-e2e
description: How to write and debug Playwright end-to-end tests for expense-web, including using the Playwright MCP browser to explore the running app. Use when writing tests in web/e2e/.
---

# Playwright E2E

## Conventions
- One spec file per user story: `web/e2e/us<N>-<slug>.spec.ts`; `test.describe('US<N> ...')`, one `test()` per acceptance criterion, titled with its id (`AC1.2 ...`).
- Start every test from a clean state: `await page.goto('/')` then `await page.evaluate(() => localStorage.clear()); await page.reload();` (done in `beforeEach`).
- Locate with `page.getByTestId(...)` only. Use web-first assertions (`toHaveText`, `toHaveCount`), never fixed `waitForTimeout`.
- Use the helper `addExpense(page, {...})` in `e2e/helpers.ts` instead of repeating form-filling.
- Dates: use dates in the past relative to today (e.g. computed `yyyy-mm-dd` of today) to avoid BR4 failures.

## Exploring with the Playwright MCP
When a selector or flow is unclear:
1. Make sure `ng serve` is running (`cd web && npm start`).
2. Use the `playwright` MCP tools: `browser_navigate` to `http://localhost:4200`, `browser_snapshot` to read the accessibility tree and `data-testid`s, then interact with `browser_click` / `browser_type`.
3. Translate the verified steps into a spec. Do not commit code generated without running it.

## Running
- `cd web && npm run e2e` (headless, starts dev server via `webServer` config)
- `npx playwright test --ui` for debugging, `npx playwright show-report` for the HTML report.
