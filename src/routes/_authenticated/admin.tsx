import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteChatMessage,
  deleteChatSession,
  getAdminData,
  type AdminChatLog,
} from "@/lib/admin.functions";


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

  const removeSession = useServerFn(deleteChatSession);
  const removeMessage = useServerFn(deleteChatMessage);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-data"] });

  const sessionMutation = useMutation({
    mutationFn: (sessionId: string) => removeSession({ data: { sessionId } }),
    onSuccess: () => {
      toast.success("Conversation deleted");
      void invalidate();
    },
    onError: () => toast.error("Could not delete conversation"),
  });

  const messageMutation = useMutation({
    mutationFn: (id: string) => removeMessage({ data: { id } }),
    onSuccess: () => {
      toast.success("Message deleted");
      void invalidate();
    },
    onError: () => toast.error("Could not delete message"),
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
            <h2 className="text-xl font-semibold">Unique visitors</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Last 24 hours", value: data.visitors.day },
                { label: "Last 7 days", value: data.visitors.week },
                { label: "Last 30 days", value: data.visitors.month },
                { label: "All time", value: data.visitors.total },
              ].map((stat) => (
                <div key={stat.label} className="panel p-5">
                  <p className="font-mono text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">

            <h2 className="text-xl font-semibold">CV downloads</h2>
            <div className="mt-5 panel p-6">
              <p className="font-mono text-4xl font-bold text-primary">{data.cvDownloadCount}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Total clicks on the "Download my CV" button.
              </p>
              {data.cvDownloads.length > 0 ? (
                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {data.cvDownloads.map((d) => (
                    <li
                      key={d.id}
                      className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"
                    >
                      <span className="rounded-full border border-border px-3 py-1">
                        {[d.city, d.region, d.country].filter(Boolean).join(", ") || "Unknown location"}
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 uppercase">
                        {d.language ?? "en"}
                      </span>
                      <span className="ml-auto font-mono">{formatDate(d.created_at)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">No downloads yet.</p>
              )}
            </div>
          </section>

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
                      {m.inquiry_type === "project" ? "Project" : "Offer"}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={sessionMutation.isPending}
                        onClick={() => {
                          if (window.confirm("Delete this whole conversation?")) {
                            sessionMutation.mutate(sessionId);
                          }
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete chat
                      </Button>
                    </div>
                    <div className="mt-4 space-y-3">
                      {ordered.map((log) => (
                        <div key={log.id} className="group text-sm">
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-[11px] uppercase text-primary">
                              {log.role === "user" ? "Visitor" : "Greta AI"}
                            </p>
                            <button
                              type="button"
                              disabled={messageMutation.isPending}
                              onClick={() => messageMutation.mutate(log.id)}
                              className="text-[11px] text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
                            >
                              delete
                            </button>
                          </div>
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
