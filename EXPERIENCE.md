# Experience Report

## What I built

An Angular expense tracker: add, edit and delete expenses, filter by month and category, see a per-category breakdown, and set a monthly budget that warns at 80 %. It's split into two repos joined with git submodules: `expense-core` (business rules in plain TypeScript) and `expense-web` (the Angular UI).

I used Claude Code in VS Code for the whole project. I gave it the requirements, made the decisions (the app, the stack, frontend only, logic in a separate repo), reviewed its output and pushed back when something didn't make sense. It wrote most of the code and tests.

Result: 114 tests (50 core, 47 web, 17 Playwright), all passing, with 100 % coverage for core and about 99 % for web.

## How it went

Overall it worked well. The AI followed my instructions and met every requirement: rules, skills, MCP and workflows were set up, the `context/` folder was written first, and all features were built test-first. The app is also responsive; I checked it on both desktop and phone screen sizes.

The few challenges were small. At the start it asked me to choose options before I fully understood the requirements, so I asked it to explain first.
