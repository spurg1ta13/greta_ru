import { Award, Bot, ClipboardCheck, Globe, KanbanSquare } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

const icons = [KanbanSquare, ClipboardCheck, Bot];

export function Timeline() {
  const { t } = useLanguage();
  const steps = t.about.steps.map((step, i) => ({ ...step, icon: icons[i]! }));

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.about.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
          {t.about.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t.about.lead}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground">
          <Globe className="size-3.5 text-primary" />
          {t.about.globalReach}
        </p>
      </Reveal>

      <ol className="relative mt-14 space-y-8 border-l border-border pl-6 sm:pl-10">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.role} delay={i * 120} className="relative">
            <span
              className="absolute -left-[31px] top-6 grid size-6 place-items-center rounded-full border border-border bg-surface sm:-left-[47px]"
              aria-hidden="true"
            >
              <step.icon className="size-3 text-primary" />
            </span>
            <article className="panel p-6 transition-colors hover:border-primary/50 sm:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold sm:text-xl">{step.role}</h3>
                </div>

                <span className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  {step.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={300}>
        <div className="mt-10 panel p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full border border-border bg-surface">
              <Award className="size-4 text-signal" />
            </span>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
              {t.about.credentials.heading}
            </h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {t.about.credentials.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

