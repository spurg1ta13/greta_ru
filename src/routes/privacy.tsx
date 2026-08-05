import { createFileRoute, Link } from "@tanstack/react-router";

import { useLanguage } from "@/lib/i18n";

const title = "Privacy Policy — Greta Rusecke";
const description =
  "How greta's portfolio site handles contact form submissions and Greta AI chat messages.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLanguage();
  const sections = t.legal.privacy as ReadonlyArray<{
    h: string;
    p?: string;
    list?: readonly string[];
  }>;

  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {t.legal.back}
      </Link>
      <h1 className="mt-6 text-4xl font-bold">{t.legal.privacyTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t.legal.updated}</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        {sections.map((section) => (
          <section key={section.h}>
            <h2 className="text-lg font-semibold text-foreground">{section.h}</h2>
            {section.p ? <p className="mt-2">{section.p}</p> : null}
            {section.list ? (
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
