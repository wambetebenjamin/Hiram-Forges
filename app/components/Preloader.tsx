"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("hiram-preloaded");
    if (reduce || seen) {
      setHidden(true);
      setDone(true);
      return;
    }
    const fade = window.setTimeout(() => {
      setHidden(true);
      window.sessionStorage.setItem("hiram-preloaded", "1");
    }, 1200);
    const remove = window.setTimeout(() => setDone(true), 1800);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="loader_bg"
      aria-hidden="true"
      style={{
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div className="loader">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/loading.gif" alt="" width={280} height={280} />
      </div>
    </div>
  );
}
