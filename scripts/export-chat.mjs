#!/usr/bin/env node
/**
 * Convert a Claude Code session transcript (~/.claude/projects/<project>/<session>.jsonl)
 * into readable Markdown for the chat-logs/ folder.
 *
 * Usage: node scripts/export-chat.mjs <session.jsonl> <out.md> [--title "Session title"]
 *
 * Keeps: user prompts, assistant replies, tool calls (name + short summary), truncated tool results.
 * Drops: hidden reasoning, images, system reminders, account metadata.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [input, output, ...rest] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/export-chat.mjs <session.jsonl> <out.md> [--title "..."]');
  process.exit(1);
}
const titleIdx = rest.indexOf('--title');
const title = titleIdx >= 0 ? rest[titleIdx + 1] : 'Claude Code session';

const RESULT_LIMIT = 1200;
/** Remove injected system context and anything that identifies the account. */
const stripReminders = (s) =>
  s
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '')
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[redacted-email]')
    .replace(/"(accountUuid|organizationUuid|userId)"\s*:\s*"[^"]*"/g, '"$1":"[redacted]"')
    .trim();
const truncate = (s, n = RESULT_LIMIT) => (s.length > n ? `${s.slice(0, n)}\n… (${s.length - n} more chars)` : s);
const fence = (s, lang = '') => `\`\`\`${lang}\n${s.replace(/```/g, '``​`')}\n\`\`\``;

function summarizeToolInput(name, input = {}) {
  if (input.description && input.command) return `${input.description}\n${fence(input.command, 'bash')}`;
  if (input.file_path) return `\`${input.file_path}\``;
  if (input.questions) return input.questions.map((q) => `- ${q.question}`).join('\n');
  return fence(truncate(JSON.stringify(input, null, 2), 600), 'json');
}

function resultText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map((c) => (c.type === 'text' ? c.text : `[${c.type}]`)).join('\n');
  return '';
}

const lines = readFileSync(input, 'utf8').split('\n').filter(Boolean);
const out = [`# ${title}`, '', `Exported from \`${input.split('/').pop()}\` on ${new Date().toISOString().slice(0, 10)}.`, ''];
let turn = 0;

for (const line of lines) {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue;
  }
  if (entry.type !== 'user' && entry.type !== 'assistant') continue;
  if (entry.isMeta) continue;
  const content = entry.message?.content;
  const blocks = typeof content === 'string' ? [{ type: 'text', text: content }] : content ?? [];

  for (const block of blocks) {
    if (entry.type === 'user' && block.type === 'text') {
      const text = stripReminders(block.text);
      if (!text || text.startsWith('[Request interrupted')) continue;
      out.push(`---`, '', `## 🧑 User (turn ${++turn})`, '', text, '');
    } else if (entry.type === 'user' && block.type === 'image') {
      out.push('_[image attached]_', '');
    } else if (entry.type === 'user' && block.type === 'tool_result') {
      const text = stripReminders(resultText(block.content));
      if (text) out.push('<details><summary>Result</summary>', '', fence(truncate(text)), '', '</details>', '');
    } else if (entry.type === 'assistant' && block.type === 'text' && block.text.trim()) {
      out.push(`### 🤖 Claude`, '', stripReminders(block.text), '');
    } else if (entry.type === 'assistant' && block.type === 'tool_use') {
      out.push(`**🔧 ${block.name}** — ${summarizeToolInput(block.name, block.input)}`, '');
    }
  }
}

// Final pass: scrub the account/org IDs found in the transcript (and their 8-char prefixes) everywhere,
// including inside commands that were run, plus any email address.
const ids = new Set();
for (const line of lines) {
  for (const m of line.matchAll(/"(?:accountUuid|organizationUuid)":"([0-9a-f-]{36})"/g)) ids.add(m[1]);
}
let markdown = out.join('\n').replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[redacted-email]');
for (const id of ids) markdown = markdown.split(id).join('[redacted-id]').split(id.slice(0, 8)).join('[redacted-id]');
writeFileSync(output, markdown);
console.log(`Wrote ${output} (${turn} user turns)`);
