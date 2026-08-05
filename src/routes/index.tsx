import { createFileRoute } from "@tanstack/react-router";

import { ContactFooter } from "@/components/site/ContactFooter";
import { GretaChat } from "@/components/site/GretaChat";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Timeline } from "@/components/site/Timeline";

const title = "Greta Rusecke — ISTQB QA Specialist & AI Product Builder";
const description =
  "Portfolio of Greta Rusecke: ISTQB certified QA Product Engineer and AI product builder in Thessaloniki. QA strategy, E2E testing and shipped AI-built web products.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Greta Rusecke",
  jobTitle: "QA Product Engineer & AI Product Builder",
  email: "mailto:greta.rusecke@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Thessaloniki", addressCountry: "GR" },
  sameAs: ["https://github.com/spurg1ta13", "https://www.linkedin.com/in/gretaruseckeqa"],
  knowsAbout: ["Software Testing", "ISTQB", "QA Strategy", "AI-assisted development", "React"],
  hasCredential: "ISTQB Certified Tester Foundation Level",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <GretaChat />
      <ContactFooter />
    </main>
  );
}
