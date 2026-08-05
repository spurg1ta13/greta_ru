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

export const Route = createFileRoute("/api/public/cv-download")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let language: string | null = null;
        try {
          const body = (await request.json()) as { language?: unknown };
          if (body.language === "el" || body.language === "en") language = body.language;
        } catch {
          language = null;
        }

        const country = header(request, "cf-ipcountry") ?? header(request, "x-vercel-ip-country");

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("cv_downloads").insert({
            language,
            ip_address: pickIp(request),
            country: country ? country.toUpperCase() : null,
            city: header(request, "cf-ipcity") ?? header(request, "x-vercel-ip-city"),
            region: header(request, "cf-region") ?? header(request, "x-vercel-ip-country-region"),
          });
        } catch (error) {
          console.error("cv-download logging failed", error);
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
