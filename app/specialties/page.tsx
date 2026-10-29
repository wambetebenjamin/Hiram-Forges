import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";
import { specialties } from "../lib/specialties";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "Common metalwork commissions: tools, gates and grills, agricultural implements, decorative work and welding. What to prepare before you visit a workshop.",
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHead
        title="What workshops"
        highlight="make and repair"
        intro="Common work types in the directory, what each one involves and what to prepare before you visit."
        image="/images/specialty-gates.jpg"
        crumb="Specialties"
      />

      <section className="hf-section--tight hf-section">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <p className="hf-lead">
                <T k="specialties.intro" />
              </p>
            </div>
          </div>
          <div className="hf-chips" style={{ marginTop: 26 }}>
            {specialties.map((specialty) => (
              <a key={specialty.key} href={`#${specialty.key}`} className="hf-chip hf-chip--dark">
                {specialty.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {specialties.map((specialty, index) => (
        <section
          id={specialty.key}
          key={specialty.key}
          className={`hf-section${index % 2 === 1 ? " hf-section--paper" : ""}`}
          style={{ scrollMarginTop: 110 }}
        >
          <div className="container">
            <div className="row d_flex">
              <div className={`col-md-5${index % 2 === 1 ? " order-md-2 offset-md-1" : ""}`}>
                <Image
                  src={specialty.image}
                  alt={`${specialty.name} work in a metal workshop`}
                  width={900}
                  height={675}
                  sizes="(max-width: 767px) 100vw, 460px"
                  style={{ width: "100%", height: "auto", border: "10px solid #f3cf2d" }}
                />
              </div>
              <div className={`col-md-6${index % 2 === 1 ? " order-md-1" : " offset-md-1"}`}>
                <span className="hf-eyebrow">
                  {String(index + 1).padStart(2, "0")} / {specialty.name}
                </span>
                <h2 className="titlepage" style={{ textAlign: "left", paddingBottom: 14, fontSize: 38 }}>
                  {specialty.name}
                </h2>
                <p className="hf-lead" style={{ marginBottom: 24 }}>
                  {specialty.intro}
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <h3 className="hf-label">Work you can commission</h3>
                    <ul className="hf-detail-list">
                      {specialty.work.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <h3 className="hf-label">Prepare before you visit</h3>
                    <ul className="hf-detail-list">
                      {specialty.prepare.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hf-note" style={{ marginTop: 10, marginBottom: 22 }}>
                  <p>
                    <strong>Questions worth asking.</strong>{" "}
                    {specialty.ask.join(" ")}
                  </p>
                </div>
                <Link className="hf-btn hf-btn--sm" href={`/artisans?specialty=${specialty.key}`}>
                  Find a workshop for this work
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
