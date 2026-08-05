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

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { isAdminEmail } = await import("@/lib/admin.server");
    const email = (context.claims as { email?: string } | null)?.email;
    if (!isAdminEmail(email)) {
      throw new Error("Forbidden");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [messages, logs] = await Promise.all([
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
    ]);

    if (messages.error) throw messages.error;
    if (logs.error) throw logs.error;

    return {
      messages: (messages.data ?? []) as AdminContactMessage[],
      chatLogs: (logs.data ?? []) as AdminChatLog[],
    };
  });
