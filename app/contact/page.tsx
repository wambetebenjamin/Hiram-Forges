import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { PageHead } from "../components/PageHead";
import { getArtisan } from "../lib/artisans";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about a listing, a correction or a workshop that should be in the Hiram Forges directory. Send a message or use WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ artisan?: string }>;
}) {
  const { artisan: slug } = await searchParams;
  const artisan = slug ? getArtisan(slug) : undefined;

  return (
    <>
      <PageHead
        title="Get in"
        highlight="touch"
        intro="Questions about a listing, a correction, or a workshop that should be here. Send a message and we will reply."
        image="/images/contact-workshop.jpg"
        crumb="Contact"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              {artisan ? (
                <div className="hf-note" style={{ marginBottom: 22 }}>
                  <p>
                    <strong>Enquiry about {artisan.workshop}.</strong> Your message will be
                    passed to the workshop in {artisan.city}, {artisan.country}. Hiram Forges does
                    not arrange the work or hold payment.
                  </p>
                </div>
              ) : null}
              <ContactForm artisan={artisan?.workshop} />
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="hf-factbox" style={{ marginBottom: 26 }}>
                <h3 className="hf-label" style={{ marginTop: 0 }}>
                  WhatsApp
                </h3>
                <p className="hf-help" style={{ marginBottom: 14 }}>
                  Fastest route for short questions and corrections to a listing.
                </p>
                <a
                  className="hf-btn hf-btn--sm"
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" /> {site.whatsappDisplay}
                </a>
                <h3 className="hf-label" style={{ marginTop: 24 }}>
                  Email
                </h3>
                <p className="hf-help">
                  <a href={`mailto:${site.email}`} style={{ textDecoration: "underline", color: "#061553" }}>
                    {site.email}
                  </a>
                </p>
                <h3 className="hf-label" style={{ marginTop: 24 }}>
                  Response time
                </h3>
                <p className="hf-help">
                  We usually reply within two working days. Listing corrections are handled
                  first.
                </p>
              </div>

              <div className="hf-disclaimer">
                <h3>Directory only</h3>
                <p>
                  We do not perform metalwork, hold funds or guarantee work. Arrangements are made
                  directly between you and the artisan. Follow local safety and business rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
