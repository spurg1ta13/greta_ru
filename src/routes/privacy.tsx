import { createFileRoute, Link } from "@tanstack/react-router";

const title = "Privacy Policy — Greta Rusecke";
const description =
  "How greta's portfolio site handles contact form submissions and Greta AI chat messages.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        ← Back to portfolio
      </Link>
      <h1 className="mt-6 text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 5 August 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Who runs this site</h2>
          <p className="mt-2">
            This personal portfolio is maintained by Greta Rusecke (Thessaloniki, Greece). For any
            privacy question, write to{" "}
            <a className="text-primary" href="mailto:greta.rusecke@gmail.com">
              greta.rusecke@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">What is collected</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Contact form:</strong> the name, email address and
              message you submit. These are stored securely so Greta can reply to you.
            </li>
            <li>
              <strong className="text-foreground">Greta AI chat:</strong> the questions you type are
              sent to an AI model provider to generate an answer. Chat conversations are not saved
              on this site and disappear when you reload the page.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">How it is used</h2>
          <p className="mt-2">
            Contact details are used only to respond to your enquiry. They are never sold, rented or
            used for marketing lists.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Retention</h2>
          <p className="mt-2">
            Contact messages are kept for as long as needed to handle the conversation and are
            deleted on request.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
          <p className="mt-2">
            Under the GDPR you may request access to, correction of, or deletion of the personal
            data you submitted. Email the address above and the request will be handled promptly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
          <p className="mt-2">
            This site does not use advertising or tracking cookies. Only technical storage needed to
            display the page is used.
          </p>
        </section>
      </div>
    </main>
  );
}
