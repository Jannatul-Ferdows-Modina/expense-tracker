---
description: Run every test suite with coverage and summarise gaps
---

From the parent repo run `npm run test:all` and then `npm run coverage`.

Summarise in a table: suite · tests passed/failed · line % · branch %.
For anything below 90 % in `core/` or 80 % in `web/`, list the uncovered lines and propose the missing test cases (do not write production code).
