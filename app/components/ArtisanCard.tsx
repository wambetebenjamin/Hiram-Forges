import Image from "next/image";
import Link from "next/link";
import type { Artisan } from "../lib/artisans";
import { specialtyName } from "../lib/specialties";
import { SaveButton } from "./SaveButton";

export function ArtisanCard({ artisan, priority = false }: { artisan: Artisan; priority?: boolean }) {
  return (
    <article className="hf-card">
      <Link href={`/artisans/${artisan.slug}`} className="hf-card__media" tabIndex={-1} aria-hidden="true">
        <Image
          src={artisan.image}
          alt={artisan.imageAlt}
          width={720}
          height={520}
          sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
          priority={priority}
          style={{ width: "100%", height: 240, objectFit: "cover" }}
        />
      </Link>
      <div className="hf-card__body">
        <p className="hf-card__meta">
          {artisan.city}, {artisan.country}
        </p>
        <h3 className="hf-card__title">
          <Link href={`/artisans/${artisan.slug}`}>{artisan.workshop}</Link>
        </h3>
        <p className="hf-card__text">{artisan.summary}</p>
        <div className="hf-chips">
          {artisan.specialties.slice(0, 3).map((key) => (
            <span className="hf-chip" key={key}>
              {specialtyName(key)}
            </span>
          ))}
          {artisan.status === "pending" ? <span className="hf-chip hf-chip--dark">Verification pending</span> : null}
        </div>
        <div className="hf-card__foot">
          <Link className="hf-card__link" href={`/artisans/${artisan.slug}`}>
            View profile
          </Link>
          <SaveButton slug={artisan.slug} />
        </div>
      </div>
    </article>
  );
}
