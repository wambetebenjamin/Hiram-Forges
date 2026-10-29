export const site = {
  name: "Hiram Forges",
  tagline: "Fire, skill, lasting tools.",
  oneLiner:
    "Directory of blacksmiths, welders and metal fabricators so communities can repair, commission and keep metal tools in use.",
  whatsapp: "254112272061",
  whatsappDisplay: "+254 112 272 061",
  email: "hello@hiramforges.org",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hiram-forges.vercel.app",
  locales: ["en", "sw", "fr"] as const,
  cookieName: "hiram-forges-cookie-consent",
  localeCookie: "hiram-forges-locale",
  savedKey: "hiram-forges-saved-artisans",
  listingKey: "hiram-forges-my-listing",
} as const;

export type Locale = (typeof site.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  sw: "Kiswahili",
  fr: "Francais",
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
