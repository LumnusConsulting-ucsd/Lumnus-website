import Image from "next/image";
import Link from "next/link";
import { FadeInOnScroll } from "./fade-scroll";

export function SponsorsSection() {
  return (
    <FadeInOnScroll delayMs={100}>
    <section className="pt-12 pb-15 px-2 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* MATCHED TITLE */}
        <h2 className="text-3xl md:text-5xl mb-16">
          Our Sponsors
        </h2>

        <div className="flex justify-between items-center max-w-4xl mx-auto">
          
          {/* SPONSOR 1 */}
          <Link href="https://rady.ucsd.edu/" target="_blank">
            <Image
              src="/Rady.png"
              alt="Sponsor 1"
              width={320}
              height={160}
              className="object-contain hover:opacity-80 transition"
            />
          </Link>

          {/* SPONSOR 2 */}
          <Link href="https://thebasement.ucsd.edu/" target="_blank">
            <Image
              src="/Basement.png"
              alt="Sponsor 2"
              width={320}
              height={160}
              className="object-contain hover:opacity-80 transition"
            />
          </Link>

        </div>
      </div>
    </section>
    </FadeInOnScroll>
  );
}
