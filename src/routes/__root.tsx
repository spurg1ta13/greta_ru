import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";
import { FloatingCallButton } from "../components/site/FloatingCallButton";
import { CookieBanner } from "../components/site/CookieBanner";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../lib/i18n";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Greta Rusecke — ISTQB QA Specialist & AI Product Builder" },
      {
        name: "description",
        content:
          "ISTQB certified QA Product Engineer and AI product builder based in Thessaloniki, Greece.",
      },
      { name: "author", content: "Greta Rusecke" },
      { property: "og:title", content: "Greta Rusecke — ISTQB QA Specialist & AI Product Builder" },
      {
        property: "og:description",
        content:
          "ISTQB certified QA Product Engineer and AI product builder based in Thessaloniki, Greece.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Greta Rusecke — ISTQB QA Specialist & AI Product Builder" },
      { name: "twitter:description", content: "ISTQB certified QA Product Engineer and AI product builder based in Thessaloniki, Greece." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/623d0f94-4d37-40c9-bc9c-ca33c2063794/id-preview-91efc197--7b07a86f-6a5c-4be8-8cd6-b2b3157e6469.lovable.app-1785937822203.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/623d0f94-4d37-40c9-bc9c-ca33c2063794/id-preview-91efc197--7b07a86f-6a5c-4be8-8cd6-b2b3157e6469.lovable.app-1785937822203.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      {
        children:
          "(function(){var h='https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap';var l=document.createElement('link');l.rel='stylesheet';l.href=h;l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l)})()",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  const { queryClient } = Route.useRouteContext();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            {children}
            <FloatingCallButton />
            <CookieBanner />
            <Toaster position="top-center" />
          </LanguageProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </>
  );
}


