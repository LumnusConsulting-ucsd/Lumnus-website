"use client";

import { HeroFadeText } from "./hero-fade-text";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToWhatWeDo = () => {
    const whatWeDoSection = document.getElementById("services");
    if (whatWeDoSection) {
      whatWeDoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/walking-laughing.mp4"
        poster="/gallery/full-cohort-group.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-background/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <HeroFadeText className="text-center text-white px-6 -translate-y-24 md:px-8 md:-translate-y-[4.5rem]">
          <div className="w-48 md:w-64 h-0.5 bg-white/60 mx-auto mb-5 md:mb-6" />

          <h1 className="text-4xl md:text-7xl tracking-wider mb-4 md:mb-6">
            LUMNUS CONSULTING
          </h1>

          <p className="text-sm md:text-xl lg:text-2xl tracking-wide font-medium">
            STUDENT-RUN, PROFESSIONALLY DRIVEN
          </p>
        </HeroFadeText>
      </div>

      <div className="absolute left-1/2 bottom-32 -translate-x-1/2 md:bottom-[18.75rem]">
        <Link href="/about">
          <button
            className="
              bg-brand hover:bg-brand-light text-white
              text-sm md:text-lg
              px-8 md:px-10 py-3 md:py-4
              rounded-full
              font-medium
              transition-all
              hover:scale-[1.03]
              hover:shadow-lg
              whitespace-nowrap
            "
          >
            Learn More
          </button>
        </Link>
      </div>

      <button
        onClick={scrollToWhatWeDo}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Scroll to What We Do section"
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </button>
    </section>
  );
}