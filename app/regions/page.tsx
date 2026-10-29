import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { artisansByRegion } from "../lib/artisans";
import { coverageRoadmap, regions } from "../lib/regions";
import { specialtyName } from "../lib/specialties";

export const metadata: Metadata = {
  title: "Regions",
  description:
    "Coverage examples across Kenya, Nigeria, Ghana, Tanzania, South Africa and Ethiopia, with practical notes for arranging metalwork in each country.",
  alternates: { canonical: "/regions" },
};

export default function RegionsPage() {
  return (
    <>
      <PageHead
        title="Where the"
        highlight="workshops are"
        intro="Coverage examples across six countries. City listings are added as workshops are contacted and confirmed."
        image="/images/region-kenya.jpg"
        crumb="Regions"
      />

      <section className="hf-section--tight hf-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <p className="hf-lead">
                Listings are grouped by country and city so you can judge travel distance before
                you call. Each workshop sets its own hours. Some keep a fixed shop, others work
                from a yard or take mobile jobs, so confirm the address before setting out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {regions.map((region, index) => {
        const list = artisansByRegion(region.slug);
        return (
          <section
            key={region.slug}
            id={region.slug}
            className={`hf-section${index % 2 === 1 ? " hf-section--paper" : ""}`}
            style={{ scrollMarginTop: 110 }}
          >
            <div className="container">
              <div className="row d_flex">
                <div className={`col-md-5${index % 2 === 1 ? " order-md-2 offset-md-1" : ""}`}>
                  <Image
                    src={region.image}
                    alt={`Metalwork in ${region.country}`}
                    width={900}
                    height={675}
                    sizes="(max-width: 767px) 100vw, 460px"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className={`col-md-6${index % 2 === 1 ? " order-md-1" : " offset-md-1"}`}>
                  <span className="hf-eyebrow">
                    {list.length} workshops listed
                  </span>
                  <h2 className="titlepage" style={{ textAlign: "left", paddingBottom: 14, fontSize: 38 }}>
                    {region.country}
                  </h2>
                  <p className="hf-lead" style={{ marginBottom: 16 }}>
                    {region.intro}
                  </p>
                  <p className="hf-muted" style={{ fontSize: 15, lineHeight: "26px", marginBottom: 20 }}>
                    {region.craft}
                  </p>
                  <h3 className="hf-label">Cities with listings</h3>
                  <div className="hf-chips" style={{ marginBottom: 22 }}>
                    {region.cities.map((city) => (
                      <span className="hf-chip" key={city}>
                        {city}
                      </span>
                    ))}
                  </div>
                  <h3 className="hf-label">Practical notes</h3>
                  <ul className="hf-detail-list">
                    {region.practical.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {list.length > 0 ? (
                    <>
                      <h3 className="hf-label" style={{ marginTop: 20 }}>
                        Listed workshops
                      </h3>
                      <ul className="hf-detail-list" style={{ marginBottom: 20 }}>
                        {list.map((artisan) => (
                          <li key={artisan.slug}>
                            <Link
                              href={`/artisans/${artisan.slug}`}
                              style={{ textDecoration: "underline", color: "#061553" }}
                            >
                              {artisan.workshop}
                            </Link>{" "}
                            <span className="hf-muted">
                              {artisan.city}, {artisan.specialties.map(specialtyName).join(", ")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <Link className="hf-btn hf-btn--sm" href={`/artisans?region=${region.slug}`}>
                    See {region.country} workshops
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="hf-section hf-section--ink">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="titlepage" style={{ textAlign: "left", color: "#fff", paddingBottom: 14, fontSize: 34 }}>
                Coverage in progress
              </h2>
              <p className="hf-lead" style={{ color: "#dedbd2", marginBottom: 28 }}>
                A listing only goes live after a workshop has confirmed its details. These
                countries are being contacted now.
              </p>
            </div>
          </div>
          <div className="row">
            {coverageRoadmap.map((item) => (
              <div className="col-md-3 col-sm-6 mar_bottom30" key={item.country}>
                <div style={{ borderTop: "4px solid #f3cf2d", paddingTop: 16 }}>
                  <h3 style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: 18, paddingBottom: 8 }}>
                    {item.country}
                  </h3>
                  <p style={{ color: "#dedbd2", fontSize: 14, lineHeight: "24px" }}>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
