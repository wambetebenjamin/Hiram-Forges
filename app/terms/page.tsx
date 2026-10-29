import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms for using the Hiram Forges directory: independent listings, direct arrangements with artisans, no funds held and no guarantee of work.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHead
        title="Terms of"
        highlight="use"
        intro="The directory is a listing service. All work is arranged directly between you and the artisan, and we do not hold funds or guarantee work."
        image="/images/anvil-detail.jpg"
        crumb="Terms"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hf-prose">
                <p className="hf-muted" style={{ fontSize: 14 }}>
                  Last updated: 29 October 2026
                </p>

                <h2>1. What this service is</h2>
                <p>
                  Hiram Forges publishes a directory of blacksmiths, welders and metal
                  fabricators. The directory is informational. We are not a marketplace, an agent,
                  a contractor or a payment processor.
                </p>

                <h2>2. Independent listings</h2>
                <p>
                  Each workshop operates independently. Listing details, including prices, hours,
                  lead times, materials and guarantees, are set by the workshop. We check details
                  before publication and correct errors when they are reported, but we cannot
                  promise that every detail stays current.
                </p>

                <h2>3. Direct arrangement</h2>
                <p>
                  Any work, price, deposit, delivery date or warranty is agreed directly between
                  you and the artisan. We do not hold funds, receive deposits, inspect finished
                  work or guarantee quality, timing or safety. Where a dispute arises, it is for
                  you and the artisan to resolve, using local law and local authorities where
                  needed.
                </p>

                <h2>4. Your responsibilities as a client</h2>
                <ul>
                  <li>Describe the work accurately and provide measurements you have checked.</li>
                  <li>Agree the scope and price in writing before work starts.</li>
                  <li>Follow the workshop safety instructions while on site.</li>
                  <li>Check that licences, permits or insurance are in place where required.</li>
                  <li>Pay the agreed amount directly to the workshop.</li>
                </ul>

                <h2>5. Listings submitted by workshops</h2>
                <ul>
                  <li>You confirm that you are authorised to submit the workshop details.</li>
                  <li>The information you provide must be accurate and kept up to date.</li>
                  <li>Listings are free and we do not accept payment for placement or ranking.</li>
                  <li>We may edit a listing for clarity, length or house style.</li>
                  <li>We may decline or remove a listing that is misleading or unsafe.</li>
                </ul>

                <h2>6. Prohibited use</h2>
                <ul>
                  <li>Submitting false, stolen or misleading details.</li>
                  <li>Using the contact routes for spam, harassment or unrelated marketing.</li>
                  <li>Scraping the directory for bulk resale without written permission.</li>
                  <li>Presenting a listing as an endorsement or certification by Hiram Forges.</li>
                </ul>

                <h2>7. Safety and compliance</h2>
                <p>
                  Metalwork carries risk. Follow local safety rules, use protective equipment and
                  keep the public away from active work areas. Where a job requires a permit,
                  inspection or licensed trade, it is the responsibility of the client and the
                  workshop to arrange it. Our <Link href="/safety">safety notes</Link> are general
                  guidance only.
                </p>

                <h2>8. Photographs and content</h2>
                <p>
                  Photographs on this site are real workshop photographs published under the Pexels
                  licence and credited on the <Link href="/credits">photo credits page</Link>. Site
                  text, layout and branding belong to Hiram Forges unless stated otherwise.
                </p>

                <h2>9. Liability</h2>
                <p>
                  To the extent permitted by law, we are not liable for loss arising from work
                  arranged through the directory, for inaccurate listing details supplied by a
                  workshop, or for interruptions to this website. Nothing in these terms limits
                  liability that cannot be limited by law.
                </p>

                <h2>10. Privacy</h2>
                <p>
                  Personal data is handled as described in the{" "}
                  <Link href="/privacy">privacy notice</Link>.
                </p>

                <h2>11. Changes</h2>
                <p>
                  We may update these terms. The date at the top of the page shows the current
                  version. Continued use after a change means you accept the updated terms.
                </p>

                <h2>12. Contact</h2>
                <p>
                  Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="hf-disclaimer" style={{ position: "sticky", top: 120 }}>
                <h3>In one line</h3>
                <p>
                  We list workshops. You deal with the workshop directly. We do not perform
                  metalwork, hold funds or guarantee work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
