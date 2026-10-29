"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { site } from "../lib/site";

type Consent = { analytics: boolean; at: string };

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${site.cookieName}=`))
    ?.split("=")[1];
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    return typeof parsed?.analytics === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      const timer = window.setTimeout(() => setVisible(true), 1400);
      return () => window.clearTimeout(timer);
    }
    setVisible(false);
    return undefined;
  }, []);

  const choose = (analytics: boolean) => {
    const value: Consent = { analytics, at: new Date().toISOString() };
    document.cookie = `${site.cookieName}=${encodeURIComponent(
      JSON.stringify(value),
    )}; path=/; max-age=15552000; samesite=lax`;
    setVisible(false);
    window.dispatchEvent(new CustomEvent("hiram-consent", { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      className="hf-cookie"
      role="dialog"
      aria-modal="false"
      aria-labelledby="hf-cookie-title"
      aria-describedby="hf-cookie-text"
    >
      <h2 id="hf-cookie-title">{t("cookie.title")}</h2>
      <p id="hf-cookie-text">
        {t("cookie.text")}{" "}
        <Link href="/privacy">{t("cookie.more")}</Link>.
      </p>
      <div className="hf-cookie__actions">
        <button type="button" className="hf-btn" onClick={() => choose(false)}>
          {t("cookie.essential")}
        </button>
        <button
          type="button"
          className="hf-btn hf-btn--yellow"
          onClick={() => choose(true)}
        >
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
