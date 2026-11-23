# Functional Spec — Expense Tracker

A single-user, browser-based expense tracker. Data lives in the browser (localStorage); there is no backend.

## Feature list

| ID | Feature | Priority |
|----|---------|----------|
| F1 | Add an expense (title, amount, category, date, optional note) | Must |
| F2 | Validate expense input and show field-level errors | Must |
| F3 | List expenses, newest first | Must |
| F4 | Delete an expense | Must |
| F5 | Edit an expense | Should |
| F6 | Filter by month and by category | Must |
| F7 | Show total spent for the current filter | Must |
| F8 | Show per-category breakdown (amount + %) | Should |
| F9 | Set a monthly budget and see remaining / warning / over-budget state | Should |
| F10 | Persist expenses and budget across page reloads | Must |

## Business rules

- **BR1 — Title**: required, trimmed, 1–60 characters.
- **BR2 — Amount**: required, number > 0, at most 1,000,000, max 2 decimal places.
- **BR3 — Category**: one of `Food, Transport, Housing, Utilities, Entertainment, Health, Shopping, Other`.
- **BR4 — Date**: required, valid `YYYY-MM-DD`, not in the future.
- **BR5 — Note**: optional, max 200 characters.
- **BR6 — Money math**: all sums are done in integer cents to avoid floating-point drift (`0.1 + 0.2` must total `0.30`).
- **BR7 — Sorting**: list is sorted by date descending; ties broken by creation time descending.
- **BR8 — Budget state**: `ok` when used < 80 %, `warning` when 80 % ≤ used ≤ 100 %, `over` when used > 100 %. A budget of 0 / unset means "no budget".
- **BR9 — Breakdown percentages** are rounded to 1 decimal and categories with 0 spend are omitted; ordered by amount descending.

See [user-stories.md](user-stories.md) for acceptance criteria.
