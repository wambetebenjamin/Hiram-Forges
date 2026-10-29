import type { DictKey } from "./dictionaries";

export type NavItem = { href: string; key: DictKey };

export const primaryNav: NavItem[] = [
  { href: "/", key: "nav.home" },
  { href: "/artisans", key: "nav.artisans" },
  { href: "/specialties", key: "nav.specialties" },
  { href: "/regions", key: "nav.regions" },
  { href: "/safety", key: "nav.safety" },
  { href: "/join", key: "nav.join" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

export const footerExplore: NavItem[] = [
  { href: "/artisans", key: "nav.artisans" },
  { href: "/specialties", key: "nav.specialties" },
  { href: "/regions", key: "nav.regions" },
  { href: "/safety", key: "nav.safety" },
];

export const footerDirectory: NavItem[] = [
  { href: "/join", key: "nav.join" },
  { href: "/saved", key: "nav.saved" },
  { href: "/my-listing", key: "nav.myListing" },
  { href: "/sign-in", key: "nav.signIn" },
];

export const footerMore: NavItem[] = [
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
  { href: "/privacy", key: "nav.privacy" },
  { href: "/terms", key: "nav.terms" },
];
