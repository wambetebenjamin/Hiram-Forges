"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";
import { site } from "../lib/site";

type StoredListing = {
  id?: string;
  workshop?: string;
  city?: string;
  country?: string;
  submittedAt?: string;
  status?: string;
};

export function MyListing() {
  const { t } = useI18n();
  const [listing, setListing] = useState<StoredListing | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(site.listingKey);
      setListing(raw ? (JSON.parse(raw) as StoredListing) : null);
    } catch {
      setListing(null);
    }
    setReady(true);
  }, []);

  const remove = () => {
    window.localStorage.removeItem(site.listingKey);
    setListing(null);
  };

  if (!ready) {
    return (
      <div className="hf-empty" role="status">
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="hf-empty">
        <h3>{t("listing.empty")}</h3>
        <p>{t("listing.emptyText")}</p>
        <Link className="hf-btn hf-btn--sm" href="/join" style={{ marginTop: 16 }}>
          {t("join.submit")}
        </Link>
      </div>
    );
  }

  const steps = [
    { key: "received", label: t("listing.received"), done: true },
    { key: "review", label: t("listing.review"), done: true },
    { key: "published", label: t("listing.published"), done: false },
  ];

  return (
    <>
      <div className="hf-factbox" style={{ marginBottom: 26 }}>
        <dl>
          <dt>Workshop</dt>
          <dd>{listing.workshop || "Not recorded"}</dd>
          <dt>Location</dt>
          <dd>
            {[listing.city, listing.country].filter(Boolean).join(", ") || "Not recorded"}
          </dd>
          <dt>Reference</dt>
          <dd>{listing.id || "Not recorded"}</dd>
          <dt>Submitted</dt>
          <dd>
            {listing.submittedAt
              ? new Date(listing.submittedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not recorded"}
          </dd>
        </dl>
      </div>

      <ol className="hf-detail-list" style={{ listStyle: "none", padding: 0, marginBottom: 26 }}>
        {steps.map((step) => (
          <li key={step.key}>
            <span
              className={`hf-status ${step.done ? "hf-status--live" : "hf-status--pending"}`}
              style={{ marginRight: 10 }}
            >
              {step.label}
            </span>
            {step.key === "received"
              ? "We have your details and a reference number."
              : step.key === "review"
                ? "A person checks the workshop details by phone or WhatsApp."
                : "Published listings appear in the directory with working hours."}
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="hf-btn hf-btn--sm" href="/join">
          {t("join.another")}
        </Link>
        <button type="button" className="hf-btn hf-btn--sm hf-btn--outline" onClick={remove}>
          {t("listing.remove")}
        </button>
      </div>
    </>
  );
}
