"use client";

import Image from "next/image";
import Link from "next/link";
import { artisans, featuredArtisans } from "../lib/artisans";
import { regions } from "../lib/regions";
import { specialties } from "../lib/specialties";
import { useI18n } from "./I18nProvider";
import { HeroCarousel } from "./HeroCarousel";
import { Reveal } from "./Reveal";

export function HomeContent() {
  const { t } = useI18n();
  const featured = featuredArtisans().slice(0, 3);
  const steps = [
    { n: "01", title: t("home.how1"), text: t("home.how1Text") },
    { n: "02", title: t("home.how2"), text: t("home.how2Text") },
    { n: "03", title: t("home.how3"), text: t("home.how3Text") },
    { n: "04", title: t("home.how4"), text: t("home.how4Text") },
  ];

  return (
    <>
      <HeroCarousel />

      {/* About the directory, template about block */}
      <div id="about" className="about">
        <div className="bg_about">
          <div className="container">
            <div className="row d_flex">
              <div className="col-md-5">
                <Reveal className="about_img" animation="fadeInLeft">
                  <figure>
                    <Image
                      src="/images/about-forge.jpg"
                      alt="Blacksmith working at a forge in a traditional workshop"
                      width={526}
                      height={527}
                      sizes="(max-width: 767px) 90vw, 420px"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                </Reveal>
              </div>
              <div className="col-md-6 offset-md-1">
                <Reveal className="titlepage text_align_right" animation="fadeInRight">
                  <h2>{t("home.valueTitle")}</h2>
                  <p>{t("home.valueIntro")}</p>
                  <ul className="hf-about-list text_align_left" style={{ marginBottom: 34 }}>
                    <li>
                      <strong>{t("home.value1Title")}.</strong> {t("home.value1Text")}
                    </li>
                    <li>
                      <strong>{t("home.value2Title")}.</strong> {t("home.value2Text")}
                    </li>
                    <li>
                      <strong>{t("home.value3Title")}.</strong> {t("home.value3Text")}
                    </li>
                  </ul>
                  <Link className="read_more" href="/about">
                    {t("nav.about")}
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured workshops, template products block */}
      <div id="product" className="prot">
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Reveal className="titlepage text_align_left">
                  <h2>{t("home.featuredTitle")}</h2>
                  <p>{t("home.featuredIntro")}</p>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row d_flex">
              {featured.map((artisan, index) => (
                <div className="col-md-4 mar_bottom30" key={artisan.slug}>
                  <Reveal animation="fadeInUp" delay={(index % 4) as 0 | 1 | 2 | 3}>
                    <Link href={`/artisans/${artisan.slug}`} className="hf-product-link">
                      <div className="product">
                        <figure>
                          <Image
                            src={artisan.image}
                            alt={artisan.imageAlt}
                            width={720}
                            height={520}
                            sizes="(max-width: 767px) 100vw, 340px"
                            style={{ width: "100%", height: 331, objectFit: "cover" }}
                          />
                        </figure>
                        <h3>{artisan.workshop}</h3>
                        <p style={{ color: "#fff", fontSize: 13, lineHeight: "21px" }}>
                          {artisan.city}, {artisan.country}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Link className="read_more" href="/artisans">
                  {t("common.viewAll")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to find an artisan */}
      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Reveal>
                <span className="hf-eyebrow">Practical steps</span>
                <h2 className="titlepage" style={{ textAlign: "left", paddingBottom: 12 }}>
                  {t("home.howTitle")}
                </h2>
                <p className="hf-lead" style={{ marginBottom: 42 }}>
                  {t("home.howIntro")}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="hf-steps">
            {steps.map((step, index) => (
              <Reveal key={step.n} className="hf-step" delay={(index % 4) as 0 | 1 | 2 | 3}>
                <span className="hf-step__num" aria-hidden="true">
                  {step.n}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work types */}
      <section className="hf-section--paper hf-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Reveal>
                <h2 className="titlepage" style={{ textAlign: "left", paddingBottom: 12 }}>
                  {t("home.specialtiesTitle")}
                </h2>
                <p className="hf-lead" style={{ marginBottom: 34 }}>
                  {t("home.specialtiesIntro")}
                </p>
              </Reveal>
            </div>
          </div>
          <ul className="hf-worklist">
            {specialties.map((specialty, index) => (
              <li key={specialty.key}>
                <Reveal animation="fadeInUp" delay={(index % 4) as 0 | 1 | 2 | 3}>
                  <Link href={`/specialties#${specialty.key}`}>
                    <h3>{specialty.name}</h3>
                    <p>{specialty.short}</p>
                    <span>{t("common.readMore")}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 34 }}>
            <Link className="hf-btn" href="/specialties">
              {t("specialties.title")}
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="hf-section hf-section--ink">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Reveal>
                <span className="hf-eyebrow">{t("regions.title")}</span>
                <h2 className="titlepage" style={{ textAlign: "left", paddingBottom: 12, color: "#fff" }}>
                  {t("regions.title")}
                </h2>
                <p className="hf-lead" style={{ color: "#e2e0d8", marginBottom: 30 }}>
                  {t("regions.intro")}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="row">
            {regions.slice(0, 3).map((region, index) => (
              <div className="col-md-4 mar_bottom30" key={region.slug}>
                <Reveal animation="fadeInUp" delay={(index % 4) as 0 | 1 | 2 | 3}>
                  <Link className="hf-region-card" href={`/regions#${region.slug}`}>
                    <Image
                      src={region.image}
                      alt={`Metalwork in ${region.country}`}
                      width={720}
                      height={520}
                      sizes="(max-width: 767px) 100vw, 360px"
                    />
                    <span className="hf-region-card__body">
                      <h3>{region.country}</h3>
                      <p>
                        {artisans.filter((item) => item.region === region.slug).length}{" "}
                        {t("regions.workshops")}
                      </p>
                    </span>
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="hf-stats">
            <div className="hf-stat">
              <strong>{regions.length}</strong>
              <span>{t("home.statsRegions")}</span>
            </div>
            <div className="hf-stat">
              <strong>{artisans.length}</strong>
              <span>{t("home.statsArtisans")}</span>
            </div>
            <div className="hf-stat">
              <strong>{specialties.length}</strong>
              <span>{t("home.statsSpecialties")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA, template contact block */}
      <div id="contact" className="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Reveal className="bg_yeloow">
                <div className="titlepage text_align_center">
                  <h2>{t("home.ctaTitle")}</h2>
                </div>
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <p
                      className="text_align_center"
                      style={{ color: "#1c1a12", fontSize: 17, lineHeight: "30px", marginBottom: 28 }}
                    >
                      {t("home.ctaText")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginBottom: 24,
                      }}
                    >
                      <Link className="hf-btn" href="/join">
                        {t("home.ctaButton")}
                      </Link>
                      <Link className="hf-btn hf-btn--outline" href="/artisans">
                        {t("home.ctaFind")}
                      </Link>
                    </div>
                    <p className="text_align_center" style={{ fontSize: 13, lineHeight: "22px", color: "#2b281c" }}>
                      {t("disclaimer.short")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
