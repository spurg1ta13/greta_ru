import { createFileRoute } from "@tanstack/react-router";

function pickCountry(request: Request): string | null {
  const headers = request.headers;
  const direct =
    headers.get("cf-ipcountry") ??
    headers.get("x-vercel-ip-country") ??
    headers.get("x-country-code") ??
    headers.get("x-geo-country");
  if (direct && direct.length === 2) return direct.toUpperCase();
  return null;
}

export const Route = createFileRoute("/api/public/geo")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const country = pickCountry(request);
        return new Response(
          JSON.stringify({ country, language: country === "GR" ? "el" : "en" }),
          {
            headers: {
              "content-type": "application/json",
              "cache-control": "no-store",
            },
          },
        );
      },
    },
  },
});
