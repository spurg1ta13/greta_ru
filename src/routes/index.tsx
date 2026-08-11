import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

import heroBgWebp from "@/assets/hero-bg.webp";

import { ContactFooter } from "@/components/site/ContactFooter";

import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Timeline } from "@/components/site/Timeline";
import { projectJsonLdNodes } from "@/lib/project-schema";
import { trackVisit } from "@/lib/visit-tracker";

const GretaChat = lazy(() =>
  import("@/components/site/GretaChat").then((m) => ({ default: m.GretaChat })),
);

const title = "Greta Rusecke — ISTQB QA Specialist & AI Product Builder";
const description =
  "Portfolio of Greta Rusecke: ISTQB certified QA Product Engineer and AI product builder in Thessaloniki. QA strategy, E2E testing and shipped AI-built web products.";

const person = {
  "@type": "Person",
  "@id": "https://gretagreta.eu/#greta",
  name: "Greta Rusecke",
  jobTitle: "QA Product Engineer & AI Product Builder",
  description:
    "ISTQB Certified Tester (Foundation Level) working as a QA Product Engineer and AI product builder in Thessaloniki, Greece.",
  email: "mailto:greta@gretagreta.eu",
  telephone: "+306975835277",
  url: "https://gretagreta.eu/",
  address: { "@type": "PostalAddress", addressLocality: "Thessaloniki", addressCountry: "GR" },
  sameAs: ["https://github.com/spurg1ta13", "https://www.linkedin.com/in/gretaruseckeqa"],
  knowsLanguage: ["en", "el", "lt", "ru"],
  knowsAbout: [
    "Software Testing",
    "ISTQB",
    "QA Strategy",
    "Test Automation",
    "End-to-end testing",
    "AI-assisted development",
    "Prompt engineering",
    "React",
    "TypeScript",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "ISTQB Certified Tester Foundation Level",
  },
  seeks: {
    "@type": "Demand",
    name: "Career opportunities and custom product development projects",
  },
};

const faq = {
  "@type": "FAQPage",
  "@id": "https://gretagreta.eu/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Greta Rusecke?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greta Rusecke is an ISTQB Certified QA Specialist and AI product builder based in Thessaloniki, Greece. She works as a QA Product Engineer, owning test strategy and release readiness, and builds and ships AI-assisted web products end to end.",
      },
    },
    {
      "@type": "Question",
      name: "What QA certification does Greta hold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "She is an ISTQB Certified Tester at Foundation Level, covering test design techniques, test management, defect lifecycle and quality processes.",
      },
    },
    {
      "@type": "Question",
      name: "What projects has Greta built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Her shipped products include Devcraft, Lotus Bloom and CleanUpSKG — web applications she designed, built and tested herself using AI-assisted development.",
      },
    },
    {
      "@type": "Question",
      name: "Is Greta available for work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. She is open to career opportunities and custom product development, and can be reached through the contact form on this site or at greta@gretagreta.eu.",
      },
    },
  ],
};

const localBusiness = {
  "@type": "ProfessionalService",
  "@id": "https://gretagreta.eu/#business",
  name: "Greta Rusecke — QA & AI Product Development",
  description:
    "Independent QA consulting and AI-assisted product development: test strategy, E2E testing and production-ready web applications.",
  url: "https://gretagreta.eu/",
  email: "mailto:greta@gretagreta.eu",
  telephone: "+306975835277",
  image:
    "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/623d0f94-4d37-40c9-bc9c-ca33c2063794/id-preview-91efc197--7b07a86f-6a5c-4be8-8cd6-b2b3157e6469.lovable.app-1785937822203.png",
  address: { "@type": "PostalAddress", addressLocality: "Thessaloniki", addressCountry: "GR" },
  areaServed: "Worldwide",
  availableLanguage: ["en", "el", "lt", "ru"],
  founder: { "@id": "https://gretagreta.eu/#greta" },
  sameAs: ["https://github.com/spurg1ta13", "https://www.linkedin.com/in/gretaruseckeqa"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    localBusiness,
    {
      "@type": "WebSite",
      "@id": "https://gretagreta.eu/#website",
      name: "Greta Rusecke — Portfolio",
      url: "https://gretagreta.eu/",
      inLanguage: ["en", "el"],
      about: { "@id": "https://gretagreta.eu/#greta" },
      publisher: { "@id": "https://gretagreta.eu/#greta" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://gretagreta.eu/#profilepage",
      name: title,
      description,
      isPartOf: { "@id": "https://gretagreta.eu/#website" },
      mainEntity: { "@id": "https://gretagreta.eu/#greta" },
      hasPart: { "@id": "https://gretagreta.eu/#projects" },
    },
    faq,
    ...projectJsonLdNodes,
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Greta Rusecke, ISTQB certified tester, QA specialist Thessaloniki, QA product engineer, AI product builder, test strategy, E2E testing",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://gretagreta.eu/" },
      { property: "og:site_name", content: "Greta Rusecke" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "el_GR" },
      { property: "profile:first_name", content: "Greta" },
      { property: "profile:last_name", content: "Rusecke" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/623d0f94-4d37-40c9-bc9c-ca33c2063794/id-preview-91efc197--7b07a86f-6a5c-4be8-8cd6-b2b3157e6469.lovable.app-1785937822203.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/623d0f94-4d37-40c9-bc9c-ca33c2063794/id-preview-91efc197--7b07a86f-6a5c-4be8-8cd6-b2b3157e6469.lovable.app-1785937822203.png",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: heroBgWebp, type: "image/webp", fetchPriority: "high" },
      { rel: "canonical", href: "https://gretagreta.eu/" },
      { rel: "alternate", hrefLang: "en", href: "https://gretagreta.eu/" },
      { rel: "alternate", hrefLang: "el", href: "https://gretagreta.eu/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://gretagreta.eu/" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});


function Index() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.history.scrollRestoration) window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    trackVisit(document.documentElement.lang || "en");
  }, []);


  return (
    <main>
      <Hero />

      <Timeline />
      <Projects />
      <Skills />
      <Suspense fallback={<div id="greta-ai" className="min-h-[880px] scroll-mt-24" aria-hidden="true" />}>
        <GretaChat />
      </Suspense>
      <ContactFooter />
    </main>
  );
}
