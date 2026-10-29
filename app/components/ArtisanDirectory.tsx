"use client";

import { useEffect, useMemo, useState } from "react";
import type { Artisan } from "../lib/artisans";
import { regions } from "../lib/regions";
import { specialties } from "../lib/specialties";
import { useI18n } from "./I18nProvider";
import { ArtisanCard } from "./ArtisanCard";

type Props = { artisans: Artisan[] };

export function ArtisanDirectory({ artisans }: Props) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get("region");
    const specialtyParam = params.get("specialty");
    const queryParam = params.get("q");
    if (regionParam && regions.some((item) => item.slug === regionParam)) setRegion(regionParam);
    if (specialtyParam && specialties.some((item) => item.key === specialtyParam)) {
      setSpecialty(specialtyParam);
    }
    if (queryParam) setQuery(queryParam);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("hf-sheet-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("hf-sheet-open");
    };
  }, [sheetOpen]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return artisans.filter((artisan) => {
      if (region !== "all" && artisan.region !== region) return false;
      if (specialty !== "all" && !artisan.specialties.includes(specialty as never)) return false;
      if (!needle) return true;
      const haystack = [
        artisan.name,
        artisan.workshop,
        artisan.city,
        artisan.country,
        artisan.summary,
        artisan.services.join(" "),
        artisan.specialties.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [artisans, query, region, specialty]);

  const reset = () => {
    setQuery("");
    setRegion("all");
    setSpecialty("all");
  };

  const renderControls = (prefix: string) => (
    <>
      <div className="hf-field">
        <label className="hf-label" htmlFor={`${prefix}-query`}>
          {t("artisans.searchLabel")}
        </label>
        <input
          className="hf-input"
          id={`${prefix}-query`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("artisans.searchPlaceholder")}
        />
      </div>
      <div className="hf-field">
        <label className="hf-label" htmlFor={`${prefix}-region`}>
          {t("common.region")}
        </label>
        <select
          className="hf-select"
          id={`${prefix}-region`}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option value="all">{t("common.allRegions")}</option>
          {regions.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.country}
            </option>
          ))}
        </select>
      </div>
      <div className="hf-field">
        <label className="hf-label" htmlFor={`${prefix}-specialty`}>
          {t("common.specialty")}
        </label>
        <select
          className="hf-select"
          id={`${prefix}-specialty`}
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        >
          <option value="all">{t("common.allSpecialties")}</option>
          {specialties.map((item) => (
            <option key={item.key} value={item.key}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <button type="button" className="hf-btn hf-btn--sm hf-btn--outline" onClick={reset}>
          {t("common.reset")}
        </button>
      </div>
    </>
  );

  return (
    <div className="row">
      <div className="col-lg-3 d-none d-lg-block">
        <div className="hf-filters" style={{ position: "sticky", top: 120 }}>
          <h2 className="hf-card__title" style={{ fontSize: 18, marginBottom: 16 }}>
            {t("artisans.filtersTitle")}
          </h2>
          {renderControls("desk")}
        </div>
      </div>

      <div className="col-lg-9">
        <div className="hf-resultbar">
          <p>
            {results.length} {t("common.results")}
          </p>
          <button
            type="button"
            className="hf-btn hf-btn--sm d-lg-none"
            aria-expanded={sheetOpen}
            aria-controls="hf-filter-sheet"
            onClick={() => setSheetOpen(true)}
          >
            {t("artisans.open")}
          </button>
        </div>

        {results.length === 0 ? (
          <div className="hf-empty" role="status">
            <h3>{t("common.noResults")}</h3>
            <p>{t("common.noResultsHelp")}</p>
            <button type="button" className="hf-btn hf-btn--sm" onClick={reset} style={{ marginTop: 16 }}>
              {t("common.reset")}
            </button>
          </div>
        ) : (
          <div className="row">
            {results.map((artisan, index) => (
              <div className="col-md-6 col-xl-4 mar_bottom30" key={artisan.slug}>
                <ArtisanCard artisan={artisan} priority={index < 3} />
              </div>
            ))}
          </div>
        )}
      </div>

      {sheetOpen ? (
        <>
          <button
            type="button"
            className="hf-scrim d-lg-none"
            aria-label={t("artisans.close")}
            onClick={() => setSheetOpen(false)}
          />
          <div
            id="hf-filter-sheet"
            className="hf-sheet d-lg-none"
            role="dialog"
            aria-modal="true"
            aria-label={t("artisans.filtersTitle")}
          >
            <div className="hf-sheet__head">
              <h2>{t("artisans.filtersTitle")}</h2>
              <button
                type="button"
                className="hf-sheet__close"
                aria-label={t("artisans.close")}
                onClick={() => setSheetOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="hf-sheet__body">{renderControls("sheet")}</div>
            <div className="hf-sheet__foot">
              <button type="button" className="hf-btn" onClick={() => setSheetOpen(false)}>
                {t("artisans.apply")}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
