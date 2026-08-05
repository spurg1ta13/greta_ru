import { createFileRoute } from "@tanstack/react-router";

function header(request: Request, name: string): string | null {
  const value = request.headers.get(name);
  return value && value.length > 0 ? value : null;
}

function pickIp(request: Request): string | null {
  const forwarded = header(request, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return header(request, "cf-connecting-ip") ?? header(request, "x-real-ip");
}

export const Route = createFileRoute("/api/public/visit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let visitorId: string | null = null;
        let language: string | null = null;
        let path: string | null = null;

        try {
          const body = (await request.json()) as {
            visitorId?: unknown;
            language?: unknown;
            path?: unknown;
          };
          if (typeof body.visitorId === "string" && body.visitorId.length > 0) {
            visitorId = body.visitorId.slice(0, 64);
          }
          if (body.language === "el" || body.language === "en") language = body.language;
          if (typeof body.path === "string") path = body.path.slice(0, 200);
        } catch {
          visitorId = null;
        }

        if (!visitorId) {
          return new Response(JSON.stringify({ ok: false }), {
            status: 400,
            headers: { "content-type": "application/json", "cache-control": "no-store" },
          });
        }

        const country = header(request, "cf-ipcountry") ?? header(request, "x-vercel-ip-country");

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("site_visits").insert({
            visitor_id: visitorId,
            path,
            language,
            ip_address: pickIp(request),
            country: country ? country.toUpperCase() : null,
            city: header(request, "cf-ipcity") ?? header(request, "x-vercel-ip-city"),
            region: header(request, "cf-region") ?? header(request, "x-vercel-ip-country-region"),
          });
        } catch (error) {
          console.error("visit logging failed", error);
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
