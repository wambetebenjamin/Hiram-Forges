"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaptchaProvider } from "../lib/captcha";

type Props = {
  onToken: (token: string | null, provider: CaptchaProvider) => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      render: (
        element: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          theme?: "light" | "dark";
        },
      ) => number;
    };
  }
}

export function Captcha({ onToken }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  const version = process.env.NEXT_PUBLIC_RECAPTCHA_VERSION === "v2" ? "v2" : "v3";
  const [mode, setMode] = useState<CaptchaProvider>(siteKey ? version : "local");
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const v2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onToken(null, mode);
  }, [mode, onToken]);

  const handleV3 = useCallback(async () => {
    if (!siteKey || !window.grecaptcha) return;
    try {
      const token = await window.grecaptcha.execute(siteKey, { action: "submit" });
      onToken(token, "v3");
    } catch {
      setMode("local");
      onToken(null, "local");
    }
  }, [onToken, siteKey]);

  useEffect(() => {
    if (mode !== "v3" || !ready) return;
    void handleV3();
    const interval = window.setInterval(() => void handleV3(), 100000);
    return () => window.clearInterval(interval);
  }, [mode, ready, handleV3]);

  useEffect(() => {
    if (mode !== "v2" || !ready || !window.grecaptcha || !v2Ref.current) return;
    const container = v2Ref.current;
    container.innerHTML = "";
    window.grecaptcha.ready(() => {
      if (!window.grecaptcha) return;
      window.grecaptcha.render(container, {
        sitekey: siteKey,
        theme: "light",
        callback: (token: string) => onToken(token, "v2"),
        "expired-callback": () => onToken(null, "v2"),
      });
    });
  }, [mode, ready, onToken, siteKey]);

  if (!siteKey) {
    return (
      <div className="hf-captcha">
        <label className="hf-check" htmlFor="hf-human">
          <input
            id="hf-human"
            type="checkbox"
            checked={confirmed}
            onChange={(event) => {
              const next = event.target.checked;
              setConfirmed(next);
              onToken(next ? `local:${Date.now()}` : null, "local");
            }}
          />
          <span>
            I am a person, and I understand that Hiram Forges passes this message to the
            workshop but does not arrange the work.
          </span>
        </label>
        <p>
          Spam protection: a short confirmation is used when no reCAPTCHA key is
          configured for this deployment.
        </p>
      </div>
    );
  }

  return (
    <div className="hf-captcha">
      {mode === "v3" ? (
        <p style={{ marginTop: 0 }}>
          This form is protected by reCAPTCHA v3. No checkbox needed. If the check does not
          load, you can still send your message on WhatsApp.
        </p>
      ) : (
        <div ref={v2Ref} />
      )}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
        onError={() => {
          setMode("local");
          onToken(null, "local");
        }}
      />
      {!ready ? <p>Loading the spam check.</p> : null}
      {mode === "v3" ? (
        <button
          type="button"
          onClick={() => {
            setMode("v2");
            onToken(null, "v2");
          }}
          style={{
            background: "none",
            border: 0,
            padding: 0,
            color: "#061553",
            textDecoration: "underline",
            fontSize: 13,
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          Use the checkbox version instead
        </button>
      ) : null}
    </div>
  );
}
