import Link from "next/link";

export function Logo({ tagline = true }: { tagline?: boolean }) {
  return (
    <Link href="/" className="hf-logo" aria-label="Hiram Forges home">
      <span className="hf-logo__mark" aria-hidden="true">
        HF
      </span>
      <span className="hf-logo__stack">
        <span className="hf-logo__name">Hiram Forges</span>
        {tagline ? <span className="hf-logo__tag">Fire, skill, lasting tools</span> : null}
      </span>
    </Link>
  );
}
