import { Link, createFileRoute } from "@tanstack/react-router";

import { blogPosts } from "@/lib/blog-posts";

const title = "QA & Security Blog — Greta Rusecke";
const description =
  "Practical articles on software QA testing, release readiness and penetration testing by ISTQB-certified QA specialist Greta Rusecke.";
const url = "https://gretagreta.eu/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${url}#blog`,
          name: title,
          description,
          url,
          author: { "@type": "Person", "@id": "https://gretagreta.eu/#greta", name: "Greta Rusecke" },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${url}/${p.slug}`,
            datePublished: p.datePublished,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        ← gretagreta.eu
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-primary">// blog</p>
      <h1 className="mt-3 text-4xl font-bold">QA & Security Blog</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>

      <div className="mt-12 space-y-6">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {p.datePublished} · {p.readMinutes} min read
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
