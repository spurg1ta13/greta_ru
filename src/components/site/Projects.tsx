import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

const projects = [
  { name: "Devcraft", url: "https://devcraft.gr", tags: ["AI Assistant", "Lovable", "React", "Vercel"] },
  { name: "Lotus Bloom", url: "https://lotusbloom.gr", tags: ["Tailwind CSS", "UX Design", "Responsive QA"] },
  { name: "CleanUpSKG", url: "https://cleanupskg.gr", tags: ["Content Platform", "SEO", "TypeScript"] },
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="scroll-mt-24 border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.projects.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.projects.heading}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t.projects.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal as="article" key={project.name} delay={i * 120} className="h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group panel flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-1 font-mono text-xs text-primary">
                  {project.url.replace("https://", "")}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.projects.summaries[i]}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
