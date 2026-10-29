import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({
  title,
  highlight,
  intro,
  image,
  crumb,
  children,
}: {
  title: string;
  highlight?: string;
  intro?: string;
  image: string;
  crumb: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="hf-pagehead"
      style={{ backgroundImage: `url(${image})` }}
      aria-labelledby="page-title"
    >
      <div className="container">
        <p className="hf-crumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{crumb}</span>
        </p>
        <h1 id="page-title">
          {title} {highlight ? <span>{highlight}</span> : null}
        </h1>
        {intro ? <p>{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
