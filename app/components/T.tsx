"use client";

import { useI18n } from "./I18nProvider";
import type { DictKey } from "../lib/dictionaries";

export function T({ k }: { k: DictKey }) {
  const { t } = useI18n();
  return <>{t(k)}</>;
}
