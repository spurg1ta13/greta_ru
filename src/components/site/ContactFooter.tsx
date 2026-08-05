import { Link } from "@tanstack/react-router";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import cvAsset from "@/assets/greta-cv.pdf.asset.json";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, type Dictionary } from "@/lib/i18n";

const buildSchema = (t: Dictionary) =>
  z.object({
    name: z.string().trim().min(1, t.contact.errors.name).max(100, t.contact.errors.nameLong),
    email: z.string().trim().email(t.contact.errors.email).max(255),
    message: z
      .string()
      .trim()
      .min(10, t.contact.errors.message)
      .max(2000, t.contact.errors.messageLong),
  });


export function ContactFooter() {
  const { t, language } = useLanguage();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [inquiryType, setInquiryType] = useState<"job" | "project">("project");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  // Bot protection: hidden honeypot field + minimum time-on-form + submit cooldown.
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());
  const lastSubmit = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot filled or form submitted suspiciously fast => silently drop (bot).
    if (honeypot.trim() !== "" || Date.now() - mountedAt.current < 3000) {
      toast.success(t.contact.success);
      setValues({ name: "", email: "", message: "" });
      return;
    }
    if (Date.now() - lastSubmit.current < 15000) {
      toast.error(t.contact.failure);
      return;
    }

    const parsed = buildSchema(t).safeParse(values);
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
    lastSubmit.current = Date.now();
    const { error } = await supabase.from("contact_messages").insert({ ...parsed.data, inquiry_type: inquiryType });
    setSending(false);

    if (error) {
      console.error(error);
      toast.error(t.contact.failure);
      return;
    }

    toast.success(t.contact.success);
    setValues({ name: "", email: "", message: "" });
    setInquiryType("job");
  };

  return (
    <footer id="contact" className="scroll-mt-24 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              {t.contact.heading}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t.contact.lead}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href="tel:+306975835277"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4 shrink-0" />
                {t.contact.phoneNumber}
              </a>
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" className="gap-2">
                <a href="tel:+306975835277">
                  <Phone className="size-4" />
                  {t.contact.phone}
                </a>
              </Button>
              <Button asChild variant="outlineSignal" className="gap-2">
                <a href="mailto:greta.rusecke@gmail.com">
                  <Mail className="size-4" />
                  {t.contact.email}
                </a>
              </Button>
            </div>

            <div className="mt-4">
              <Button asChild variant="outlineSignal" className="gap-2">
                <a
                  href={cvAsset.url}
                  download="Greta_Rusecke_CV.pdf"
                  onClick={() => {
                    void fetch("/api/public/cv-download", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ language }),
                      keepalive: true,
                    }).catch(() => undefined);
                  }}
                >
                  <Download className="size-4" />
                  {t.contact.downloadCv}
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="panel relative space-y-5 p-6 sm:p-8">
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.contact.inquiry}</Label>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t.contact.inquiry}>
                  {([
                    ["job", t.contact.inquiryJob],
                    ["project", t.contact.inquiryProject],
                  ] as const).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={inquiryType === key}
                      onClick={() => setInquiryType(key)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                        inquiryType === key
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input
                  id="name"
                  value={values.name}
                  maxLength={100}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  placeholder={t.contact.namePlaceholder}
                />
                {errors["name"] ? (
                  <p className="text-xs text-destructive">{errors["name"]}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  maxLength={255}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  placeholder={t.contact.emailPlaceholder}
                />
                {errors["email"] ? (
                  <p className="text-xs text-destructive">{errors["email"]}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.message}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  maxLength={2000}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  placeholder={t.contact.messagePlaceholder}
                />
                {errors["message"] ? (
                  <p className="text-xs text-destructive">{errors["message"]}</p>
                ) : null}
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={sending}>
                {sending ? t.contact.sending : t.contact.send}
              </Button>
            </form>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex sm:justify-between">
          <p className="min-w-0">© {new Date().getFullYear()} Greta Rusecke. {t.contact.rights}</p>
          <nav className="flex shrink-0 items-center gap-4">
            <Link to="/privacy" target="_blank" rel="noreferrer" className="hover:text-primary">
              {t.contact.privacy}
            </Link>
            <Link to="/terms" target="_blank" rel="noreferrer" className="hover:text-primary">
              {t.contact.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
