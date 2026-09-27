import Image from "next/image";
import Link from "next/link";

const SPONSORS = [
  { name: "Rady School of Management", href: "https://rady.ucsd.edu/", src: "/Rady.png" },
  { name: "The Basement", href: "https://thebasement.ucsd.edu/", src: "/Basement.png" },
];

export function SponsorsSection() {
  return (
      <section className="pt-6 pb-10 px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-medium tracking-tight mb-8">
            Thank You to Our Sponsors
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {SPONSORS.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] transition-all"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={320}
                  height={160}
                  className="h-7 max-w-[100px] w-auto object-contain"
                />
                <span className="text-sm font-medium text-slate-200">{sponsor.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}
