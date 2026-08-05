import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAdminData, type AdminChatLog } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Owner dashboard — Greta Rusecke" },
      { name: "description", content: "Private dashboard for contact messages and assistant logs." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function locationOf(log: AdminChatLog) {
  return [log.city, log.region, log.country].filter(Boolean).join(", ") || "Unknown location";
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAdminData = useServerFn(getAdminData);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-data"],
    queryFn: () => fetchAdminData(),
    retry: false,
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  };

  const sessions = new Map<string, AdminChatLog[]>();
  for (const log of data?.chatLogs ?? []) {
    const list = sessions.get(log.session_id) ?? [];
    list.push(log);
    sessions.set(log.session_id, list);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Owner dashboard</p>
          <h1 className="mt-2 text-3xl font-bold">Inbox &amp; assistant logs</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outlineSignal" onClick={() => void queryClient.invalidateQueries({ queryKey: ["admin-data"] })}>
            Refresh
          </Button>
          <Button variant="ghost" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </div>

      {isLoading ? <p className="mt-10 text-muted-foreground">Loading...</p> : null}
      {error ? (
        <p className="mt-10 text-destructive">
          You do not have access to this dashboard.
        </p>
      ) : null}

      {data ? (
        <>
          <section className="mt-12">
            <h2 className="text-xl font-semibold">
              Contact messages <span className="text-muted-foreground">({data.messages.length})</span>
            </h2>
            <div className="mt-5 space-y-4">
              {data.messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : null}
              {data.messages.map((m) => (
                <article key={m.id} className="panel p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-primary/50 px-3 py-1 font-mono text-[11px] uppercase text-primary">
                      {m.inquiry_type === "project" ? "Custom project" : "Job offer"}
                    </span>
                    <span className="font-semibold">{m.name}</span>
                    <a href={`mailto:${m.email}`} className="text-sm text-muted-foreground hover:text-primary">
                      {m.email}
                    </a>
                    <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                      {formatDate(m.created_at)}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">
              Greta AI conversations <span className="text-muted-foreground">({sessions.size})</span>
            </h2>
            <div className="mt-5 space-y-4">
              {sessions.size === 0 ? (
                <p className="text-sm text-muted-foreground">No conversations logged yet.</p>
              ) : null}
              {[...sessions.entries()].map(([sessionId, logs]) => {
                const ordered = [...logs].reverse();
                const first = ordered[0]!;
                return (
                  <article key={sessionId} className="panel p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{sessionId.slice(0, 8)}</span>
                      <span className="rounded-full border border-border px-3 py-1">{locationOf(first)}</span>
                      {first.ip_address ? (
                        <span className="font-mono">IP {first.ip_address}</span>
                      ) : null}
                      <span className="rounded-full border border-border px-3 py-1 uppercase">
                        {first.language ?? "en"}
                      </span>
                      <span className="ml-auto font-mono">{formatDate(first.created_at)}</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {ordered.map((log) => (
                        <div key={log.id} className="text-sm">
                          <p className="font-mono text-[11px] uppercase text-primary">
                            {log.role === "user" ? "Visitor" : "Greta AI"}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{log.content}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
