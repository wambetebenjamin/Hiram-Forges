import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What Hiram Forges collects, why, how long it is kept and how to ask for a correction or removal.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        title="Privacy"
        highlight="notice"
        intro="What we collect, why we collect it and how to have it removed. Plain language, no tracking beyond the choices you make here."
        image="/images/tools-detail.jpg"
        crumb="Privacy"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hf-prose">
                <p className="hf-muted" style={{ fontSize: 14 }}>
                  Last updated: 29 October 2026
                </p>

                <h2>Who we are</h2>
                <p>
                  Hiram Forges is an independent directory of blacksmiths, welders and metal
                  fabricators. For any privacy question, contact us at{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>

                <h2>What we collect</h2>
                <ul>
                  <li>
                    <strong>Listing details.</strong> Workshop name, contact name, city, country,
                    work types, languages, phone and email, submitted through the join form.
                  </li>
                  <li>
                    <strong>Messages.</strong> Name, email, optional phone and message content sent
                    through the contact form.
                  </li>
                  <li>
                    <strong>Sign in details.</strong> The email and display name you type at sign
                    in are stored in a signed session cookie. No password is collected and no
                    public profile is created.
                  </li>
                  <li>
                    <strong>Device storage.</strong> Your saved artisan shortlist, your listing
                    reference and your language choice are stored in your browser on this device.
                  </li>
                  <li>
                    <strong>Essential cookies.</strong> One cookie records your language, one
                    records your cookie choice.
                  </li>
                  <li>
                    <strong>Optional analytics.</strong> Only if you accept analytics in the cookie
                    banner. Aggregate page views, no advertising profiles, no sale of data.
                  </li>
                </ul>

                <h2>Why we use it</h2>
                <ul>
                  <li>To review a listing and publish an accurate directory entry.</li>
                  <li>To answer a message, pass an enquiry to a workshop or correct a listing.</li>
                  <li>To keep your shortlist and language choice working on your device.</li>
                  <li>To protect the forms from spam and automated abuse.</li>
                  <li>To understand which pages help people find a workshop.</li>
                </ul>

                <h2>Legal basis</h2>
                <p>
                  Where the General Data Protection Regulation applies, we rely on your consent for
                  analytics cookies, our legitimate interest in running a directory for listing
                  review and spam protection, and the performance of a request you make when you
                  send a message. Where the Kenya Data Protection Act applies, we process the same
                  categories of data for the same purposes.
                </p>

                <h2>Cookies</h2>
                <p>
                  The cookie banner lets you accept all cookies or keep essential cookies only. The
                  essential cookies are <code>hiram-forges-cookie-consent</code> and{" "}
                  <code>hiram-forges-locale</code>. A session cookie is set by the sign in service
                  when you choose to sign in. You can clear these at any time in your browser and
                  the banner will appear again.
                </p>

                <h2>Spam protection</h2>
                <p>
                  Forms use Google reCAPTCHA when a site key is configured for this deployment. In
                  that case your use of the form is subject to the Google Privacy Policy and Terms
                  of Service. When no reCAPTCHA key is configured, a short confirmation inside the
                  form is used instead and no third party receives data.
                </p>

                <h2>Who we share with</h2>
                <ul>
                  <li>
                    The workshop you ask about, when you send an enquiry or when we pass on a
                    listing enquiry. We share the message content you provide, not your full
                    browsing data.
                  </li>
                  <li>Our hosting provider, for the purpose of serving this website.</li>
                  <li>Analytics, only if you accept analytics cookies.</li>
                  <li>Authorities, only where the law requires it.</li>
                </ul>
                <p>We do not sell personal data.</p>

                <h2>How long we keep it</h2>
                <ul>
                  <li>Listing records: while the listing is live and for twelve months after.</li>
                  <li>Message records: twelve months, then deleted unless needed for a dispute.</li>
                  <li>Sign in session: thirty days, or until you sign out.</li>
                  <li>Device storage: until you clear it in your browser.</li>
                  <li>Cookie choice: one hundred and eighty days.</li>
                </ul>

                <h2>Your rights</h2>
                <p>
                  You can ask for a copy of the data we hold about you, ask for a correction, ask
                  for deletion, withdraw consent for analytics, or object to processing. Write to{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within
                  thirty days. If you are not satisfied, you can complain to your local data
                  protection authority.
                </p>

                <h2>Children</h2>
                <p>
                  The directory is intended for adults arranging work. We do not knowingly collect
                  data from children. If a listing or message includes a child&apos;s details, contact
                  us and we will remove it.
                </p>

                <h2>Changes</h2>
                <p>
                  If this notice changes, the date at the top of the page changes with it. Material
                  changes will be noted on the{" "}
                  <Link href="/contact">contact page</Link>.
                </p>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="hf-disclaimer" style={{ position: "sticky", top: 120 }}>
                <h3>Quick summary</h3>
                <p>
                  No account needed to browse. No password ever collected. No data sold. Saved
                  artisans stay on your device. Analytics only if you accept it.
                </p>
                <p style={{ marginTop: 12 }}>
                  <Link href="/terms" style={{ textDecoration: "underline" }}>
                    Read the terms
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
