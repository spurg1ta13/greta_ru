import { test } from "node:test";
import assert from "node:assert/strict";
import type { UIMessage } from "ai";
import { chatRequestMessages } from "./chat-history";

const message = (i: number, text = "Tell me about Greta's QA experience"): UIMessage => ({
  id: String(i),
  role: i % 2 === 0 ? "user" : "assistant",
  parts: [{ type: "text", text }],
});

test("the 21st question sends recent context rather than all 41 messages", () => {
  const history = Array.from({ length: 41 }, (_, i) => message(i));
  const sent = chatRequestMessages(history);
  assert.equal(sent.length, 20);
  assert.equal(sent.at(-1)?.id, "40");
  assert.equal(history.length, 41);
});

test("long answers cannot push the next request past the 40,000-character cap", () => {
  const history = [message(0), message(1, "a".repeat(41_000)), message(2)];
  const sent = chatRequestMessages(history);
  assert.ok(JSON.stringify(sent).length < 40_000);
  assert.deepEqual(sent, [message(2)]);
  assert.deepEqual(history[1]?.parts[0], { type: "text", text: "a".repeat(41_000) });
});

test("an oversized newest question remains subject to the server's input limit", () => {
  const newest = message(2, "a".repeat(2001));
  assert.deepEqual(chatRequestMessages([message(0), message(1), newest]).at(-1), newest);
});