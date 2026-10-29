"use client";

import { useCallback, useState } from "react";
import { Captcha } from "./Captcha";
import { useI18n } from "./I18nProvider";
import type { CaptchaProvider } from "../lib/captcha";

export function ContactForm({ artisan }: { artisan?: string }) {
  const { t } = useI18n();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waLink, setWaLink] = useState<string>("");
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
    setState("sending");
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          topic: data.get("topic"),
          message: data.get("message"),
          website: data.get("website"),
          artisan,
          captchaToken: token,
          captchaProvider: provider,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        error?: string;
        waLink?: string;
      };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: result.error ?? "Could not send the message." });
        setState("idle");
        return;
      }
      setWaLink(result.waLink ?? "");
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
        <h3>{t("contact.success")}</h3>
        <p>{t("contact.successText")}</p>
        {waLink ? (
          <a
            className="hf-btn hf-btn--yellow"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 16 }}
          >
            {t("common.whatsapp")}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form className="hf-formbox" onSubmit={submit} noValidate>
      <h2 className="hf-card__title" style={{ marginBottom: 18 }}>
        {t("contact.formTitle")}
      </h2>
      {errors.form ? <div className="hf-error">{errors.form}</div> : null}
      <div className="hf-formgrid">
        <div className="hf-field">
          <label className="hf-label" htmlFor="contact-name">
            {t("common.name")} <span className="hf-required">*</span>
          </label>
          <input className="hf-input" id="contact-name" name="name" autoComplete="name" required />
          {errors.name ? <p className="hf-help">{errors.name}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="contact-email">
            {t("common.email")} <span className="hf-required">*</span>
          </label>
          <input
            className="hf-input"
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          {errors.email ? <p className="hf-help">{errors.email}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="contact-phone">
            {t("common.phone")} <span className="hf-muted">({t("common.optional")})</span>
          </label>
          <input className="hf-input" id="contact-phone" name="phone" type="tel" autoComplete="tel" />
          {errors.phone ? <p className="hf-help">{errors.phone}</p> : null}
        </div>
        <div className="hf-field">
          <label className="hf-label" htmlFor="contact-topic">
            Topic
          </label>
          <select className="hf-select" id="contact-topic" name="topic" defaultValue="General question">
            <option>General question</option>
            <option>Correction to a listing</option>
            <option>Enquiry about an artisan</option>
            <option>Remove my listing</option>
            <option>Report a problem</option>
          </select>
        </div>
        <div className="hf-field hf-field--full">
          <label className="hf-label" htmlFor="contact-message">
            {t("common.message")} <span className="hf-required">*</span>
          </label>
          <textarea
            className="hf-textarea"
            id="contact-message"
            name="message"
            required
            placeholder="Tell us what you need and where you are."
          />
          {errors.message ? <p className="hf-help">{errors.message}</p> : null}
        </div>
        <div className="hf-field hf-field--full" style={{ display: "none" }} aria-hidden="true">
          <label className="hf-label" htmlFor="contact-website">
            Website
          </label>
          <input className="hf-input" id="contact-website" name="website" tabIndex={-1} />
        </div>
      </div>
      <Captcha onToken={onToken} />
      {errors.captcha ? <p className="hf-help">{errors.captcha}</p> : null}
      <p className="hf-help" style={{ marginBottom: 16 }}>
        {t("disclaimer.short")}
      </p>
      <button className="hf-btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t("common.sending") : t("common.send")}
      </button>
    </form>
  );
}
