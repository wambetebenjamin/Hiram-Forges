import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "../../components/PageHead";
import { SaveButton } from "../../components/SaveButton";
import { artisans, getArtisan } from "../../lib/artisans";
import { site, whatsappLink } from "../../lib/site";
import { specialtyName } from "../../lib/specialties";
import { getRegion } from "../../lib/regions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return artisans.map((artisan) => ({ slug: artisan.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artisan = getArtisan(slug);
  if (!artisan) return { title: "Artisan not found" };
  return {
    title: `${artisan.workshop}, ${artisan.city}`,
    description: artisan.summary,
    alternates: { canonical: `/artisans/${artisan.slug}` },
    openGraph: {
      title: `${artisan.workshop} | Hiram Forges`,
      description: artisan.summary,
      url: `${site.url}/artisans/${artisan.slug}`,
      images: [{ url: artisan.image, alt: artisan.imageAlt }],
    },
  };
}

export default async function ArtisanPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const artisan = getArtisan(slug);
  if (!artisan) notFound();

  const region = getRegion(artisan.region);
  const related = artisans
    .filter(
      (item) =>
        item.slug !== artisan.slug &&
        (item.region === artisan.region ||
          item.specialties.some((key) => artisan.specialties.includes(key))),
    )
    .slice(0, 3);

  const enquiry = [
    `Hello Hiram Forges, I found ${artisan.workshop} (${artisan.city}, ${artisan.country}) in the directory.`,
    "",
    "What I need:",
    "Item or commission:",
    "Preferred date:",
    "My location:",
  ].join("\n");

  return (
    <>
      <PageHead
        title={artisan.workshop}
        intro={artisan.summary}
        image={artisan.image}
        crumb={`${artisan.city}, ${artisan.country}`}
      >
        <div className="hf-chips" style={{ marginTop: 22 }}>
          <span className="hf-chip hf-chip--yellow">{artisan.city}</span>
          <span className="hf-chip hf-chip--yellow">{artisan.country}</span>
          {artisan.specialties.map((key) => (
            <span className="hf-chip hf-chip--dark" key={key}>
              {specialtyName(key)}
            </span>
          ))}
          <span className={`hf-status ${artisan.status === "pending" ? "hf-status--pending" : "hf-status--live"}`}>
            {artisan.status === "pending" ? "Verification pending" : "Listed"}
          </span>
        </div>
      </PageHead>

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="hf-detail-media" style={{ marginBottom: 36 }}>
                <Image
                  src={artisan.image}
                  alt={artisan.imageAlt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 991px) 100vw, 700px"
                  priority
                  style={{ width: "100%", height: "auto", aspectRatio: "4 / 3", objectFit: "cover" }}
                />
              </div>
              <div className="hf-prose">
                <h2>About {artisan.workshop}</h2>
                {artisan.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}

                <h3>Work this workshop takes on</h3>
                <ul>
                  {artisan.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>

                <h3>Prepare before you visit</h3>
                <ul>
                  {artisan.prepare.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h3>How to make contact</h3>
                <p>
                  Send an enquiry through Hiram Forges and we will pass it to the workshop. You
                  then agree the work, the price and the timeline directly with the maker. Hiram
                  Forges does not take bookings, hold funds or guarantee work.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "20px 0 28px" }}>
                  <a
                    className="hf-btn"
                    href={whatsappLink(enquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-whatsapp" aria-hidden="true" /> Message on WhatsApp
                  </a>
                  <Link className="hf-btn hf-btn--outline" href={`/contact?artisan=${artisan.slug}`}>
                    Use the contact form
                  </Link>
                  <SaveButton slug={artisan.slug} />
                </div>
              </div>
            </div>

            <div className="col-lg-4 offset-lg-1">
              <div className="hf-factbox" style={{ marginBottom: 26 }}>
                <dl>
                  <dt>Maker</dt>
                  <dd>{artisan.name}</dd>
                  <dt>Workshop</dt>
                  <dd>{artisan.workshop}</dd>
                  <dt>Location</dt>
                  <dd>
                    {artisan.city}, {artisan.country}
                    {region ? (
                      <>
                        {" "}
                        <Link
                          href={`/regions#${region.slug}`}
                          style={{ textDecoration: "underline", color: "#061553" }}
                        >
                          ({region.country} region)
                        </Link>
                      </>
                    ) : null}
                  </dd>
                  <dt>Working since</dt>
                  <dd>{artisan.since}</dd>
                  <dt>Languages</dt>
                  <dd>{artisan.languages.join(", ")}</dd>
                  <dt>Working hours</dt>
                  <dd>{artisan.hours}</dd>
                  <dt>Typical turnaround</dt>
                  <dd>{artisan.turnaround}</dd>
                  <dt>Specialties</dt>
                  <dd>{artisan.specialties.map(specialtyName).join(", ")}</dd>
                </dl>
              </div>

              <div className="hf-note" style={{ marginBottom: 26 }}>
                <p>
                  <strong>Before any payment.</strong> Ask for the scope in writing, including
                  material, finish, transport and the completion date. Inspect the work before
                  final payment. Follow local safety and business rules, and confirm licences
                  where they are required.
                </p>
                <p style={{ marginTop: 12 }}>
                  <Link href="/safety">Read the workshop safety notes</Link>
                </p>
              </div>

              <div className="hf-disclaimer">
                <h3>Directory only</h3>
                <p>
                  Hiram Forges is an independent directory. We do not perform metalwork, hold
                  funds or guarantee work. Arrangements are made directly between you and the
                  artisan.
                </p>
              </div>
            </div>
          </div>

          {related.length > 0 ? (
            <div style={{ marginTop: 56 }}>
              <h2
                className="titlepage"
                style={{ textAlign: "left", paddingBottom: 24, fontSize: 30 }}
              >
                Other workshops nearby
              </h2>
              <div className="row">
                {related.map((item) => (
                  <div className="col-md-4 mar_bottom30" key={item.slug}>
                    <article className="hf-card">
                      <Link href={`/artisans/${item.slug}`} className="hf-card__media" aria-hidden="true" tabIndex={-1}>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          width={720}
                          height={520}
                          sizes="(max-width: 767px) 100vw, 360px"
                          style={{ width: "100%", height: 210, objectFit: "cover" }}
                        />
                      </Link>
                      <div className="hf-card__body">
                        <p className="hf-card__meta">
                          {item.city}, {item.country}
                        </p>
                        <h3 className="hf-card__title">
                          <Link href={`/artisans/${item.slug}`}>{item.workshop}</Link>
                        </h3>
                        <p className="hf-card__text">{item.summary}</p>
                        <div className="hf-card__foot">
                          <Link className="hf-card__link" href={`/artisans/${item.slug}`}>
                            View profile
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
