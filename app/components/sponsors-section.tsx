import Image from "next/image";
import Link from "next/link";
import { FadeInOnScroll } from "./fade-scroll";

const SPONSORS = [
  { name: "Rady School of Management", href: "https://rady.ucsd.edu/", src: "/Rady.png" },
  { name: "The Basement", href: "https://thebasement.ucsd.edu/", src: "/Basement.png" },
];

export function SponsorsSection() {
  return (
    <FadeInOnScroll delayMs={100}>
      <section className="pt-12 pb-16 px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-medium tracking-tight mb-12">
            Thank You to Our Sponsors
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {SPONSORS.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                className="h-20 w-44 rounded-xl border border-border-subtle bg-white/[0.02] flex items-center justify-center p-4 hover:border-brand/40 hover:bg-white/[0.05] transition-all"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={320}
                  height={160}
                  className="max-h-full w-auto object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
