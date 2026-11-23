# Experience Report

> **Draft written with the AI from the session logs. Before submitting, rewrite it in your own voice.** Keep the facts, and add your own opinions in the places marked ✍️. Reflection is 20 % of the grade, and assessors can tell a generic AI reflection from a real one.

## 1. Summary

I built an Angular expense tracker split into two repos (`expense-core` for pure business logic, `expense-web` for the UI) and joined them with git submodules. Almost all code was written by Claude Code under rules, skills and workflows I set up, following strict TDD. Result: 114 tests (50 core unit, 47 web unit, 17 Playwright E2E), 100 % / ~99 % coverage, and a red→green→refactor commit history.

✍️ *Your overall impression in 2–3 sentences: was it faster than doing it yourself? Did you trust the output?*

## 2. What worked

**Context first, then code.** Writing `context/functional` first, with numbered business rules (BR1–BR9) and acceptance criteria (AC1.1…AC7.1), gave the AI an unambiguous target. Every test cites its rule, so traceability from requirement to test is visible, and `/sync-context` can check it.

**Strict TDD caught real bugs, including the AI's own.**
- A store test with a frozen clock exposed a real ordering bug: two expenses added in the same millisecond get the same `createdAt`, so the BR7 tie-break couldn't order them. The fix (a strictly increasing `createdAt`) would never have been found by manual clicking.
- While reviewing a red test before implementing, the AI noticed that **its own expected value was wrong** (30 / 60.1 is 49.9 %, not 49.8 %). This showed that tests written by an AI need review too.
- "Red for the right reason": the first red run failed on a missing module, not an assertion. The TDD skill says that doesn't count, so stubs were added and the assertions were confirmed to fail before implementing.

**Separating pure logic from the framework.** Putting rules in `expense-core` made 50 tests run in under a second with 100 % coverage, and made the Angular layer thin. 45 component tests passed on the first implementation run because the specs were precise.

**Outside-in E2E.** Writing Playwright specs for every user story before the UI existed meant the UI was built to a contract (`data-testid`s, exact texts). All 17 E2E tests passed on the first run once the components were done.

**Deterministic seams.** Injecting `CLOCK` and `BROWSER_STORAGE` made date-dependent rules (no future dates, current month, budget month) fully testable.

✍️ *What surprised you positively?*

## 3. What didn't work / challenges

- **Too many questions up front.** The agent started with multiple-choice questions before I understood the requirements. I interrupted it and asked for a plain explanation of each requirement first. Lesson: explain first, then ask.
- **The AI can't configure its own permissions or hooks.** Writing `.claude/settings.json` (hook wiring plus allowed commands) was blocked by Claude Code's safety classifier, which counts self-modifying permissions as undermining oversight. That's correct behaviour, but I had to add the file myself.
- **Multi-repo friction.** Submodules plus a TypeScript path alias mean `expense-web` can't be built on its own; it needs the parent checkout. A published npm package or npm workspaces would decouple them, at the cost of a release step. Committing in the submodule *and then* bumping the pointer in the parent is easy to forget.
- **Tooling surprises.** The Playwright Chromium download exceeded the command timeout and had to run in the background. A `pkill -f` in a cleanup command matched its own shell and returned a confusing exit code.
- **Privacy in chat logs.** The first chat-log export contained account IDs that appeared in a tool result. I added redaction to the exporter, which means logs must be checked before they're published.
- **The MCP server was configured but barely used in the first session.** E2E selectors were designed up front, so browser exploration wasn't needed. ✍️ *Describe how you used it later, e.g. in session 2.*

✍️ *Anything frustrating: wrong code, hallucinated APIs, slow loops?*

## 4. Honest assessment

| Area | Rating (1–5) | Notes |
|------|:---:|------|
| Speed vs. manual | ✍️ | |
| Code quality of AI output | ✍️ | |
| Test quality | ✍️ | |
| Need for human review | ✍️ | The AI made 2 test-expectation mistakes that it caught itself; none reached `main`. |

## 5. Recommendations

1. **Write numbered rules in `context/` before prompting.** Precise specs produce precise tests.
2. **Make TDD a rule plus a skill, not a request.** Putting it in `CLAUDE.md` makes it the default, and the skill makes it repeatable.
3. **Ask the AI to show the failing test output** before it implements. It catches "red for the wrong reason".
4. **Inject time and storage** in any code the AI writes; otherwise its tests become flaky.
5. **Review AI-written tests as critically as AI-written code.**
6. **Redact chat logs** before publishing them.
7. For multi-repo setups, decide early between submodules with path aliases and a published package.

✍️ *Feedback for the course: what would you change in the sessions or the capstone brief?*
