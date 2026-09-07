import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Greta Rusecke" },
      {
        name: "description",
        content:
          "Private owner sign-in for the Greta Rusecke portfolio dashboard, used to review contact messages, assistant chat logs and site activity.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Sign in — Greta Rusecke" },
      {
        property: "og:description",
        content:
          "Private owner sign-in for the Greta Rusecke portfolio dashboard, used to review contact messages, assistant chat logs and site activity.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      await navigate({ to: "/admin", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="panel w-full max-w-md p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Private area</p>
        <h1 className="mt-3 text-2xl font-bold">Owner sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This dashboard is restricted to the site owner.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={busy}>
            {busy ? "Please wait..." : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
