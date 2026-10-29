"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { useSaved } from "../lib/saved";

export function SaveButton({ slug }: { slug: string }) {
  const { t } = useI18n();
  const { slugs, ready, toggle } = useSaved();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const saved = ready && slugs.includes(slug);

  return (
    <button
      type="button"
      className="hf-save"
      aria-pressed={saved}
      onClick={() => toggle(slug)}
      disabled={!mounted}
      data-slug={slug}
    >
      <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      </svg>
      {saved ? t("common.saved") : t("common.save")}
    </button>
  );
}
