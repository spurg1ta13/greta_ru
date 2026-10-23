export const CONSENT_KEY = "gdpr_consent_accepted";
export const POLICY_VERSION = "2026-10";
const VISITOR_KEY = "greta-visitor-id";

export function getVisitorId(): string {
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

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

/** Saves the choice locally, notifies listeners, and logs a proof-of-consent record. */
export function setConsent(accepted: boolean, source: "banner" | "chat" | "contact_form") {
  try {
    if (accepted) localStorage.setItem(CONSENT_KEY, "true");
    else localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event("gdpr-consent-change"));
    void fetch("/api/public/consent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        decision: accepted ? "accepted" : "declined",
        source,
        policyVersion: POLICY_VERSION,
        language: document.documentElement.lang || "en",
      }),
    }).catch(() => undefined);
  } catch {
    /* storage blocked */
  }
}
