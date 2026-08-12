"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const stats = [
  { value: 6, decimals: 0, suffix: "", label: "Original loyiha" },
  { value: 38.4, decimals: 1, suffix: " mln", label: "YouTube ko‘rish" },
  { value: 2, decimals: 0, suffix: "", label: "Efirdagi serial" },
  { value: 40, decimals: 0, suffix: "+", label: "Ijodiy mutaxassis" },
];

export function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    const stopAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const playAnimation = () => {
      stopAnimation();

      if (reduceMotion) {
        setProgress(1);
        return;
      }

      setProgress(0);
      const duration = 2300;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        frameId = elapsed < 1 ? window.requestAnimationFrame(animate) : 0;
      };
      frameId = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAnimation();
        } else if (!reduceMotion) {
          stopAnimation();
          setProgress(0);
        }
      },
      { threshold: 0.24, rootMargin: "-6% 0px -6%" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  return (
    <section className="stats-band" aria-label="Studio statistikasi">
      <div className="stats-grid" ref={containerRef}>
        {stats.map((stat, index) => {
          const current = stat.value * progress;
          const number = stat.decimals
            ? current.toFixed(stat.decimals).replace(".", ",")
            : Math.round(current).toString();

          return (
            <div className="stat-card" key={stat.label} style={{ "--stat-delay": `${index * 90}ms` } as CSSProperties}>
              <strong>{number}{stat.suffix}</strong>
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>
      <p className="demo-note">Demo statistika · real ma’lumotlar bilan almashtiriladi</p>
    </section>
  );
}
