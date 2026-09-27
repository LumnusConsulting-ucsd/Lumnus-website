"use client";

import Link from "next/link";

export function WhatWeDoSection() {
  return (
    <section id="services" className="relative py-16 px-8 bg-surface z-10">
      <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-foreground text-4xl md:text-5xl mb-8">
            What We Do
          </h2>
        <p className="text-text-secondary leading-relaxed text-lg mb-8">
          Our team of consultants come from a variety of backgrounds and majors
          and have been hand-picked to ensure continuous quality and high
          performance. Through disciplined project management practices,
          innovative business approaches, and insights from our network of
          advisors and industry professionals, Lumnus Consulting ensures that
          each of our clients receive solutions tailored to their needs.
        </p>
        <Link href="/services">
        <button
        className="
            bg-brand hover:bg-brand-light text-brand-foreground
            text-sm md:text-lg
            px-10 py-4
            rounded-full
            font-medium
            transition-all
            hover:scale-[1.03]
            active:scale-[0.98]
            hover:shadow-lg
        "
        >
        Our Services
        </button>
        </Link>
      </div>
    </section>
  );
}
