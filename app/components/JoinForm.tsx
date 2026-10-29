"use client";

import { useCallback, useState } from "react";
import { Captcha } from "./Captcha";
import { useI18n } from "./I18nProvider";
import type { CaptchaProvider } from "../lib/captcha";
import { regions } from "../lib/regions";
import { site } from "../lib/site";
import { specialties } from "../lib/specialties";

export function JoinForm() {
  const { t } = useI18n();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waLink, setWaLink] = useState("");
  const [reference, setReference] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [provider, setProvider] = useState<CaptchaProvider>("local");

  const onToken = useCallback((next: string | null, kind: CaptchaProvider) => {
    setToken(next);
    setProvider(kind);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const chosen = data.getAll("specialties").map(String);
    setState("sending");
    setErrors({});
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          workshop: data.get("workshop"),
          name: data.get("name"),
          city: data.get("city"),
          country: data.get("country"),
          phone: data.get("phone"),
          email: data.get("email"),
          about: data.get("about"),
          languages: data.get("languages"),
          since: data.get("since"),
          specialties: chosen,
          consent: data.get("consent") === "on",
          website: data.get("website"),
          captchaToken: token,
          captchaProvider: provider,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        id?: string;
        errors?: Record<string, string>;
        error?: string;
        waLink?: string;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: result.error ?? "Could not submit the listing." });
        setState("idle");
        return;
      }
      setReference(result.id ?? "");
      setWaLink(result.waLink ?? "");
      try {
        window.localStorage.setItem(
          site.listingKey,
          JSON.stringify({
            id: result.id,
            workshop: String(data.get("workshop") ?? ""),
            city: String(data.get("city") ?? ""),
            country: String(data.get("country") ?? ""),
            submittedAt: new Date().toISOString(),
            status: "received",
          }),
        );
      } catch {
        /* the confirmation still works without local storage */
      }
      setState("done");
      form.reset();
    } catch {
      setErrors({ form: "Network problem. Please try again." });
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="hf-success" role="status">
        <h3>{t("join.success")}</h3>
        <p>{t("join.successText")}</p>
        {reference ? (
          <p style={{ marginTop: 10 }}>
            <strong>Reference:</strong> {reference}
          </p>
        ) : null}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
          {waLink ? (
            <a className="hf-btn hf-btn--yellow" href={waLink} target="_blank" rel="noopener noreferrer">
              {t("common.whatsapp")}
            </a>
          ) : null}
          <button type="button" className="hf-btn hf-btn--outline" onClick={() => setState("idle")}>
            {t("join.another")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="hf-formbox" onSubmit={submit} noValidate>
      <h2 className="hf-card__title" style={{ marginBottom: 6 }}>
        {t("join.formTitle")}
      </h2>
      <p className="hf-help" style={{ marginBottom: 22 }}>
        {t("join.intro")}
      </p>
      {errors.form ? <div className="hf-error">{errors.form}</div> : null}
      <div className="hf-formgrid">
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-workshop">
            {t("join.workshop")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="join-workshop" name="workshop" required />
          {errors.workshop ? <p className="hf-help">{errors.workshop}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-name">
            {t("join.yourName")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="join-name" name="name" autoComplete="name" required />
          {errors.name ? <p className="hf-help">{errors.name}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-city">
            {t("join.town")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="join-city" name="city" required />
          {errors.city ? <p className="hf-help">{errors.city}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-country">
            {t("join.countryLabel")} <span className="hf-required">*</span>
          </label>
          <select className="hf-select" id="join-country" name="country" required defaultValue="">
            <option value="" disabled>
              Choose a country
            </option>
            {regions.map((region) => (
              <option key={region.slug} value={region.country}>
                {region.country}
              </option>
            ))}
            <option value="Other">Other country</option>
          </select>
          {errors.country ? <p className="hf-help">{errors.country}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-phone">
            {t("join.contactLabel")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="join-phone" name="phone" type="tel" required />
          {errors.phone ? <p className="hf-help">{errors.phone}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-email">
            {t("join.emailLabel")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="join-email" name="email" type="email" required />
          {errors.email ? <p className="hf-help">{errors.email}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-since">
            {t("join.experience")} <span className="hf-muted">({t("common.optional")})</span>
          </label>
          <input
            className="hf-input"
            id="join-since"
            name="since"
            inputMode="numeric"
            placeholder="2012"
          />
          {errors.since ? <p className="hf-help">{errors.since}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="join-languages">
            {t("join.languagesLabel")} <span className="hf-muted">({t("common.optional")})</span>
          </label>
          <input className="hf-input" id="join-languages" name="languages" placeholder="English, Kiswahili" />
        </div>
        <fieldset className="hf-field hf-field--full" style={{ border: 0, padding: 0 }}>
          <legend className="hf-label">
            {t("join.specialtiesLabel")} <span className="hf-required">*</span>
          </legend>
          <div className="hf-chips" style={{ marginBottom: 8 }}>
            {specialties.map((specialty) => (
              <label className="hf-check" key={specialty.key} htmlFor={`spec-${specialty.key}`}>
                <input
                  id={`spec-${specialty.key}`}
                  type="checkbox"
                  name="specialties"
                  value={specialty.name}
                />
                <span>{specialty.name}</span>
              </label>
            ))}
          </div>
          {errors.specialties ? <p className="hf-help">{errors.specialties}</p> : null}
        </fieldset>
        <div className="hf-field hf-field--full">
          <label className="hf-label" htmlFor="join-about">
            {t("join.aboutLabel")} <span className="hf-required">*</span>
          </label>
          <textarea className="hf-textarea" id="join-about" name="about" maxLength={500} required />
          <p className="hf-help">{t("join.aboutHelp")}</p>
          {errors.about ? <p className="hf-help">{errors.about}</p> : null}
        </div>
        <div className="hf-field hf-field--full" style={{ display: "none" }} aria-hidden="true">
          <label className="hf-label" htmlFor="join-website">
            Website
          </label>
          <input className="hf-input" id="join-website" name="website" tabIndex={-1} />
        </div>
      </div>
      <label className="hf-check" htmlFor="join-consent">
        <input id="join-consent" type="checkbox" name="consent" required />
        <span>{t("join.consent")}</span>
      </label>
      {errors.consent ? <p className="hf-help">{errors.consent}</p> : null}
      <div style={{ height: 16 }} />
      <Captcha onToken={onToken} />
      {errors.captcha ? <p className="hf-help">{errors.captcha}</p> : null}
      <button className="hf-btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t("join.submitting") : t("join.submit")}
      </button>
    </form>
  );
}
