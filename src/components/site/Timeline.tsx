import { Bot, ClipboardCheck, KanbanSquare } from "lucide-react";

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
                  <p className="mt-1 text-sm text-muted-foreground">{step.org}</p>
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
    </section>
  );
}
