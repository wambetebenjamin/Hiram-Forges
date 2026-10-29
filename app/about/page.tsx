import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";
import { artisans } from "../lib/artisans";
import { regions } from "../lib/regions";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hiram Forges is an independent directory of blacksmiths, welders and metal fabricators. How listings work, what we do not do and how the directory is maintained.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        title="About"
        highlight="Hiram Forges"
        intro="An independent directory built so communities can find metalworkers, arrange repairs and commission new work with clear expectations."
        image="/images/about-hands.jpg"
        crumb="About"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row d_flex">
            <div className="col-md-6">
              <div className="hf-prose">
                <span className="hf-eyebrow">
                  <T k="footer.tagline" />
                </span>
                <h2>Why this directory exists</h2>
                <p>
                  Metal tools are repairable, but the knowledge of who can repair them is often
                  held in a neighbourhood rather than written down. A farmer with a worn plough
                  share, a householder with a dropped gate or a workshop with a broken press part
                  may all live within a few kilometres of someone who can fix it, and still not
                  know where to go.
                </p>
                <p>
                  Hiram Forges is a plain record of workshops, what they take on, how to prepare
                  for a visit and how to reach them. It is deliberately small: no marketplace, no
                  escrow, no rating scheme that rewards volume over craft.
                </p>

                <h3>How the listings work</h3>
                <p>
                  Every listing is submitted by the workshop or by someone acting for it. We check
                  the details by phone or WhatsApp before publishing, then ask the workshop to
                  confirm the work types, languages and hours. A listing marked verification
                  pending is live while those details are confirmed.
                </p>
                <p>
                  Listings are free. We do not accept payment for placement, do not rank workshops
                  by fee and do not take a percentage of any job arranged through the directory.
                </p>

                <h3>What we do not do</h3>
                <ul>
                  <li>We do not perform metalwork or employ the artisans listed.</li>
                  <li>We do not hold funds, process payments or act as an agent.</li>
                  <li>We do not guarantee the quality, price or timing of any job.</li>
                  <li>We do not settle disputes between a client and a workshop.</li>
                </ul>

                <h3>Editorial standard</h3>
                <p>
                  Descriptions are written to be useful rather than promotional. Where a workshop
                  has a limitation, such as a single welder or a long lead time in the rainy
                  season, the listing says so. Photographs are real workshop photographs, credited
                  on the photo credits page. No generated imagery is used.
                </p>

                <h3>Contact</h3>
                <p>
                  Corrections, removals and new listings are handled through the{" "}
                  <Link href="/contact">contact page</Link> or WhatsApp. If a listing is wrong,
                  tell us and we will correct it quickly.
                </p>
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <Image
                src="/images/about-hands.jpg"
                alt="Blacksmith working at a forge in a simple workshop"
                width={900}
                height={600}
                sizes="(max-width: 767px) 100vw, 460px"
                style={{ width: "100%", height: "auto", border: "10px solid #f3cf2d", marginBottom: 30 }}
              />
              <div className="hf-factbox">
                <dl>
                  <dt>Directory</dt>
                  <dd>Independent, free to list</dd>
                  <dt>Workshops listed</dt>
                  <dd>{artisans.length}</dd>
                  <dt>Countries covered</dt>
                  <dd>{regions.map((region) => region.country).join(", ")}</dd>
                  <dt>Languages</dt>
                  <dd>English, Kiswahili, Francais</dd>
                  <dt>Contact</dt>
                  <dd>
                    <Link href="/contact" style={{ textDecoration: "underline", color: "#061553" }}>
                      Contact page
                    </Link>
                  </dd>
                  <dt>Photo credits</dt>
                  <dd>
                    <Link href="/credits" style={{ textDecoration: "underline", color: "#061553" }}>
                      Pexels contributors
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
