import type { Metadata } from "next";
import { HomeContent } from "./components/HomeContent";
import { site } from "./lib/site";

export const metadata: Metadata = {
  title: "Hiram Forges | Fire, skill, lasting tools.",
  description: site.oneLiner,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}
