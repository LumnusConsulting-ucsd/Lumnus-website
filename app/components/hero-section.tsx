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
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/LumnusConsulting-hero.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "125% auto",
        backgroundPosition: "0% 55%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔥 Text Fade + Pop Animation */}
      <HeroFadeText className="text-center text-white px-8">
        <div className="w-56 md:w-64 h-0.5 bg-white mx-auto mb-6" />

        <h1 className="text-5xl md:text-7xl tracking-wider mb-6">
          LUMNUS CONSULTING
        </h1>

        <p className="text-base md:text-xl lg:text-2xl tracking-wide font-medium -mt-3">
          STUDENT-RUN, PROFESSIONALLY DRIVEN
        </p>

        <Link href="/about">
          <button
            className="
              bg-blue-950 hover:bg-blue-900 text-white
              text-sm md:text-lg
              px-10 py-4
              rounded-full
              font-medium
              transition-all
              mt-6
              hover:scale-[1.03]
              hover:shadow-lg
            "
          >
            Learn More
          </button>
        </Link>
      </HeroFadeText>

      {/* Scroll Arrow */}
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
