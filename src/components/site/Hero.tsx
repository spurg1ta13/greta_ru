import { Github, Linkedin } from "lucide-react";

import heroBgJpg from "@/assets/hero-bg.jpg";
import heroBgWebp from "@/assets/hero-bg.webp";

import { LanguageToggle } from "@/components/site/LanguageToggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#greta-ai", label: t.nav.gretaAi },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="font-display text-sm font-bold tracking-tight sm:text-base">
            Greta<span className="text-gradient">.Rusecke</span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-1">
            <LanguageToggle />
            <a
              href="https://github.com/spurg1ta13"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Greta Rusecke on GitHub"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/gretaruseckeqa"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Greta Rusecke on LinkedIn"
              className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </nav>
      </div>

      <header className="relative overflow-hidden">
        <picture>
          <source srcSet={heroBgWebp} type="image/webp" />
          <img
            src={heroBgJpg}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl animate-glow"
          style={{ background: "var(--gradient-signal)", opacity: 0.18 }}
        />




      <div id="top" className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-14 sm:pb-32 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" />
              {t.hero.badge}
            </p>

            <h1 className="animate-rise mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl">
              {t.hero.titleA}<span className="text-gradient">{t.hero.titleB}</span>
            </h1>

            <p className="animate-rise mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.tagline}
            </p>

            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="hero">
                <a href="#greta-ai">{t.hero.ctaChat}</a>
              </Button>
              <Button asChild size="lg" variant="outlineSignal">
                <a href="#projects">{t.hero.ctaProjects}</a>
              </Button>
            </div>
          </div>

          <div className="animate-rise relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl"
              style={{ background: "var(--gradient-signal)", opacity: 0.16 }}
              aria-hidden="true"
            />
            <img
              src={heroIllustration.url}
              alt="Greta Rusecke - ISTQB QA Specialist & AI Product Builder illustration showcasing bug hunting, no-code development, and automation."
              width={900}
              height={1125}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative w-full rounded-2xl border border-border/70 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] ring-1 ring-signal/20"
            />
          </div>
        </div>


        <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {t.hero.stats.map((stat) => (
            <div key={stat.v} className="min-w-0">
              <dt className="font-display text-2xl font-bold text-foreground">{stat.k}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.v}</dd>
            </div>
          ))}
        </dl>
      </div>

    </header>
    </>
  );
}
