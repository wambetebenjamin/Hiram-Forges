"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useI18n } from "./I18nProvider";

export function SignInForm() {
  const { t } = useI18n();
  const { data: session, status } = useSession();
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState("sending");
    setError("");
    const result = await signIn("credentials", {
      email: String(data.get("email") ?? ""),
      name: String(data.get("name") ?? ""),
      redirect: false,
    });
    setState("idle");
    if (result?.error) {
      setError("That email was not accepted. Check the address and try again.");
    }
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="hf-formbox">
        <h2 className="hf-card__title" style={{ marginBottom: 12 }}>
          {t("auth.title")}
        </h2>
        <p className="hf-help" style={{ marginBottom: 6 }}>
          {t("auth.signOutNote")}
        </p>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 20 }}>
          {session.user.name ?? session.user.email}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="hf-btn" href="/saved">
            {t("nav.saved")}
          </Link>
          <button type="button" className="hf-btn hf-btn--outline" onClick={() => signOut({ redirectTo: "/" })}>
            {t("nav.signOut")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="hf-formbox" onSubmit={submit} noValidate>
      <h2 className="hf-card__title" style={{ marginBottom: 8 }}>
        {t("auth.title")}
      </h2>
      <p className="hf-help" style={{ marginBottom: 20 }}>
        {t("auth.intro")}
      </p>
      {error ? <div className="hf-error">{error}</div> : null}
      <div className="hf-field">
        <label className="hf-label" htmlFor="signin-email">
          {t("auth.emailLabel")} <span className="hf-required">*</span>
        </label>
        <input
          className="hf-input"
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="hf-field">
        <label className="hf-label" htmlFor="signin-name">
          {t("auth.nameLabel")} <span className="hf-muted">({t("common.optional")})</span>
        </label>
        <input className="hf-input" id="signin-name" name="name" autoComplete="name" />
      </div>
      <button className="hf-btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t("auth.submitting") : t("auth.submit")}
      </button>
      <p className="hf-help" style={{ marginTop: 18 }}>
        {t("auth.note")}
      </p>
      <p className="hf-help">
        <Link href="/privacy" style={{ textDecoration: "underline" }}>
          {t("cookie.more")}
        </Link>
      </p>
    </form>
  );
}
