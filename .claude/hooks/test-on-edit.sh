#!/usr/bin/env bash
# PostToolUse hook: after Claude edits a file in core/, run the core unit tests
# and feed failures back to Claude (exit code 2 = show stderr to the model).
set -uo pipefail

file=$(jq -r '.tool_input.file_path // empty')
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

case "$file" in
  "$root"/core/src/*.ts)
    out=$(cd "$root/core" && npx vitest run --reporter=dot 2>&1)
    if [ $? -ne 0 ]; then
      echo "core tests failing after editing $file:" >&2
      echo "$out" | tail -40 >&2
      exit 2
    fi
    ;;
esac
exit 0
