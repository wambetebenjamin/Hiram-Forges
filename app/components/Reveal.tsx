"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  animation?: "fadeInUp" | "fadeIn" | "fadeInLeft" | "fadeInRight";
};

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  animation = "fadeInUp",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible", "animate__animated", `animate__${animation}`);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animation]);

  return (
    <Tag
      ref={ref}
      className={`hf-reveal${delay ? ` animate__delay-${delay}s` : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
