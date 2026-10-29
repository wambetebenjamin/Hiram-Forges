"use client";

import { useI18n } from "./I18nProvider";

export function Disclaimer({ full = false }: { full?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="hf-disclaimer">
      <h2>{t("common.disclaimerTitle")}</h2>
      <p>{full ? t("disclaimer.full") : t("disclaimer.short")}</p>
    </div>
  );
}
