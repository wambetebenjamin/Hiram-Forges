"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import { Logo } from "./Logo";
import { primaryNav } from "../lib/nav";
import { site, type Locale } from "../lib/site";

const locales: { code: Locale; label: string; full: string }[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "sw", label: "SW", full: "Kiswahili" },
  { code: "fr", label: "FR", full: "Francais" },
];

function LanguageSwitcher({ variant }: { variant?: "panel" }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="hf-lang" role="group" aria-label={t("nav.language")} data-variant={variant}>
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          className="hf-lang__btn"
          aria-pressed={locale === item.code}
          aria-label={item.full}
          lang={item.code}
          onClick={() => setLocale(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("hf-sheet-open");
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("hf-sheet-open");
    };
  }, [open, close]);

  return (
    <>
      <header className="hf-siteheader">
        <div className="header">
          <div className="container-fluid">
            <div className="hf-header-row">
              <Logo />
              <div className="hf-header-actions">
                <div className="hf-lang-desktop">
                  <LanguageSwitcher />
                </div>
                <button
                  ref={triggerRef}
                  type="button"
                  className="openbtn"
                  aria-label={t("nav.menu")}
                  aria-expanded={open}
                  aria-controls="hf-sidepanel"
                  onClick={() => setOpen(true)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/menu_icon.png" alt="" width={28} height={21} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <button
          type="button"
          className="hf-scrim"
          aria-label={t("nav.close")}
          tabIndex={-1}
          onClick={close}
        />
      ) : null}

      <div
        id="hf-sidepanel"
        ref={panelRef}
        className={`sidepanel${open ? " is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal={open || undefined}
        aria-label={t("nav.menu")}
      >
        <button type="button" className="closebtn" aria-label={t("nav.close")} onClick={close}>
          &times;
        </button>
        <nav aria-label={t("nav.menu")}>
          {primaryNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className="hf-panel-meta">
          <p>{t("common.disclaimerTitle")}</p>
          <p style={{ color: "#8f8f8f", fontSize: 12, lineHeight: "19px" }}>
            {t("disclaimer.short")}
          </p>
          <LanguageSwitcher variant="panel" />
          <a
            className="hf-btn hf-btn--yellow"
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 18, width: "100%" }}
            tabIndex={open ? 0 : -1}
          >
            {t("common.whatsapp")}
          </a>
        </div>
      </div>
    </>
  );
}
