"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useI18n } from "./I18nProvider";
import { ArtisanCard } from "./ArtisanCard";
import { useSaved } from "../lib/saved";
import { getArtisan } from "../lib/artisans";

export function SavedList() {
  const { t } = useI18n();
  const { slugs, ready, clear } = useSaved();
  const { data: session, status } = useSession();

  const saved = slugs.map((slug) => getArtisan(slug)).filter((item) => Boolean(item));

  return (
    <>
      <div className="hf-resultbar">
        <p>
          {ready ? saved.length : 0} {t("nav.artisans").toLowerCase()}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {saved.length > 0 ? (
            <button type="button" className="hf-btn hf-btn--sm hf-btn--outline" onClick={clear}>
              {t("saved.clear")}
            </button>
          ) : null}
          <Link className="hf-btn hf-btn--sm" href="/artisans">
            {t("common.viewAll")}
          </Link>
        </div>
      </div>

      {!ready || saved.length === 0 ? (
        <div className="hf-empty">
          <h3>{t("saved.empty")}</h3>
          <p>{t("saved.emptyText")}</p>
        </div>
      ) : (
        <div className="row">
          {saved.map((artisan) =>
            artisan ? (
              <div className="col-md-6 col-xl-4 mar_bottom30" key={artisan.slug}>
                <ArtisanCard artisan={artisan} />
              </div>
            ) : null,
          )}
        </div>
      )}

      <div className="hf-note" style={{ marginTop: 30 }}>
        <p>
          {status === "authenticated" && session?.user
            ? `${t("auth.signOutNote")} ${session.user.name ?? session.user.email}. `
            : ""}
          {t("auth.note")}{" "}
          <Link href="/sign-in" style={{ textDecoration: "underline" }}>
            {t("nav.signIn")}
          </Link>
          .
        </p>
      </div>
    </>
  );
}
