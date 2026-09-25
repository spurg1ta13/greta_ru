import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { blogPosts, getPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const url = `https://gretagreta.eu/blog/${post.slug}`;
    const t = `${post.title} — Greta Rusecke`;
    return {
      meta: [
        { title: t },
        { name: "description", content: post.description },
        { name: "keywords", content: post.tags.join(", ") },
        { property: "og:title", content: t },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:author", content: "Greta Rusecke" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${url}#article`,
                headline: post.title,
                description: post.description,
                abstract: post.summary,
                url,
                mainEntityOfPage: url,
                datePublished: post.datePublished,
                dateModified: post.datePublished,
                inLanguage: "en",
                keywords: post.tags.join(", "),
                author: {
                  "@type": "Person",
                  "@id": "https://gretagreta.eu/#greta",
                  name: "Greta Rusecke",
                  url: "https://gretagreta.eu/",
                  jobTitle: "ISTQB Certified QA Specialist",
                },
                publisher: { "@id": "https://gretagreta.eu/#greta" },
              },
              {
                "@type": "FAQPage",
                mainEntity: post.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://gretagreta.eu/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://gretagreta.eu/blog" },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPost,
});

function PostNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-block text-primary">
        ← Back to blog
      </Link>
    </main>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <Link to="/">Home</Link> / <Link to="/blog">Blog</Link>
      </nav>
      <article className="mt-8">
        <header>
          <p className="font-mono text-xs text-muted-foreground">
            <time dateTime={post.datePublished}>{post.datePublished}</time> · {post.readMinutes} min read · by
            Greta Rusecke, ISTQB Certified QA Specialist
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-6 rounded-lg border border-primary/40 bg-card p-5 text-foreground">
            <strong className="font-mono text-xs uppercase tracking-[0.2em] text-primary">TL;DR </strong>
            {post.summary}
          </p>
        </header>

        <div className="mt-10 space-y-10 leading-relaxed text-muted-foreground">
          {post.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-semibold text-foreground">{s.h}</h2>
              {s.p?.map((para) => (
                <p key={para} className="mt-3">
                  {para}
                </p>
              ))}
              {s.list ? (
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {s.list.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <dl className="mt-4 space-y-5">
              {post.faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-foreground">{f.q}</dt>
                  <dd className="mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>

      <aside className="mt-16 rounded-lg border border-border bg-card p-6">
        <p className="text-foreground">Need QA or a security review for your product?</p>
        <Link to="/" hash="contact" className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Contact Greta →
        </Link>
      </aside>

      {others.length ? (
        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Read next</p>
          {others.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="mt-3 block text-lg font-semibold hover:text-primary">
              {p.title}
            </Link>
          ))}
        </div>
      ) : null}
    </main>
  );
}
