"use client";

export function JuniorEnterpriseSection() {
  return (
      <section
        className="relative py-12 px-8 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.08), transparent 70%)",
        }}
      >
        <a
          href="https://www.juniorenterprises.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left hover:opacity-90 transition-opacity"
        >
          <img
            src="/JEUSApic.png"
            alt="Junior Enterprise United States of America"
            className="h-10 w-auto shrink-0 rounded-md bg-white p-1.5"
          />
          <p className="text-text-secondary text-sm md:text-base">
            Lumnus Consulting is a proud affiliate of the{" "}
            <span className="text-foreground font-medium">
              Junior Enterprise Global Movement
            </span>{" "}
            — 30,000 active members across two dozen countries, partnered with
            companies like Microsoft, McKinsey, and Kraft Heinz.
          </p>
        </a>
      </section>
  );
}
