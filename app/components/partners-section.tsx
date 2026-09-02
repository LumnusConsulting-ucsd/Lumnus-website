import Image from "next/image";
import Link from "next/link";
import { FadeInOnScroll } from "./fade-scroll";

const PARTNERS = [
  { name: "Booz Allen Hamilton", href: "https://www.boozallen.com/", src: "/Booz.png" },
  { name: "EY", href: "https://www.ey.com/en_us", src: "/EY.png" },
  { name: "Bainbridge Consulting", href: "https://www.bainbridgeconsulting.com/", src: "/Bainbridge.png" },
  { name: "Avasant", href: "https://avasant.com/", src: "/Avasant.png" },
  { name: "BioLabs San Diego", href: "https://www.biolabs.io/san-diego", src: "/BioLab.png" },
  { name: "EvoNexus", href: "https://evonexus.org/", src: "/EvoNexus.png" },
];

export function PartnersSection() {
  return (
    <FadeInOnScroll delayMs={100}>
      <section className="relative py-24 px-8 bg-surface z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-medium tracking-tight mb-12">
            Our Partners
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {PARTNERS.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                target="_blank"
                className="h-20 w-44 rounded-xl border border-border-subtle bg-white/[0.02] flex items-center justify-center p-4 hover:border-brand/40 hover:bg-white/[0.05] transition-all"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
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
