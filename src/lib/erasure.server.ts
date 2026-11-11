type Table = "chat_logs" | "contact_messages" | "cv_downloads" | "site_visits" | "consent_records";
const TABLES: Table[] = ["chat_logs", "contact_messages", "cv_downloads", "site_visits", "consent_records"];

const esc = (s: string) => s.replace(/[%_,()\\]/g, "");

/**
 * Erases every row linked to the given visitor ids, emails and phone numbers.
 * Emails/phones are only used for matching and are never stored or logged.
 */
export async function eraseByVisitorIds(visitorIds: string[], emails: string[] = [], phones: string[] = []) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const ids = new Set(visitorIds.filter(Boolean));
  const counts = { chat_logs: 0, contact_messages: 0, cv_downloads: 0, site_visits: 0, consent_records: 0 } as Record<Table, number>;
  const terms = [...emails.map((e) => e.trim().toLowerCase()), ...phones.map((p) => p.replace(/[^\d+]/g, ""))]
    .map(esc)
    .filter((t) => t.length >= 5);

  for (const email of emails.map((e) => esc(e.trim()))) {
    if (!email) continue;
    const { data } = await supabaseAdmin.from("contact_messages").select("visitor_id").ilike("email", email);
    for (const r of data ?? []) if (r.visitor_id) ids.add(r.visitor_id);
    const { count } = await supabaseAdmin.from("contact_messages").delete({ count: "exact" }).ilike("email", email);
    counts["contact_messages"] += count ?? 0;
  }
  for (const term of terms) {
    const c1 = await supabaseAdmin.from("contact_messages").delete({ count: "exact" }).ilike("message", `%${term}%`);
    counts["contact_messages"] += c1.count ?? 0;
    const { data } = await supabaseAdmin.from("chat_logs").select("session_id").ilike("content", `%${term}%`);
    const sessions = [...new Set((data ?? []).map((r) => r.session_id))];
    if (sessions.length) {
      const c2 = await supabaseAdmin.from("chat_logs").delete({ count: "exact" }).in("session_id", sessions);
      counts["chat_logs"] += c2.count ?? 0;
    }
  }
  const list = [...ids];
  if (list.length) {
    for (const t of TABLES) {
      const { count, error } = await supabaseAdmin.from(t).delete({ count: "exact" }).in("visitor_id", list);
      if (error) throw error;
      counts[t] += count ?? 0;
    }
  }
  return counts;
}
