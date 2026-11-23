# Architecture Overview

```
expense-tracker/          (parent repo — docs, AI config, CI)
├── core/   → submodule: expense-core   (framework-free TypeScript domain logic)
└── web/    → submodule: expense-web    (Angular 22 UI, depends on core)
```

## Why two repos?

| Repo | Responsibility | Depends on |
|------|----------------|------------|
| `expense-core` | Pure business rules: validation, money math, filtering, summaries, budget state. No Angular, no DOM. | nothing |
| `expense-web` | Presentation, state, persistence (localStorage), routing-free single page. | `expense-core` |

The domain logic is versioned independently so it can be reused (e.g. by a future mobile app or CLI) and tested in milliseconds without a browser. The parent repo pins **exact commits** of each submodule, so a checkout of the parent is always a known-good combination.

## Dependency direction

`web` → `core` only. `core` must never import from `web` or from Angular.

`web` resolves `@expense/core` through a TypeScript path alias to `../core/src/index.ts` (see [web.md](web.md)), so the parent checkout layout is required to build `web`.

## Test seams

`CLOCK` (`() => Date`) and `BROWSER_STORAGE` are injection tokens with real defaults; tests replace them via `src/testing/test-providers.ts` for deterministic dates and isolated storage.

## Data flow

```
User input ─▶ ExpenseForm ─▶ validateExpense() (core)
                       │ valid
                       ▼
               ExpenseStore (signals) ─▶ StorageService ─▶ localStorage
                       │
          computed(): filterExpenses / sortExpenses / totalOf /
                      summarizeByCategory / budgetStatus  (core)
                       ▼
     ExpenseList / SummaryPanel / BudgetPanel
```

See [core.md](core.md) and [web.md](web.md) for module details.
