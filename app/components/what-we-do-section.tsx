"use client";

import Link from "next/link";
import { FadeInOnScroll } from "./fade-scroll";

export function WhatWeDoSection() {
  return (
    <FadeInOnScroll delayMs={100}>
    <section id="services" className="relative py-24 px-8 bg-white z-10">
      <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-gray-900 text-4xl md:text-5xl mb-8">
            What We Do
          </h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
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
            bg-blue-950 hover:bg-blue-900 text-white
            text-sm md:text-lg
            px-10 py-4
            rounded-full
            font-medium
            transition-colors
        "
        >
        Our Services
        </button>
        </Link>
      </div>
    </section>
    </FadeInOnScroll>
  );
}
