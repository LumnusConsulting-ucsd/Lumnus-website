import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import membersData from "./members.json";
import galleryData from "./gallery.json";
import { MembersSection, type Member } from "./MembersSection";

// Content lives in ./members.json (people) and ./gallery.json (photos).
// Edit those files, not this one.

const MEMBERS: Member[] = membersData.members;
const DEPARTMENTS = membersData.departments;
// Shown publicly as "50+": includes consultants not listed individually on the site.
const CONSULTANT_COUNT = "50+";

const HERO = galleryData.hero ?? { src: "/master.jpg", alt: "The Lumnus Consulting team" };
const GALLERY = galleryData.gallery;

const LOGOS = [
  ["google", "Google"],
  ["microsoft", "Microsoft"],
  ["adobe", "Adobe"],
  ["capital-one", "Capital One"],
  ["coinbase", "Coinbase"],
  ["bcg", "BCG"],
  ["deloitte", "Deloitte"],
  ["ey", "EY"],
  ["jp-morgan", "J.P. Morgan"],
  ["paypal", "PayPal"],
  ["servicenow", "ServiceNow"],
  ["boa", "Bank of America"],
] as const;

// Six faces for the Join Us band: people with new, consistently framed headshots.
const AVATARS = MEMBERS.filter((m) => m.photo.startsWith("/team/")).slice(0, 6);

// Section colours: navy for the story and members, light for logos and gallery.
const TONE = {
  story: "tone-navy",
  members: "tone-navy",
  logos: "tone-light",
  gallery: "tone-light",
} as const;

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="reveal mx-auto mb-8 max-w-2xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-t-fg md:text-4xl">{children}</h2>
      {sub && <p className="mt-3 text-base text-t-muted md:text-lg">{sub}</p>}
    </div>
  );
}

export default function About() {
  const tone = TONE;

  return (
    <div className="w-full bg-[#f7f8fa] antialiased">
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden md:min-h-[66svh]">
        <Image src={HERO.src} alt={HERO.alt} fill priority sizes="100vw" className="-z-20 object-cover object-[50%_35%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/45" />
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-28 text-white sm:px-6 md:pb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">About Lumnus</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            Students doing real consulting work.
          </h1>
        </div>
      </section>

      {/* 2. Stat strip */}
      <section className="tone-navy border-t border-t-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-t-line sm:px-6">
          {[
            ["2016", "Founded at UC San Diego"],
            [CONSULTANT_COUNT, "Consultants"],
            ["30,000", "Junior Enterprise members across two dozen countries"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center gap-1 px-2 py-5 text-center sm:px-4 sm:py-7">
              <dt className="order-2 max-w-[16rem] text-xs leading-snug text-t-muted sm:text-sm">{label}</dt>
              <dd className="order-1 text-2xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Mission + Junior Enterprise */}
      <section className={`${tone.story} px-4 pt-12 pb-0 sm:px-6 md:pt-16`}>
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Real clients. Real experience.</h2>
          <p className="mt-4 text-base leading-relaxed text-t-muted md:text-lg">
            Lumnus is a student-run consulting firm at UC San Diego, supported by the Rady School of Management.
            We give students real-world business experience while delivering high-quality work for our clients, and
            we&apos;re part of the global Junior Enterprise network of 30,000 student consultants.
          </p>
        </div>
      </section>

      {/* 4. Our Members */}
      <section className={`${tone.members} px-4 pt-12 pb-14 sm:px-6 md:pt-14 md:pb-16`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading>
            Our members
          </SectionHeading>
          <MembersSection members={MEMBERS} departments={DEPARTMENTS} />
        </div>
      </section>

      {/* 5. Where Our Consultants Have Been */}
      <section className={`${tone.logos} border-t border-t-line py-10 md:py-12`}>
        <h2 className="reveal mb-6 px-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-t-muted">
          Where our consultants have been
        </h2>
        <div className="marquee" tabIndex={0} aria-label="Companies where our consultants have worked">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20">
                {LOGOS.map(([file, name]) => (
                  <li key={file} className="flex h-16 items-center">
                    {/* JPG logos have white backgrounds; multiply blends them into the off-white */}
                    <img
                      src={`/logos/${file}.jpg`}
                      alt={copy === 0 ? name : ""}
                      className="h-10 w-auto max-w-[140px] object-contain mix-blend-multiply md:h-12"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Behind the Scenes */}
      <section id="behind-the-scenes" className={`${tone.gallery} border-t border-t-line px-4 py-12 sm:px-6 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading sub="Moments from media day, recruiting, and everything in between.">
            Behind the scenes
          </SectionHeading>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {GALLERY.map((g) => (
              <figure key={g.src} className="reveal break-inside-avoid overflow-hidden rounded-3xl bg-t-soft">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  // Gallery files are already resized WebP; serve them as-is instead of re-optimising.
                  unoptimized={g.src.endsWith(".webp")}
                  className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Join Us */}
      <section className="tone-navy px-4 py-14 sm:px-6 md:py-16">
        <div className="reveal mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex -space-x-3" aria-hidden="true">
            {AVATARS.map((m) => (
              <div key={m.name} className="relative size-12 overflow-hidden rounded-full ring-4 ring-navy md:size-14">
                <Image src={m.photo} alt="" fill sizes="56px" className="object-cover" />
              </div>
            ))}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
            Join {CONSULTANT_COUNT} consultants
          </h2>
          <p className="mt-4 max-w-xl text-base text-t-muted md:text-lg">
            Find out how to apply and when our next recruiting cycle opens.
          </p>
          <Link
            href="/recruitment"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-[#e6eefa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-base"
          >
            See recruiting <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
