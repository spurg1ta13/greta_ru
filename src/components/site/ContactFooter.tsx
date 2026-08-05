import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Message is too long"),
});

export function ContactFooter() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);

    if (error) {
      console.error(error);
      toast.error("Message could not be sent. Please email greta.rusecke@gmail.com instead.");
      return;
    }

    toast.success("Thanks! Your message reached Greta's inbox.");
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <footer id="contact" className="scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              05 / Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Let's build something that ships clean.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Open to QA Product Engineer, QA Lead and AI product roles — remote or in Thessaloniki.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href="mailto:greta.rusecke@gmail.com"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 shrink-0" />
                greta.rusecke@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/gretaruseckeqa"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="size-4 shrink-0" />
                linkedin.com/in/gretaruseckeqa
              </a>
              <a
                href="https://github.com/spurg1ta13"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="size-4 shrink-0" />
                github.com/spurg1ta13
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="panel space-y-5 p-6 sm:p-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={values.name}
                  maxLength={100}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  placeholder="Your name"
                />
                {errors["name"] ? (
                  <p className="text-xs text-destructive">{errors["name"]}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  maxLength={255}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  placeholder="you@company.com"
                />
                {errors["email"] ? (
                  <p className="text-xs text-destructive">{errors["email"]}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  maxLength={2000}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  placeholder="Tell Greta about the role or project..."
                />
                {errors["message"] ? (
                  <p className="text-xs text-destructive">{errors["message"]}</p>
                ) : null}
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={sending}>
                {sending ? "Sending..." : "Send message"}
              </Button>
            </form>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex sm:justify-between">
          <p className="min-w-0">© {new Date().getFullYear()} Greta Rusecke. All rights reserved.</p>
          <nav className="flex shrink-0 items-center gap-4">
            <Link to="/privacy" target="_blank" rel="noreferrer" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" target="_blank" rel="noreferrer" className="hover:text-primary">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
