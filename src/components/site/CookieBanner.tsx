import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const SESSION_KEY = "greta-cookie-choice";

/** Cookie notice shown once per browser session. */
export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) setVisible(true);
    } catch {
      /* storage blocked — skip banner */
    }
  }, []);

  const close = (choice: "accepted" | "declined") => {
    try {
      sessionStorage.setItem(SESSION_KEY, choice);
    } catch {
      /* ignore */
    }
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
        <p className="text-sm text-muted-foreground">{t.contact.cookieText}</p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outlineSignal" size="sm" onClick={() => close("declined")}>
            {t.contact.cookieDecline}
          </Button>
          <Button variant="hero" size="sm" onClick={() => close("accepted")}>
            {t.contact.cookieAccept}
          </Button>
        </div>
      </div>
    </div>
  );
}
