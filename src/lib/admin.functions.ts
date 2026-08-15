import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  inquiry_type: string;
  created_at: string;
};

export type AdminChatLog = {
  id: string;
  session_id: string;
  role: string;
  content: string;
  language: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  ip_address: string | null;
  created_at: string;
};

export type AdminCvDownload = {
  id: string;
  language: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  event_type: string | null;
  created_at: string;
};

export type VisitorStats = {
  day: number;
  week: number;
  month: number;
  total: number;
};

async function requireAdmin(context: { claims: unknown }) {
  const { isAdminEmail } = await import("@/lib/admin.server");
  const email = (context.claims as { email?: string } | null)?.email;
  if (!isAdminEmail(email)) {
    throw new Error("Forbidden");
  }
}

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const now = Date.now();
    const since = (days: number) => new Date(now - days * 86400000).toISOString();

    const [messages, logs, downloads, downloadCount, completedCount, visits] = await Promise.all([
      supabaseAdmin
        .from("contact_messages")
        .select("id, name, email, message, inquiry_type, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      supabaseAdmin
        .from("chat_logs")
        .select("id, session_id, role, content, language, country, city, region, ip_address, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      supabaseAdmin
        .from("cv_downloads")
        .select("id, language, country, city, region, event_type, created_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabaseAdmin.from("cv_downloads").select("id", { count: "exact", head: true }).eq("event_type", "click"),
      supabaseAdmin.from("cv_downloads").select("id", { count: "exact", head: true }).eq("event_type", "completed"),
      supabaseAdmin
        .from("site_visits")
        .select("visitor_id, created_at")
        .order("created_at", { ascending: false })
        .limit(20000),
    ]);

    if (messages.error) throw messages.error;
    if (logs.error) throw logs.error;
    if (downloads.error) throw downloads.error;

    const rows = (visits.data ?? []) as { visitor_id: string; created_at: string }[];
    const uniqueSince = (iso: string) =>
      new Set(rows.filter((r) => r.created_at >= iso).map((r) => r.visitor_id)).size;

    const visitors: VisitorStats = {
      day: uniqueSince(since(1)),
      week: uniqueSince(since(7)),
      month: uniqueSince(since(30)),
      total: new Set(rows.map((r) => r.visitor_id)).size,
    };

    return {
      messages: (messages.data ?? []) as AdminContactMessage[],
      chatLogs: (logs.data ?? []) as AdminChatLog[],
      cvDownloads: (downloads.data ?? []) as AdminCvDownload[],
      cvDownloadCount: downloadCount.count ?? 0,
      cvCompletedCount: completedCount.count ?? 0,
      visitors,
    };
  });

export const deleteChatSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => {
    if (!data || typeof data.sessionId !== "string" || !data.sessionId) {
      throw new Error("sessionId is required");
    }
    return { sessionId: data.sessionId };
  })
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("chat_logs").delete().eq("session_id", data.sessionId);
    if (error) throw error;
    return { ok: true };
  });

export const deleteChatMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data || typeof data.id !== "string" || !data.id) throw new Error("id is required");
    return { id: data.id };
  })
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("chat_logs").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

