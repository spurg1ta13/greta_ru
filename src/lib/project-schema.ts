export type ProjectSchema = {
  id: string;
  name: string;
  url: string;
  description: string;
  tech: string[];
  category: string;
  datePublished: string;
};

export const projectSchemas: ProjectSchema[] = [
  {
    id: "devcraft",
    name: "Devcraft",
    url: "https://devcraft.gr",
    description:
      "Company landing page for Devcraft featuring an interactive AI assistant that handles client support and qualifies incoming enquiries automatically. Designed, built, QA-tested and deployed end to end by Greta Rusecke.",
    tech: ["AI Assistant", "Lovable", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "BusinessApplication",
    datePublished: "2025-01-01",
  },
  {
    id: "lotus-bloom",
    name: "Lotus Bloom",
    url: "https://lotusbloom.gr",
    description:
      "Beauty salon platform with interactive service menus, transparent pricing and a responsive photo gallery, built and cross-device QA-tested by Greta Rusecke.",
    tech: ["React", "Tailwind CSS", "UX Design", "Responsive QA"],
    category: "LifestyleApplication",
    datePublished: "2025-01-01",
  },
  {
    id: "cleanupskg",
    name: "CleanUpSKG",
    url: "https://cleanupskg.gr",
    description:
      "Informational platform for commercial cleaning services in Thessaloniki with an integrated blog and a lead capture flow, built, SEO-optimised and tested by Greta Rusecke.",
    tech: ["TypeScript", "Content Platform", "SEO", "Lead Capture"],
    category: "BusinessApplication",
    datePublished: "2025-01-01",
  },
];

const BASE = "https://gretagreta.eu";

export const projectJsonLdNodes = [
  {
    "@type": "ItemList",
    "@id": `${BASE}/#projects`,
    name: "Products built and shipped by Greta Rusecke",
    numberOfItems: projectSchemas.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projectSchemas.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: project.url,
      item: { "@id": `${BASE}/#project-${project.id}` },
    })),
  },
  ...projectSchemas.map((project) => ({
    "@type": ["SoftwareApplication", "CreativeWork"],
    "@id": `${BASE}/#project-${project.id}`,
    name: project.name,
    url: project.url,
    sameAs: [project.url],
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: "Web browser",
    browserRequirements: "Requires JavaScript and a modern web browser",
    keywords: project.tech.join(", "),
    programmingLanguage: project.tech,
    datePublished: project.datePublished,
    inLanguage: ["en", "el"],
    isAccessibleForFree: true,
    author: { "@id": `${BASE}/#greta` },
    creator: { "@id": `${BASE}/#greta` },
    maintainer: { "@id": `${BASE}/#greta` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  })),
];
