import type { Metadata } from "next";
import { JoinForm } from "../components/JoinForm";
import { PageHead } from "../components/PageHead";

export const metadata: Metadata = {
  title: "List your workshop",
  description:
    "Free listing for blacksmiths, welders and metal fabricators. Submit your workshop details for review and appear in the Hiram Forges directory.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <>
      <PageHead
        title="List your"
        highlight="workshop"
        intro="Free listing for blacksmiths, welders and metal fabricators. Tell us about your work and how clients should reach you. Every submission is reviewed before it appears."
        image="/images/join-workshop.jpg"
        crumb="Join the directory"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <JoinForm />
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="hf-factbox" style={{ marginBottom: 26 }}>
                <h3 className="hf-label" style={{ marginTop: 0 }}>
                  What happens next
                </h3>
                <ol className="hf-detail-list" style={{ paddingLeft: 0, listStyle: "none" }}>
                  <li>You submit the form and receive a reference number.</li>
                  <li>We check the details by phone or WhatsApp within five working days.</li>
                  <li>If everything matches, the listing is published with your working hours.</li>
                  <li>You can ask us to correct or remove the listing at any time.</li>
                </ol>
              </div>

              <div className="hf-note" style={{ marginBottom: 26 }}>
                <p>
                  <strong>Standards we keep.</strong> Listings are free and independent. We do not
                  charge for placement, take a cut of any job or rank workshops by payment. A
                  listing is a description of work you take on, not an endorsement.
                </p>
              </div>

              <div className="hf-disclaimer">
                <h3>Your details</h3>
                <p>
                  We publish the workshop name, city, country, work types, languages and the
                  contact route you choose. We do not publish your email address. Read the{" "}
                  <a href="/privacy" style={{ textDecoration: "underline" }}>
                    privacy notice
                  </a>{" "}
                  before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
