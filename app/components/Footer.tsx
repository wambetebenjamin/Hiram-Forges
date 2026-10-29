"use client";

import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { Logo } from "./Logo";
import { footerDirectory, footerExplore, footerMore } from "../lib/nav";
import { site } from "../lib/site";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="hf-footer">
      <div className="footer">
        <div className="container">
          <div className="hf-footer-top">
            <div className="row">
              <div className="col-md-5">
                <Logo />
                <p style={{ color: "#e8e6de", marginTop: 18, maxWidth: 400 }}>
                  {t("footer.blurb")}
                </p>
              </div>
              <div className="col-md-7">
                <div className="hf-footer-nav">
                  <div>
                    <h4>{t("nav.footerExplore")}</h4>
                    <ul>
                      {footerExplore.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{t(item.key)}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>{t("nav.footerDirectory")}</h4>
                    <ul>
                      {footerDirectory.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{t(item.key)}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>{t("nav.footerMore")}</h4>
                    <ul>
                      {footerMore.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{t(item.key)}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ul className="conta">
              <li>
                <i className="fa fa-whatsapp" aria-hidden="true" />
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <i className="fa fa-envelope" aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <i className="fa fa-globe" aria-hidden="true" />
                Kenya, Nigeria, Ghana, Tanzania, South Africa, Ethiopia
              </li>
            </ul>
            <div className="hf-footer-disclaimer">
              <p>{t("disclaimer.full")}</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <p>
                  {"\u00A9"} {new Date().getFullYear()} {site.name}. {t("footer.rights")}{" "}
                  {t("footer.built")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
