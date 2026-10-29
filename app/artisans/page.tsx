import type { Metadata } from "next";
import { ArtisanDirectory } from "../components/ArtisanDirectory";
import { PageHead } from "../components/PageHead";
import { artisans } from "../lib/artisans";

export const metadata: Metadata = {
  title: "Artisan directory",
  description:
    "Filter blacksmiths, welders and metal fabricators by country and specialty. Independent listings with hours, common work and preparation notes.",
  alternates: { canonical: "/artisans" },
};

export default function ArtisansPage() {
  return (
    <>
      <PageHead
        title="Artisan"
        highlight="directory"
        intro="Filter by country and by the work you need. Listings are free and independent. Prices, hours and availability are set by each workshop."
        image="/images/workshop-03.jpg"
        crumb="Artisans"
      />
      <section className="hf-section">
        <div className="container">
          <ArtisanDirectory artisans={artisans} />
          <div className="row" style={{ marginTop: 44 }}>
            <div className="col-md-10">
              <div className="hf-note">
                <p>
                  <strong>How listings work.</strong> Each workshop sets its own prices, hours
                  and lead times. Hiram Forges does not perform metalwork, hold funds or
                  guarantee work. Confirm the scope in writing, then agree payment directly with
                  the artisan. Where a listing shows verification pending, the details are still
                  being confirmed with the workshop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
