# User Stories & Acceptance Criteria

Each acceptance criterion maps to at least one test (unit in `core/` or `web/`, or Playwright E2E in `web/e2e/`).

## US1 — Record an expense (F1, F2)
*As a user, I want to add an expense so I can track where my money goes.*

- **AC1.1** Given a valid title, amount, category and date, when I submit, the expense appears at the top of the list.
- **AC1.2** Given an empty title, when I submit, I see "Title is required" and nothing is added.
- **AC1.3** Given amount `0` or negative, I see "Amount must be greater than 0".
- **AC1.4** Given a future date, I see "Date cannot be in the future".
- **AC1.5** After a successful add, the form resets.

## US2 — Review expenses (F3, F7)
- **AC2.1** Expenses are listed newest first.
- **AC2.2** The total reflects exactly the expenses currently shown.
- **AC2.3** With no expenses, an empty-state message "No expenses yet" is shown.

## US3 — Remove / correct mistakes (F4, F5)
- **AC3.1** Clicking delete on an expense removes it and updates the total.
- **AC3.2** Clicking edit loads the expense into the form; saving updates it in place.

## US4 — Focus on a period or category (F6)
- **AC4.1** Selecting a month shows only that month's expenses.
- **AC4.2** Selecting a category shows only that category; "All" clears the filter.

## US5 — Understand spending mix (F8)
- **AC5.1** Breakdown lists each category with spend, its amount and its share of the total.

## US6 — Stay within budget (F9)
- **AC6.1** With a budget set, I see remaining amount for the selected month.
- **AC6.2** At ≥ 80 % used, a warning style is shown; above 100 %, an "Over budget" message.

## US7 — Keep my data (F10)
- **AC7.1** After reloading the page, my expenses and budget are still there.
