"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const selector = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main .kicker",
  "main .section-label",
  "main .stat-card",
  "main .project-quick-meta",
  "main .project-facts > div",
  "main .technology-card",
  "main .team-card",
  "main .job-list > a",
  "main .faq-list > details",
  "main .contact-form > label",
  "main .contact-aside > div",
  "main .footer-links > div",
].join(",");

export function GlobalScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    elements.forEach((element, index) => {
      element.classList.add("scroll-motion-item");
      element.style.setProperty("--scroll-motion-delay", `${(index % 5) * 45}ms`);
    });

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
