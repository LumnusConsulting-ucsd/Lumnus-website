import Image from "next/image";
import Link from "next/link";

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
      <section className="relative pt-10 pb-6 px-8 bg-surface z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-medium tracking-tight mb-8">
            Our Partners
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                target="_blank"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] transition-all"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={320}
                  height={160}
                  className="h-7 max-w-[100px] w-auto object-contain"
                />
                <span className="text-sm font-medium text-slate-200">{partner.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}
