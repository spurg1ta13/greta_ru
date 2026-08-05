import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { GRETA_SYSTEM_PROMPT } from "@/lib/greta-profile";

type ChatRequestBody = { messages?: unknown; language?: unknown; sessionId?: unknown };

function textOf(message: UIMessage | undefined): string {
  if (!message) return "";
  return (message.parts ?? [])
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

function geoOf(request: Request) {
  const h = request.headers;
  const ip =
    h.get("cf-connecting-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    null;
  return {
    ip_address: ip,
    country: h.get("cf-ipcountry") ?? h.get("x-vercel-ip-country"),
    city: h.get("cf-ipcity") ?? h.get("x-vercel-ip-city"),
    region: h.get("cf-region") ?? h.get("x-vercel-ip-country-region"),
  };
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, language, sessionId } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const uiMessages = messages as UIMessage[];
        const geo = geoOf(request);
        const session = typeof sessionId === "string" && sessionId ? sessionId : "unknown";
        const lang = language === "el" ? "el" : "en";
        const lastUserText = textOf([...uiMessages].reverse().find((m) => m.role === "user"));

        const logRows = async (
          rows: { role: "user" | "assistant"; content: string }[],
        ) => {
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            await supabaseAdmin.from("chat_logs").insert(
              rows
                .filter((row) => row.content.length > 0)
                .map((row) => ({
                  session_id: session,
                  role: row.role,
                  content: row.content.slice(0, 4000),
                  language: lang,
                  ...geo,
                })),
            );
          } catch (error) {
            console.error("chat log failed", error);
          }
        };

        const gateway = createLovableAiGatewayProvider(key);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system:
            language === "el"
              ? `${GRETA_SYSTEM_PROMPT}\n\nLANGUAGE: The visitor is browsing the Greek version of the site. Always answer in fluent, natural Greek (keep technical terms such as QA, ISTQB, Jira, React in their common form). If the question is out of scope, reply EXACTLY with: "Είμαι εκπαιδευμένο αποκλειστικά για ερωτήσεις σχετικά με το προφίλ, τα έργα και τις επαγγελματικές δεξιότητες της Greta Rusecke. Ρώτησέ με για την εμπειρία της στο QA ή τα έργα AI της!"`
              : GRETA_SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages.slice(-20)),
          onFinish: async ({ text }) => {
            await logRows([
              { role: "user", content: lastUserText },
              { role: "assistant", content: text },
            ]);
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
        });
      },
    },
  },
});
