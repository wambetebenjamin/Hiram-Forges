"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";
import { site } from "../lib/site";

const tour = {
  en: "Welcome to Hiram Forges. Fire, skill, lasting tools. This is an independent directory of blacksmiths, welders and metal fabricators. Start with the artisans page, filter by country and by the work you need, then open a profile to read the common work, the working hours and what to prepare before you visit. To arrange a repair or a commission, message us on WhatsApp and we will pass your enquiry to the workshop. Hiram Forges does not perform metalwork, hold funds or guarantee work. All arrangements are made directly between you and the artisan.",
  sw: "Karibu Hiram Forges. Moto, ujuzi, zana zinazodumu. Hii ni orodha huru ya wahunzi, walehemu na watengenezaji chuma. Anza kwenye ukurasa wa mafundi, chuja kwa nchi na kazi unayohitaji, kisha fungua wasifu kusoma kazi za kawaida, saa za kazi na cha kujiandaa kabla ya kufika. Kupanga ukarabati au agizo, tutumie ujumbe kwa WhatsApp na tutalipeleka ombi lako kwa karakana. Hiram Forges haifanyi kazi ya chuma, haihifadhi fedha na haihakikishi kazi. Makubaliano yote hufanywa moja kwa moja kati yako na fundi.",
  fr: "Bienvenue sur Hiram Forges. Le feu, le metier, des outils durables. Ceci est un annuaire independant de forgerons, soudeurs et fabricants de metal. Commencez par la page des artisans, filtrez par pays et par travail, puis ouvrez une fiche pour lire les travaux courants, les horaires et ce qu il faut preparer avant la visite. Pour organiser une reparation ou une commande, ecrivez nous sur WhatsApp et nous transmettrons votre demande a l atelier. Hiram Forges n execute pas de travaux, ne detient pas de fonds et ne garantit pas les travaux. Tous les accords se font directement entre vous et l artisan.",
} as const;

export function FloatingActions() {
  const { t, locale } = useI18n();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const start = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = tour[locale] ?? tour.en;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === "sw" ? "sw-KE" : locale === "fr" ? "fr-FR" : "en-KE";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((voice) => voice.lang === utterance.lang) ??
      voices.find((voice) => voice.lang?.startsWith(locale === "sw" ? "sw" : locale)) ??
      voices.find((voice) => voice.lang === "en-KE") ??
      voices.find((voice) => voice.lang?.startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <>
      <a
        className="hf-wa"
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          "Hello Hiram Forges, I would like help finding an artisan.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("common.whatsapp")} ${site.whatsappDisplay}`}
        title={t("common.whatsapp")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.19-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.15 8.15 0 0 1-1.25-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.18-8.2 8.18z" />
        </svg>
      </a>

      <button
        type="button"
        className={`hf-voice${speaking ? " is-playing" : ""}`}
        onClick={start}
        aria-pressed={speaking}
        aria-label={speaking ? t("common.voiceStop") : t("common.voiceTour")}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
          {speaking ? (
            <>
              <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
              <path d="M19 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
            </>
          ) : (
            <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
          )}
        </svg>
        <span>{speaking ? t("common.voiceStop") : t("common.voiceTour")}</span>
      </button>
    </>
  );
}
