import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hf-section" style={{ paddingTop: 200 }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <span className="hf-eyebrow">404</span>
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 44,
                fontWeight: 700,
                color: "#061553",
                textTransform: "uppercase",
                lineHeight: 1.1,
                paddingBottom: 18,
              }}
            >
              Page not found
            </h1>
            <p className="hf-lead" style={{ marginBottom: 26 }}>
              That page is not in the directory. The artisan list and the work types are the
              fastest routes back.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="hf-btn" href="/artisans">
                Artisan directory
              </Link>
              <Link className="hf-btn hf-btn--outline" href="/">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
