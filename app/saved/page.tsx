import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { SavedList } from "../components/SavedList";

export const metadata: Metadata = {
  title: "Saved artisans",
  description: "The workshops you have saved on this device, kept together as a shortlist.",
  alternates: { canonical: "/saved" },
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return (
    <>
      <PageHead
        title="Saved"
        highlight="artisans"
        intro="Workshops you have saved on this device. Clear the list at any time. No dashboard, no charts."
        image="/images/tools-detail.jpg"
        crumb="Saved artisans"
      />
      <section className="hf-section">
        <div className="container">
          <SavedList />
        </div>
      </section>
    </>
  );
}
