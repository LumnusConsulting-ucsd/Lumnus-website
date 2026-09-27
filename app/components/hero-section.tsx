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
      className="relative min-h-[100svh] overflow-hidden flex items-center justify-center"
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

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 pb-24 pt-28 sm:px-8 sm:pb-28">
        <HeroFadeText className="mx-auto w-full max-w-6xl text-center text-white sm:-translate-y-4 lg:-translate-y-6">
          <div className="mx-auto mb-5 h-0.5 w-40 bg-white/60 sm:mb-6 sm:w-56 md:w-64" />

          <h1 className="mb-4 text-[clamp(2.35rem,6vw,5rem)] leading-[1.05] tracking-[0.08em] sm:mb-6">
            LUMNUS CONSULTING
          </h1>

          <p className="text-[clamp(0.85rem,2vw,1.5rem)] font-medium tracking-wide">
            STUDENT-RUN, PROFESSIONALLY DRIVEN
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex whitespace-nowrap rounded-full bg-brand px-8 py-3 text-sm font-medium text-brand-foreground transition-all hover:scale-[1.03] active:scale-[0.98] hover:bg-brand-light hover:shadow-lg sm:mt-10 md:px-10 md:py-4 md:text-lg"
          >
            Learn More
          </Link>
        </HeroFadeText>
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
