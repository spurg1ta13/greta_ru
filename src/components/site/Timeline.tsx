import { Bot, ClipboardCheck, KanbanSquare } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    icon: KanbanSquare,
    period: "2016 — 2018",
    role: "IT Project Manager",
    org: "SJ Digital · Capital Realty (Lithuania)",
    points: [
      "Ran agile delivery for .NET, PHP and Ruby teams — standups, sprint planning, timelines.",
      "Owned client relations with B2B stakeholders in the USA, UK, Spain, New Zealand and Latvia.",
      "Stayed hands-on with manual QA for every release before it reached the client.",
    ],
  },
  {
    icon: ClipboardCheck,
    period: "2021 — 2026",
    role: "QA Product Engineer · ISTQB Certified",
    org: "Sonaro UAB · Zebracloud AB (remote)",
    points: [
      "End-to-end manual, functional and regression suites across Windows, macOS and iOS via BrowserStack.",
      "Full defect lifecycle in Jira with high-detail reports that cut developer resolution time.",
      "Refined system logic with developers and product owners, removing requirement ambiguity before sprint planning.",
    ],
  },
  {
    icon: Bot,
    period: "2024 — now",
    role: "AI Product Builder / Full-Stack Developer",
    org: "Independent · Lovable, Vercel, TypeScript",
    points: [
      "Prototypes and ships production-ready apps with AI tooling — days of work compressed into hours.",
      "Owns the whole pipeline: prototype, QA cycle, GitHub version control, Vercel deploy, DNS and env config.",
      "Three live products launched solo with zero critical launch bugs.",
    ],
  },
];

export function Timeline() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">01 / About</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
          From managing delivery, to guarding quality, to building the product.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A QA Product Engineer who connects business logic with technical execution across SaaS,
          ERP, CRM and e-commerce — and now builds the products too.
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
