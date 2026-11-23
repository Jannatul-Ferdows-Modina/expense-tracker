---
description: Check that context/ docs still match the code and fix drift
---

Compare `context/modules/*.md` with the actual exports in `core/src/index.ts` and the component/service files in `web/src/app/`.
Compare `context/functional/user-stories.md` acceptance criteria with test titles in `core/**/*.spec.ts`, `web/src/**/*.spec.ts` and `web/e2e/*.spec.ts`.

Report: (1) documented but not implemented, (2) implemented but not documented, (3) acceptance criteria without a test. Then update the docs (not the code) and show the diff.
