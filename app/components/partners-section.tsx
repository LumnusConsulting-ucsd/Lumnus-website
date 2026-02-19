import Image from "next/image";
import Link from "next/link";
import { FadeInOnScroll } from "./fade-scroll";

export function PartnersSection() {
  return (
    <FadeInOnScroll delayMs={100}>
      <section className="relative py-24 px-8 bg-white z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl mb-12">
            Our Partners
          </h2>

          {/* LOGO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 items-center">
            {/* PARTNER 1 */}
            <Link href="https://www.boozallen.com/" target="_blank">
              <Image
                src="/Booz.png"
                alt="Booz Allen Hamilton"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>

            {/* PARTNER 2 */}
            <Link href="https://www.ey.com/en_us" target="_blank">
              <Image
                src="/EY.png"
                alt="EY"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>

            {/* PARTNER 3 */}
            <Link href="https://www.bainbridgeconsulting.com/" target="_blank">
              <Image
                src="/Bainbridge.png"
                alt="Bainbridge Consulting"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>

            {/* PARTNER 4 */}
            <Link href="https://avasant.com/" target="_blank">
              <Image
                src="/Avasant.png"
                alt="Avasant"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>

            {/* PARTNER 5 */}
            <Link href="https://www.biolabs.io/san-diego" target="_blank">
              <Image
                src="/BioLab.png"
                alt="BioLabs San Diego"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>

            {/* PARTNER 6 */}
            <Link href="https://evonexus.org/" target="_blank">
              <Image
                src="/EvoNexus.png"
                alt="EvoNexus"
                width={320}
                height={160}
                className="mx-auto object-contain hover:opacity-80 transition"
              />
            </Link>
          </div>
        </div>
      </section>
    </FadeInOnScroll>
  );
}
