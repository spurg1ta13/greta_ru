import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { GRETA_SYSTEM_PROMPT } from "@/lib/greta-profile";

type ChatRequestBody = { messages?: unknown; language?: unknown; sessionId?: unknown; visitorId?: unknown };

function textOf(message: UIMessage | undefined): string {
  if (!message) return "";
  return (message.parts ?? [])
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

function geoOf(request: Request) {
  // Only the approximate location derived from the IP is stored — the IP itself is never saved.
  const h = request.headers;
  return {
    country: h.get("cf-ipcountry") ?? h.get("x-vercel-ip-country"),
    city: h.get("cf-ipcity") ?? h.get("x-vercel-ip-city"),
    region: h.get("cf-region") ?? h.get("x-vercel-ip-country-region"),
  };
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Only accept calls made from this site's own pages.
        const origin = request.headers.get("origin");
        const host = request.headers.get("host");
        const fetchSite = request.headers.get("sec-fetch-site");
        if (!origin || !host || new URL(origin).host !== host || (fetchSite && fetchSite !== "same-origin")) {
          return new Response("Forbidden", { status: 403 });
        }

        let body: ChatRequestBody & { consent?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return new Response("Bad request", { status: 400 });
        }
        const { messages, language, sessionId, visitorId } = body;
        if (body.consent !== true) return new Response("Consent required", { status: 403 });
        if (!Array.isArray(messages) || messages.length === 0 || messages.length > 40) {
          return new Response("Invalid messages", { status: 400 });
        }
        if (typeof sessionId !== "string" || !/^[\w-]{8,64}$/.test(sessionId)) {
          return new Response("Invalid session", { status: 400 });
        }
        if (JSON.stringify(messages).length > 40000) {
          return new Response("Conversation too long", { status: 413 });
        }
        const userMsgs = (messages as UIMessage[]).filter((m) => m?.role === "user");
        if (userMsgs.some((m) => textOf(m).length > 2000)) {
          return new Response("Message too long", { status: 413 });
        }

        // Rate limit: max user messages per session / visitor in the last hour.
        {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const since = new Date(Date.now() - 3600_000).toISOString();
          const { count } = await supabaseAdmin
            .from("chat_logs")
            .select("id", { count: "exact", head: true })
            .eq("role", "user")
            .gte("created_at", since)
            .or(
              typeof visitorId === "string" && /^[\w-]{8,64}$/.test(visitorId)
                ? `session_id.eq.${sessionId},visitor_id.eq.${visitorId}`
                : `session_id.eq.${sessionId}`,
            );
          if ((count ?? 0) >= 30) return new Response("Too many requests", { status: 429 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const uiMessages = messages as UIMessage[];
        const geo = geoOf(request);
        const session = sessionId;
        const lang = language === "el" ? "el" : "en";
        const lastUserText = textOf([...uiMessages].reverse().find((m) => m.role === "user"));

        const logRows = async (
          rows: { role: "user" | "assistant"; content: string }[],
        ) => {
          try {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const base = Date.now();
            await supabaseAdmin.from("chat_logs").insert(
              rows
                .filter((row) => row.content.length > 0)
                .map((row, i) => ({
                  session_id: session,
                  visitor_id: typeof visitorId === "string" && /^[\w-]{8,64}$/.test(visitorId) ? visitorId : null,
                  role: row.role,
                  content: row.content.slice(0, 4000),
                  language: lang,
                  // Distinct timestamps keep question → answer order stable.
                  created_at: new Date(base + i).toISOString(),
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
