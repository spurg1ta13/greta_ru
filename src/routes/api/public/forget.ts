import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Self-service "right to be forgotten" (GDPR Art. 17). Erases everything linked to
// the browser's visitor id and to the email/phone the visitor enters. The entered
// details are used only to find matching rows and are never stored or logged.
const Body = z.object({
  visitorId: z.string().min(16).max(64).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional(),
});

export const Route = createFileRoute("/api/public/forget")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response(JSON.stringify({ ok: false }), { status: 400 });
        const { visitorId, email, phone } = parsed.data;
        const { eraseByVisitorIds } = await import("@/lib/erasure.server");
        await eraseByVisitorIds(visitorId ? [visitorId] : [], [email], phone ? [phone] : []);
        // Same response whether or not anything matched, so no one can probe for data.
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
