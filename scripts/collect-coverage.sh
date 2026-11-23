#!/usr/bin/env bash
# Run both coverage suites and gather the HTML/LCOV reports into ./coverage
# together with a Markdown summary, so the reports can be committed and reviewed.
set -euo pipefail
cd "$(dirname "$0")/.."

npm --prefix core run coverage
npm --prefix web run coverage

rm -rf coverage && mkdir -p coverage/core coverage/web
cp -r core/coverage/. coverage/core/
cp -r web/coverage/expense-web/. coverage/web/

node - <<'JS'
const fs = require('fs');
const row = (name, file) => {
  const t = JSON.parse(fs.readFileSync(file, 'utf8')).total;
  return `| ${name} | ${t.statements.pct}% | ${t.branches.pct}% | ${t.functions.pct}% | ${t.lines.pct}% |`;
};
const md = [
  '# Coverage Summary',
  '',
  `Generated ${new Date().toISOString()} by \`npm run coverage\`.`,
  '',
  '| Package | Statements | Branches | Functions | Lines |',
  '|---------|-----------:|---------:|----------:|------:|',
  row('core (expense-core)', 'coverage/core/coverage-summary.json'),
  row('web (expense-web)', 'coverage/web/coverage-summary.json'),
  '',
  'HTML reports: [core](core/index.html) · [web](web/index.html)',
  '',
].join('\n');
fs.writeFileSync('coverage/SUMMARY.md', md);
console.log(md);
JS
