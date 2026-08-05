import { Languages } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "en" ? "el" : "en")}
      aria-label={t.langSwitchTo}
      title={t.langSwitchTo}
      className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Languages className="size-4" />
      {t.langLabel}
    </button>
  );
}
