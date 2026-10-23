import { useState } from "react";
import { toast } from "sonner";

import { useLanguage } from "@/lib/i18n";
import { CONSENT_KEY } from "@/lib/consent";

const COPY = {
  en: {
    label: "Delete my data",
    confirm:
      "Permanently delete all data linked to this browser (chats, contact messages, visit statistics, consent records)? This cannot be undone.",
    done: "Your data has been deleted.",
    fail: "Deletion failed. Please email greta@gretagreta.eu.",
  },
  el: {
    label: "Διαγραφή των δεδομένων μου",
    confirm:
      "Οριστική διαγραφή όλων των δεδομένων που συνδέονται με αυτόν τον browser (συνομιλίες, μηνύματα, στατιστικά, συγκαταθέσεις); Η ενέργεια δεν αναιρείται.",
    done: "Τα δεδομένα σου διαγράφηκαν.",
    fail: "Η διαγραφή απέτυχε. Στείλε email στο greta@gretagreta.eu.",
  },
};

/** Self-service GDPR erasure (right to be forgotten). */
export function ForgetMeButton() {
  const { lang } = useLanguage();
  const c = COPY[lang === "el" ? "el" : "en"];
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (!window.confirm(c.confirm)) return;
    setBusy(true);
    try {
      const visitorId = localStorage.getItem("greta-visitor-id");
      if (visitorId) {
        const res = await fetch("/api/public/forget", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        if (!res.ok) throw new Error("failed");
      }
      for (const k of ["greta-visitor-id", CONSENT_KEY]) localStorage.removeItem(k);
      for (const k of ["greta-visit-logged", "greta-cookie-choice"]) sessionStorage.removeItem(k);
      window.dispatchEvent(new Event("gdpr-consent-change"));
      toast.success(c.done);
    } catch {
      toast.error(c.fail);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={run} disabled={busy} className="hover:text-primary disabled:opacity-50">
      {c.label}
    </button>
  );
}
