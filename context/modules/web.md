# Module: expense-web (`web/`)

Angular 22 standalone-component app using signals.

## Structure

| Path | Responsibility |
|------|----------------|
| `src/app/data/storage.service.ts` | Read/write JSON to `localStorage`, tolerant of corrupted data |
| `src/app/data/expense.store.ts` | Signal-based state: expenses, filter, budget; derived `visible`, `total`, `breakdown`, `budget status` via `@expense/core` |
| `src/app/expense-form/` | Reactive form for add/edit (`editing` input, `done` output); shows validation errors from core |
| `src/app/expense-list/` | Presentational: `expenses` input, `edit` / `remove` outputs |
| `src/app/app.ts` | Shell: layout, holds `editing` signal, wires list → form |
| `src/testing/test-providers.ts` | In-memory storage + frozen clock (2026-11-23) for unit tests |
| `src/app/filter-bar/` | Month + category filters |
| `src/app/summary-panel/` | Total + per-category breakdown |
| `src/app/budget-panel/` | Set budget, show remaining/warning/over state |
| `e2e/` | Playwright end-to-end specs, one file per user story |

## Resolving `@expense/core`

`tsconfig.json` → `"paths": { "@expense/core": ["../core/src/index.ts"] }`.
Works only inside the parent checkout (`expense-tracker/web`).

## Testing

- Unit: `npm test` (Angular unit-test builder with Vitest).
- E2E: `npm run e2e` (Playwright; starts `ng serve` automatically).
- Test selectors use `data-testid` attributes only — never CSS classes.
