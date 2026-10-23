type Table = "chat_logs" | "contact_messages" | "cv_downloads" | "site_visits" | "consent_records";
const TABLES: Table[] = ["chat_logs", "contact_messages", "cv_downloads", "site_visits", "consent_records"];

/** Deletes every row linked to the given visitor ids (and optionally emails). Returns rows removed per table. */
export async function eraseByVisitorIds(visitorIds: string[], emails: string[] = []) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const ids = [...new Set(visitorIds.filter(Boolean))];
  const counts: Record<string, number> = {};
  for (const t of TABLES) counts[t] = 0;

  if (emails.length) {
    const { count } = await supabaseAdmin
      .from("contact_messages")
      .delete({ count: "exact" })
      .in("email", emails);
    counts["contact_messages"] = (counts["contact_messages"] ?? 0) + (count ?? 0);
  }
  if (ids.length) {
    for (const t of TABLES) {
      const { count, error } = await supabaseAdmin.from(t).delete({ count: "exact" }).in("visitor_id", ids);
      if (error) throw error;
      counts[t] = (counts[t] ?? 0) + (count ?? 0);
    }
  }
  return counts;
}
