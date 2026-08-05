import { Github, Linkedin } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#greta-ai", label: "Greta AI" },
  { href: "#contact", label: "Contact" },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl animate-glow"
        style={{ background: "var(--gradient-signal)", opacity: 0.18 }}
      />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6">
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

      <div id="top" className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-14 sm:pb-32 sm:pt-24">
        <div>
          <div className="min-w-0">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-signal" />
              Thessaloniki, Greece · Open to work
            </p>

            <h1 className="animate-rise mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-6xl">
              ISTQB QA Specialist <span className="text-gradient">&amp; AI Product Builder</span>
            </h1>

            <p className="animate-rise mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bridging the gap between QA precision, product logic, and rapid AI-assisted execution.
            </p>

            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="hero">
                <a href="#greta-ai">Chat with Greta AI</a>
              </Button>
              <Button asChild size="lg" variant="outlineSignal">
                <a href="#projects">View Projects</a>
              </Button>
            </div>
          </div>

        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {[
            { k: "8+ yrs", v: "IT & QA experience" },
            { k: "ISTQB", v: "Certified Tester (CTFL)" },
            { k: "3 live", v: "Products shipped solo" },
          ].map((stat) => (
            <div key={stat.v} className="min-w-0">
              <dt className="font-display text-2xl font-bold text-foreground">{stat.k}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.v}</dd>
            </div>
          ))}
        </dl>
      </div>

    </header>
  );
}
