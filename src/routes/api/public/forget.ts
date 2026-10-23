import { createFileRoute } from "@tanstack/react-router";

// Self-service "right to be forgotten" (GDPR Art. 17). The visitor id is a
// random value that only exists in the visitor's own browser, so possessing it
// is what authorises erasure of the data linked to it.
export const Route = createFileRoute("/api/public/forget")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let visitorId = "";
        try {
          const b = (await request.json()) as { visitorId?: unknown };
          if (typeof b.visitorId === "string") visitorId = b.visitorId.slice(0, 64);
        } catch {
          /* invalid */
        }
        if (visitorId.length < 16) {
          return new Response(JSON.stringify({ ok: false }), { status: 400 });
        }
        const { eraseByVisitorIds } = await import("@/lib/erasure.server");
        const counts = await eraseByVisitorIds([visitorId]);
        return new Response(JSON.stringify({ ok: true, counts }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
