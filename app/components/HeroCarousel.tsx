"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";

const slides = [
  { image: "/images/hero-01.jpg", badge: "FREE" },
  { image: "/images/hero-02.jpg", badge: "CRAFT" },
  { image: "/images/hero-03.jpg", badge: "LOCAL" },
];

export function HeroCarousel() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: number) => {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section
      className="full_bg banner_main"
      style={{ backgroundImage: `url(${slides[index].image})` }}
      aria-label="Hiram Forges introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div id="myCarousel" className="carousel slide banner">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="carousel-caption banner_po">
                <div className="row">
                  <div className="col-md-8">
                    <div className="build_box text_align_left">
                      <span className="hf-eyebrow">{t("home.eyebrow")}</span>
                      <h1>
                        {t("home.titleTop")}
                        <br />
                        <span className="white">{t("home.titleBottom")}</span>
                      </h1>
                      <p>{t("home.intro")}</p>
                      <Link className="read_more conatct_btn" href="/artisans" role="button">
                        {t("home.ctaFind")}
                      </Link>
                      <Link className="read_more conatct_btn" href="/join" role="button">
                        {t("home.ctaJoin")}
                      </Link>
                    </div>
                  </div>
                </div>
                <strong aria-hidden="true">{slides[index].badge}</strong>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="carousel-control-prev"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <i className="fa fa-angle-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="carousel-control-next"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <i className="fa fa-angle-right" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
