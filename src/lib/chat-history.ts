import type { UIMessage } from "ai";

/** Bound only the transmitted context; the visible conversation stays intact. */
export function chatRequestMessages(messages: UIMessage[]): UIMessage[] {
  const recent = messages.slice(-20).map(({ id, role, parts }) => ({
    id,
    role,
    parts: parts.filter((part) => part.type === "text").map((part) => ({
      type: "text" as const,
      text: part.text,
    })),
  }));

  // Leave headroom below the server's 40,000-character safety limit.
  // Never discard the newest question; oversized input is rejected by the server.
  while (recent.length > 1 && JSON.stringify(recent).length > 38_000) {
    recent.shift();
  }
  return recent;
}