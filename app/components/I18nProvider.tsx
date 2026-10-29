"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, en, translate, type DictKey } from "../lib/dictionaries";
import { site, type Locale } from "../lib/site";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored =
      window.localStorage.getItem(site.localeCookie) ??
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${site.localeCookie}=`))
        ?.split("=")[1];
    if (stored && site.locales.includes(stored as Locale) && stored !== locale) {
      setLocaleState(stored as Locale);
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (!dictionaries[next]) return;
    setLocaleState(next);
    document.cookie = `${site.localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      window.localStorage.setItem(site.localeCookie, next);
    } catch {
      /* storage can be blocked, the cookie still carries the choice */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (key: DictKey) => translate(locale, key) || en[key],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en",
      setLocale: () => undefined,
      t: (key: DictKey) => en[key],
    };
  }
  return context;
}
