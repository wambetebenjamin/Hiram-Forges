import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { MyListing } from "../components/MyListing";

export const metadata: Metadata = {
  title: "My listing status",
  description: "Status of the workshop listing submitted from this device.",
  alternates: { canonical: "/my-listing" },
  robots: { index: false, follow: false },
};

export default function MyListingPage() {
  return (
    <>
      <PageHead
        title="My listing"
        highlight="status"
        intro="Status of the workshop listing submitted from this device. Listing review, corrections and removal are handled by the Hiram Forges team."
        image="/images/workshop-04.jpg"
        crumb="My listing"
      />
      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <MyListing />
            </div>
            <div className="col-lg-4">
              <div className="hf-disclaimer">
                <h3>Corrections and removal</h3>
                <p>
                  Send a message with your reference number and we will update or remove the
                  listing. Removal is actioned within two working days.
                </p>
                <p style={{ marginTop: 12 }}>
                  <a href="/contact" style={{ textDecoration: "underline" }}>
                    Go to the contact page
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
