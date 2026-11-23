# Module: expense-core (`core/`)

Framework-free TypeScript library. Every export is a pure function or a type.

## Public API (`src/index.ts`)

| Export | File | Purpose | Rules |
|--------|------|---------|-------|
| `CATEGORIES`, `Category` | `models.ts` | Allowed categories | BR3 |
| `Expense`, `ExpenseInput` | `models.ts` | Domain types | — |
| `validateExpense(input, today?)` | `validation.ts` | Returns `{ valid, errors }` with per-field messages | BR1–BR5 |
| `toCents(n)`, `fromCents(c)` | `money.ts` | Safe money conversion | BR6 |
| `totalOf(expenses)` | `money.ts` | Sum in cents, returns number with 2 dp | BR6 |
| `sortExpenses(expenses)` | `query.ts` | Date desc, then `createdAt` desc | BR7 |
| `filterExpenses(expenses, filter)` | `query.ts` | By `month` (`YYYY-MM`) and/or `category` | F6 |
| `summarizeByCategory(expenses)` | `summary.ts` | `{ category, amount, percent }[]` | BR9 |
| `budgetStatus(spent, budget)` | `budget.ts` | `{ state, remaining, percentUsed }` | BR8 |

## Conventions

- No mutation of inputs — always return new arrays/objects.
- Functions accept an injectable `today` where the current date matters, so tests are deterministic.
- 100 % line and branch coverage target (enforced in `vitest.config.ts` thresholds).

## Testing

`npm test` (Vitest). Tests live next to the source as `*.spec.ts`.
