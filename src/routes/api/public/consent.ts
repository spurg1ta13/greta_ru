import { createFileRoute } from "@tanstack/react-router";

const DECISIONS = new Set(["accepted", "declined"]);
const SOURCES = new Set(["banner", "chat", "contact_form"]);

// Proof-of-consent log (GDPR Art. 7(1)). No IP address is stored.
export const Route = createFileRoute("/api/public/consent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const bad = () => new Response(JSON.stringify({ ok: false }), { status: 400 });
        let b: { visitorId?: unknown; decision?: unknown; source?: unknown; policyVersion?: unknown; language?: unknown };
        try {
          b = (await request.json()) as typeof b;
        } catch {
          return bad();
        }
        const visitorId = typeof b.visitorId === "string" ? b.visitorId.slice(0, 64) : "";
        const decision = String(b.decision);
        const source = String(b.source);
        if (!visitorId || !DECISIONS.has(decision) || !SOURCES.has(source)) return bad();
        const country = request.headers.get("cf-ipcountry");
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("consent_records").insert({
            visitor_id: visitorId,
            decision,
            source,
            policy_version: typeof b.policyVersion === "string" ? b.policyVersion.slice(0, 20) : "unknown",
            language: b.language === "el" ? "el" : "en",
            country: country ? country.toUpperCase() : null,
          });
        } catch (e) {
          console.error("consent logging failed", e);
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
