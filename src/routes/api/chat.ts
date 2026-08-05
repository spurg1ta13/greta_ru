import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { GRETA_SYSTEM_PROMPT } from "@/lib/greta-profile";

type ChatRequestBody = { messages?: unknown; language?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, language } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system:
            language === "el"
              ? `${GRETA_SYSTEM_PROMPT}\n\nLANGUAGE: The visitor is browsing the Greek version of the site. Always answer in fluent, natural Greek (keep technical terms such as QA, ISTQB, Jira, React in their common form). If the question is out of scope, reply EXACTLY with: "Είμαι εκπαιδευμένο αποκλειστικά για ερωτήσεις σχετικά με το προφίλ, τα έργα και τις επαγγελματικές δεξιότητες της Greta Rusecke. Ρώτησέ με για την εμπειρία της στο QA ή τα έργα AI της!"`
              : GRETA_SYSTEM_PROMPT,
          messages: await convertToModelMessages(
            (messages as UIMessage[]).slice(-20),
          ),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
