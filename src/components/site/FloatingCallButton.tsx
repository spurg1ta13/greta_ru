import { Phone } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export function FloatingCallButton() {
  const { t } = useLanguage();
  return (
    <a
      href="tel:+306975835277"
      aria-label={t.contact.phone}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-signal text-signal-foreground shadow-[0_12px_40px_-12px_var(--color-signal)] ring-2 ring-background transition-transform hover:scale-105 active:scale-95 lg:hidden"
      style={{ boxShadow: "0 12px 40px -12px color-mix(in oklab, var(--signal) 60%, transparent)" }}
    >
      <Phone className="size-6" />
    </a>
  );
}
