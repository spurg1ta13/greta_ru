const VISITOR_KEY = "greta-visitor-id";
const SESSION_KEY = "greta-visit-logged";

function visitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

/** Logs one visit per browser session. Safe to call on every mount. */
export function trackVisit(language: string) {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    void fetch("/api/public/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        visitorId: visitorId(),
        language,
        path: window.location.pathname,
      }),
    }).catch(() => undefined);
  } catch {
    /* storage blocked — skip tracking */
  }
}
