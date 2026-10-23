import { getVisitorId, hasConsent } from "@/lib/consent";

const SESSION_KEY = "greta-visit-logged";

/** Logs one visit per browser session — only after GDPR consent. */
export function trackVisit(language: string) {
  if (typeof window === "undefined") return;
  try {
    if (!hasConsent()) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    void fetch("/api/public/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        language,
        path: window.location.pathname,
        consent: true,
      }),
    }).catch(() => undefined);
  } catch {
    /* storage blocked — skip tracking */
  }
}
