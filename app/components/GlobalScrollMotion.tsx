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
  "main .project-card",
  "main .video-card",
  "main .service-card",
  "main .process-grid > li",
  "main .project-quick-meta",
  "main .project-facts > div",
  "main .gallery-item",
  "main .project-values li",
  "main .project-switcher > a",
  "main .technology-card",
  "main .team-card",
  "main .job-list > a",
  "main .faq-list > details",
  "main .contact-form > label",
  "main .contact-aside > div",
  "main .proof-image",
  "main .proof-stats > div",
  "main .channel-stats > span",
  "main .button",
  "main .footer-links > div",
].join(",");

export function GlobalScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const visibleElements = new Set<HTMLElement>();
    let lastScrollY = window.scrollY;
    let scrollDirection: "down" | "up" = "down";
    let animationFrame = 0;

    elements.forEach((element, index) => {
      element.classList.add("scroll-motion-item");
      element.style.setProperty("--scroll-motion-delay", `${(index % 5) * 45}ms`);
      element.style.setProperty("--scroll-motion-y", "18px");
      element.style.setProperty("--scroll-live-y", "0px");
    });

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const updateVisibleMotion = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      visibleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const normalized = Math.max(-1, Math.min(1, (center - viewportHeight / 2) / (viewportHeight / 2)));
        element.style.setProperty("--scroll-live-y", `${(-normalized * 5).toFixed(2)}px`);
      });
    };

    const updateDirection = () => {
      const nextScrollY = window.scrollY;
      const nextDirection = nextScrollY >= lastScrollY ? "down" : "up";
      lastScrollY = nextScrollY;

      if (nextDirection !== scrollDirection) {
        scrollDirection = nextDirection;
        const offset = scrollDirection === "down" ? "18px" : "-18px";
        elements.forEach((element) => {
          if (!element.classList.contains("is-visible")) {
            element.style.setProperty("--scroll-motion-y", offset);
          }
        });
      }

      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVisibleMotion);
    };

    window.addEventListener("scroll", updateDirection, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.setProperty(
              "--scroll-motion-y",
              scrollDirection === "down" ? "18px" : "-18px",
            );
            visibleElements.add(element);
            element.classList.add("is-visible");
            if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVisibleMotion);
          } else {
            visibleElements.delete(element);
            element.classList.remove("is-visible");
            element.style.setProperty("--scroll-live-y", "0px");
          }
        });
      },
      { rootMargin: "-3% 0px -8%", threshold: 0.06 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateDirection);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [pathname]);

  return null;
}
