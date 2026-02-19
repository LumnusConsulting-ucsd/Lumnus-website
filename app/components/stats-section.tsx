"use client";
import { FadeInOnScroll } from "./fade-scroll";

import { useEffect, useRef, useState } from "react";

export function StatsSection() {
  const stats = [
    { number: 44, label: "ACTIVE MEMBERS", prefix: "", suffix: "" },
    { number: 15, label: "MAJORS", prefix: "", suffix: "" },
    { number: 15, label: "DOLLARS IN PROFITS", prefix: "$", suffix: "K" },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.number / steps;
              let currentStep = 0;

              const timer = setInterval(() => {
                currentStep++;
                const newValue = Math.min(
                  Math.round(increment * currentStep),
                  stat.number,
                );

                setCounters((prev) => {
                  const next = [...prev];
                  next[index] = newValue;
                  return next;
                });

                if (currentStep >= steps) clearInterval(timer);
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <FadeInOnScroll delayMs={100}>
    <section
      ref={sectionRef}
      className="relative py-32 px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 20, 50, 0.7), rgba(0, 20, 50, 0.7)), url('/IMG_7045.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center text-white">
          {stats.map((stat, index) => (
            <div key={stat.label}>
              <div className="text-6xl md:text-7xl mb-4">
                {stat.prefix}
                {counters[index]}
                {stat.suffix}
              </div>
              <div className="text-sm tracking-widest opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </FadeInOnScroll>
  );
}
