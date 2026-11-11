import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n";
import { CONSENT_KEY } from "@/lib/consent";

const COPY = {
  en: {
    label: "Delete my data",
    title: "Right to be forgotten",
    desc: "Enter the email you used on this site. All data linked to it and to this browser — contact messages, phone numbers and other details in them, AI chats, visit statistics and consent records — is permanently erased. Your email is used only for the search and is not stored anywhere.",
    email: "Email",
    phone: "Phone (optional)",
    submit: "Erase my data",
    invalid: "Please enter a valid email.",
    done: "Your data has been erased.",
    fail: "Deletion failed. Please email greta@gretagreta.eu.",
  },
  el: {
    label: "Διαγραφή των δεδομένων μου",
    title: "Δικαίωμα στη λήθη",
    desc: "Γράψε το email που χρησιμοποίησες σε αυτόν τον ιστότοπο. Όλα τα δεδομένα που συνδέονται με αυτό και με αυτόν τον browser — μηνύματα επικοινωνίας, τηλέφωνα και άλλα στοιχεία, συνομιλίες AI, στατιστικά επισκέψεων και συγκαταθέσεις — διαγράφονται οριστικά. Το email χρησιμοποιείται μόνο για την αναζήτηση και δεν αποθηκεύεται πουθενά.",
    email: "Email",
    phone: "Τηλέφωνο (προαιρετικό)",
    submit: "Διαγραφή δεδομένων",
    invalid: "Γράψε ένα έγκυρο email.",
    done: "Τα δεδομένα σου διαγράφηκαν.",
    fail: "Η διαγραφή απέτυχε. Στείλε email στο greta@gretagreta.eu.",
  },
};

/** Self-service GDPR erasure (right to be forgotten). */
export function ForgetMeButton() {
  const { language: lang } = useLanguage();
  const c = COPY[lang === "el" ? "el" : "en"];
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { toast.error(c.invalid); return; }
    setBusy(true);
    try {
      const visitorId = localStorage.getItem("greta-visitor-id") || undefined;
      const res = await fetch("/api/public/forget", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ visitorId, email: email.trim(), phone: phone.trim() || undefined }),
      });
      if (!res.ok) throw new Error("failed");
      for (const k of ["greta-visitor-id", CONSENT_KEY]) localStorage.removeItem(k);
      for (const k of ["greta-visit-logged", "greta-cookie-choice"]) sessionStorage.removeItem(k);
      window.dispatchEvent(new Event("gdpr-consent-change"));
      setEmail("");
      setPhone("");
      setOpen(false);
      toast.success(c.done);
    } catch {
      toast.error(c.fail);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="hover:text-primary">
        {c.label}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{c.title}</DialogTitle>
            <DialogDescription>{c.desc}</DialogDescription>
          </DialogHeader>
          <form onSubmit={run} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forget-email">{c.email}</Label>
              <Input id="forget-email" type="email" required maxLength={255} autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="forget-phone">{c.phone}</Label>
              <Input id="forget-phone" type="tel" maxLength={32} autoComplete="off" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={busy}>
              {c.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
