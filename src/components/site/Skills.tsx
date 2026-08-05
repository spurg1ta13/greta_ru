import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.skills.eyebrow}</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.skills.heading}</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {t.skills.groups.map((group, i) => (
          <Reveal key={group} delay={i * 100}>
            <div className="panel h-full p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
                {group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.skills.items[i]?.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

