import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { setConsent } from "@/lib/consent";

const SESSION_KEY = "greta-cookie-choice";

/** Cookie notice shown once per browser session. */
export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) setVisible(true);
    } catch {
      /* storage blocked — skip banner */
    }
  }, []);

  // Hide the banner as soon as the visitor accepts the Privacy Policy
  // (chat consent gate or contact-form checkbox) in the same session.
  useEffect(() => {
    const sync = () => {
      try {
        if (localStorage.getItem("gdpr_consent_accepted") === "true") {
          sessionStorage.setItem(SESSION_KEY, "accepted");
          setVisible(false);
        }
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("gdpr-consent-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gdpr-consent-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const close = (choice: "accepted" | "declined") => {
    try {
      sessionStorage.setItem(SESSION_KEY, choice);
    } catch {
      /* ignore */
    }
    setConsent(choice === "accepted", "banner");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl"
    >
      <div className="panel flex flex-col gap-4 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{t.contact.cookieText}</p>
          <label className="flex items-start gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
            />
            <span>
              {t.contact.cookieCheckbox}{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2">
                {t.contact.privacy}
              </Link>
              .
            </span>
          </label>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outlineSignal" size="sm" onClick={() => close("declined")}>
            {t.contact.cookieDecline}
          </Button>
          <Button variant="hero" size="sm" disabled={!checked} onClick={() => close("accepted")}>
            {t.contact.cookieSave}
          </Button>
        </div>
      </div>
    </div>
  );
}
