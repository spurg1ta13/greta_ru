import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

const projects = [
  { name: "Devcraft", url: "https://devcraft.gr", tags: ["AI Assistant", "Lovable", "React", "Vercel"] },
  { name: "Lotus Bloom", url: "https://lotusbloom.gr", tags: ["Tailwind CSS", "UX Design", "Responsive QA"] },
  { name: "CleanUpSKG", url: "https://cleanupskg.gr", tags: ["Content Platform", "SEO", "TypeScript"] },
  { name: "NE*** Files storage secure system", url: null, tags: ["TOTP MFA", "Supabase RLS", "Role-Based Access"] },
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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal as="article" key={project.name} delay={i * 120} className="h-full">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group panel flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
                >
                  <CardInner project={project} />
                </a>
              ) : (
                <div className="panel flex h-full flex-col p-6">
                  <CardInner project={project} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
