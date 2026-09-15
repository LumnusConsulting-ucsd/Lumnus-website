"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

// Images: hero/mission in public/; logos in public/logos/ (all .jpg)
const heroImage = "/master.jpg";
const missionImage = "/mission.jpg";
const googleLogo = "/logos/google.jpg";
const microsoftLogo = "/logos/microsoft.jpg";
const adobeLogo = "/logos/adobe.jpg";
const capitalOneLogo = "/logos/capital-one.jpg";
const coinbaseLogo = "/logos/coinbase.jpg";
const bcgLogo = "/logos/bcg.jpg";
const deloitteLogo = "/logos/deloitte.jpg";
const jpMorganLogo = "/logos/jp-morgan.jpg";
const paypalLogo = "/logos/paypal.jpg";
const boaLogo = "/logos/boa.jpg";
const serviceNowLogo = "/logos/servicenow.jpg";
const eyLogo = "/logos/ey.jpg";

// Committee names and members — add linkedin URL for each when you have it
const COMMITTEES = [
  "Executive Board",
  "Sales",
  "External",
  "Marketing",
  "Finance",
  "Human Resources",
  "Technology",
] as const;

type Member = { name: string; linkedin?: string; title?: string; photo?: string };

const membersByCommittee: Record<(typeof COMMITTEES)[number], Member[]> = {
  "Executive Board": [
    { name: "Irina Vardapetyan", linkedin: "https://linkedin.com/in/irinavard", title: "Co-President" },
    { name: "Mint Ruangritchai", linkedin: "https://linkedin.com/in/mintruangritchai", title: "Co-President" },
    { name: "Pratibha Arun", linkedin: "https://linkedin.com/in/pratibha-arun", title: "VP of Operations" },
    { name: "Eshwari Gundi", linkedin: "https://linkedin.com/in/eshwari-gundi-a61480229", title: "VP of Sales" },
    { name: "Varsha Reddy", linkedin: "https://linkedin.com/in/varshagreddy", title: "VP of External" },
    { name: "Emily Naka", linkedin: "https://linkedin.com/in/emilynaka", title: "VP of Marketing" },
    { name: "Andrew Kim", linkedin: "https://www.linkedin.com/in/andrewgykim/", title: "VP of Finance" },
    { name: "Angela Chen", linkedin: "https://linkedin.com/in/angelacjq", title: "VP of HR" },
    { name: "Ishaan Garg", linkedin: "https://linkedin.com/in/ishaangarg06", title: "VP of Technology" },
    { name: "Aashima Keswani", linkedin: "https://linkedin.com/in/aashima-keswani", title: "Director of Alumni Relations" },
    { name: "Maximilian Chao", linkedin: "https://linkedin.com/in/maximilian-chao-196a58246" , title: "Junior Enterprise Ambassador"},
    { name: "Vihan Shah", linkedin: "https://linkedin.com/in/vihanshah", title: "Director of Program Tracking"},
    { name: "Giulio Rambelli", linkedin: "https://linkedin.com/in/giuliorambelli", title: "Director of Internal Operations"},
    { name: "Treesha Chhabria", linkedin: "https://linkedin.com/in/treesha-chhabria-1b2642362", photo: "treesha-chhabria", title: "Director of Internal Operations"},


  ],
  Sales: [
    { name: "Aashima Keswani", linkedin: "https://linkedin.com/in/aashima-keswani" },
    { name: "Amelia Badamjav", linkedin: "https://linkedin.com/in/amelia-badamjav-a11617314" },
    { name: "Arushi Gupta", linkedin: "https://linkedin.com/in/argupta5" },
    { name: "Eshwari Gundi", linkedin: "https://linkedin.com/in/eshwari-gundi-a61480229" },
    { name: "Natasha Dorairaj", linkedin: "https://www.linkedin.com/in/natashadorairaj/" },
    { name: "Parnika Gupta", linkedin: "https://www.linkedin.com/in/parnika-gupta1/?skipRedirect=true" },
    { name: "Veda Thota", linkedin: "https://linkedin.com/in/veda-thota" },
  ],
  External: [
    { name: "Aarav Mittal" },
    { name: "Abigail Losi", linkedin: "https://linkedin.com/in/abigail-losi-56b883346" },
    { name: "Abigail Shlimenzon", linkedin: "https://linkedin.com/in/abigail-shlimenzon-a9ab762b5" },
    { name: "Mina Garcia", linkedin: "https://linkedin.com/in/mina-garcia-07a762242" },
    { name: "Mirabelle Trunk", linkedin: "https://linkedin.com/in/mirabelle-trunk" },
    { name: "Neakil David", linkedin: "https://www.linkedin.com/in/neakail-david-a09930288/" },
    { name: "Rahul Raman", linkedin: "https://linkedin.com/in/rahulraman23" },
    { name: "Varsha Reddy", linkedin: "https://linkedin.com/in/varshagreddy" },
  ],
  Marketing: [
    { name: "Akash Gupta-Verma", linkedin: "https://www.linkedin.com/in/akash-gupta-verma-956b97199/"},
    { name: "Anwesha Mohanty", linkedin: "https://linkedin.com/in/anweshamohantyy" },
    { name: "Emily Naka", linkedin: "https://linkedin.com/in/emilynaka" },
    { name: "Esha Warrier", linkedin: "https://linkedin.com/in/eshawarrier" },
    { name: "Filicia Wu", linkedin: "https://linkedin.com/in/filicia-wu" },
    { name: "Jacob Kang", linkedin: "https://www.linkedin.com/in/jacobkang2647/" },
    { name: "Nidhi Rajesh", linkedin: "https://linkedin.com/in/nidhi-rajesh-300645295" },
    { name: "Tanay Parikh", linkedin: "https://www.linkedin.com/in/tanayjparikh/" },
    { name: "Treesha Chhabria", linkedin: "https://linkedin.com/in/treesha-chhabria-1b2642362", photo: "treesha-chhabria" },
    { name: "Varnika Seth", linkedin: "https://linkedin.com/in/varnikaseth" },
    { name: "Vihan Shah", linkedin: "https://linkedin.com/in/vihanshah" },

  ],
  Finance: [
    { name: "Andrew Kim" },
    { name: "Dari Gansukh", linkedin: "https://linkedin.com/in/darigansukh" },
    { name: "Dylan Nelson", linkedin: "https://www.linkedin.com/in/dylan-nelson-3501471b2/", photo: "dylan-nelson"},
    { name: "Giulio Rambelli", linkedin: "https://linkedin.com/in/giuliorambelli" },
    { name: "Humza Dalal", linkedin: "https://linkedin.com/in/humza-dalal-b439b5280" },
    { name: "Jason Si", linkedin: "https://www.linkedin.com/in/jason-si-6bb3123a1/" },
    { name: "Rishit Bhandari", linkedin: "https://linkedin.com/in/rishit-bhandari-41a83647" },
    { name: "Solomon Whitlam-Sandler", linkedin: "https://www.linkedin.com/in/solomon-whitlam-sandler-a1a076396/" },
    { name: "Tanner Wan", linkedin: "https://linkedin.com/in/tannerwan" },
  ],
  "Human Resources": [
    { name: "Angela Chen", linkedin: "https://linkedin.com/in/angelacjq" },
    { name: "Anirudh Rajesh", linkedin: "https://linkedin.com/in/anirudhrajesh23" },
    { name: "Dayus Gohel", linkedin: "https://linkedin.com/in/dayus-gohel" },
    { name: "Garret Christie", linkedin: "https://www.linkedin.com/in/garret-christie-a68401209/" },
    { name: "Jackson Martson" },
    { name: "Molly Marchese", linkedin: "https://linkedin.com/in/mollymarchese" },
    { name: "Sabrina Zanetto", linkedin: "https://linkedin.com/in/sabrina-zanetto-565154345" },
    { name: "Shaaktiram Balakumar", linkedin: "https://www.linkedin.com/in/shaaktirambalakumar/" },
    { name: "Sumukhi Tunuguntla", linkedin: "https://www.linkedin.com/in/sumukhitunuguntla/" },
    { name: "Tanner Bradley", linkedin: "https://linkedin.com/in/tannerwilsonbradley" },
    { name: "Vivaan Laungani", linkedin: "https://linkedin.com/in/vivaanlaungani" },

  ],

  Technology: [
    { name: "Abhinav Chinnam", linkedin: "https://linkedin.com/in/abhinav-chinnam" },
    { name: "Aditya Mittal", linkedin: "https://www.linkedin.com/in/adityamittal1207/" },
    { name: "Arjan Gunsi", linkedin: "https://www.linkedin.com/in/arjan-gunsi/" },
    { name: "Chloe Suwignjo", linkedin: "https://www.linkedin.com/in/chloesuwignjo/"},
    { name: "Ishaan Garg", linkedin: "https://linkedin.com/in/ishaangarg06" },
    { name: "Ishaan Gowda", linkedin: "https://www.linkedin.com/in/ishaangowda/" },
    { name: "Koshik Kumaravel", linkedin: "https://www.linkedin.com/in/koshik-kumaravel/" },
    { name: "Maximilian Chao", linkedin: "https://linkedin.com/in/maximilian-chao-196a58246" },
    { name: "Niharika Sapre", linkedin: "https://linkedin.com/in/niharikasapre" },
    { name: "Nikhil Akiti", linkedin: "https://linkedin.com/in/nikhil-akiti" },
    { name: "Nikita Jain", linkedin: "https://linkedin.com/in/nikita-jain123" },
    { name: "Parth Mehta", linkedin: "https://linkedin.com/in/parth-mehta-0873a2217" },
    { name: "Sanmita Babu" },
    { name: "Serina Wang", linkedin: "https://linkedin.com/in/serina-wang-" },
    { name: "Sharana Sabesan", linkedin: "https://linkedin.com/in/sharana-sabesan-4bb0211b3" },
    { name: "Sruti Mani", linkedin: "https://linkedin.com/in/srutimani" },
  ],
};

/** Convert "Sharana Sabesan" → "sharana-sabesan" for headshot filenames */
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Headshots go in public/members/ — filename: {slug}.{ext}, matched against the manifest below. */
const MEMBERS_IMAGE_BASE = "/members";

/** Actual filename extension for each headshot on disk — avoids guessing and 404 retries. */
const PHOTO_MANIFEST: Record<string, string> = {
  "aarav-mittal": "jpg",
  "aashima-keswani": "png",
  "abhinav-chinnam": "jpeg",
  "abigail-losi": "jpeg",
  "abigail-shlimenzon": "jpg",
  "aditya-mittal": "jpg",
  "akash-gupta-verma": "jpg",
  "amelia-badamjav": "jpg",
  "andrew-kim": "jpeg",
  "angela-chen": "JPG",
  "anirudh-rajesh": "jpg",
  "anwesha-mohanty": "jpg",
  "anya-garg": "jpg",
  "arjan-gunsi": "jpg",
  "arushi-gupta": "jpg",
  "chloe-suwignjo": "png",
  "dari-gansukh": "JPG",
  "dayus-gohel": "jpg",
  "dylan-nelson": "jpg",
  "emily-naka": "jpeg",
  "esha-warrier": "jpeg",
  "eshwari-gundi": "jpeg",
  "filicia-wu": "jpg",
  "garret-christie": "jpg",
  "giulio-rambelli": "JPG",
  "humza-dalal": "jpg",
  "irina-vardapetyan": "jpg",
  "ishaan-garg": "jpg",
  "ishaan-gowda": "jpg",
  "jackson-martson": "jpg",
  "jacob-kang": "jpg",
  "jason-si": "jpg",
  "koshik-kumaravel": "jpg",
  "krish-agarwal": "jpg",
  "maximilian-chao": "JPG",
  "mina-garcia": "jpg",
  "mint-ruangritchai": "JPG",
  "mirabelle-trunk": "jpg",
  "molly-marchese": "jpeg",
  "natasha-dorairaj": "jpg",
  "neakil-david": "jpg",
  "nidhi-rajesh": "jpg",
  "niharika-sapre": "JPG",
  "nikhil-akiti": "png",
  "nikita-jain": "JPG",
  "parnika-gupta": "jpeg",
  "parth-mehta": "JPG",
  "pratibha-arun": "jpg",
  "rahul-raman": "jpg",
  "ridhi-raman": "jpg",
  "rishit-bhandari": "JPG",
  "sabrina-zanetto": "jpg",
  "sanmita-babu": "jpg",
  "serina-wang": "png",
  "shaaktiram-balakumar": "jpg",
  "sharana-sabesan": "jpg",
  "solomon-whitlam-sandler": "jpg",
  "sruti-mani": "jpeg",
  "sumukhi-tunuguntla": "jpg",
  "tanay-parikh": "jpg",
  "tanner-bradley": "png",
  "tanner-wan": "jpg",
  "treesha-chhabria": "jpg",
  "varnika-seth": "jpg",
  "varsha-reddy": "jpg",
  "veda-thota": "jpg",
  "vihan-shah": "jpeg",
  "vivaan-laungani": "jpg",
};

function MemberCard({
  name,
  committee,
  linkedin,
  title,
  photo,
}: {
  name: string;
  committee: string;
  linkedin?: string;
  title?: string;
  photo?: string;
}) {
  const slug = photo ?? nameToSlug(name);
  const ext = PHOTO_MANIFEST[slug];
  const [imgError, setImgError] = useState(!ext);
  const photoSrc = ext ? `${MEMBERS_IMAGE_BASE}/${slug}.${ext}` : "";
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const circleClass =
    "relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-[2rem] mx-auto mb-3 flex items-center justify-center overflow-hidden bg-white/10 object-cover ring-2 ring-transparent transition-all duration-300 group-hover:ring-brand/40 group-hover:shadow-lg group-hover:-translate-y-1";

  return (
    <div className="text-center group">
      <div className={circleClass}>
        {!imgError ? (
          <Image
            src={photoSrc}
            alt={name}
            fill
            sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
            className="object-cover transition-all duration-300 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-text-secondary font-semibold text-xl sm:text-2xl md:text-3xl">
            {initials || "?"}
          </span>
        )}
      </div>
      <h4 className="mb-1 font-medium text-foreground truncate px-1" title={name}>
        {name}
      </h4>
      <p className="text-text-muted text-sm mb-2">{title || committee}</p>
      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-brand hover:text-brand-light transition-colors"
          aria-label={`${name} LinkedIn`}
        >
          <Linkedin size={18} />
        </a>
      ) : (
        <span className="inline-flex items-center justify-center text-text-muted/30" aria-hidden="true">
          <Linkedin size={18} />
        </span>
      )}
    </div>
  );
}

type CommitteeKey = (typeof COMMITTEES)[number];

export default function About() {
  const [activeCommittee, setActiveCommittee] = useState<CommitteeKey>("Executive Board");

  return (
    <div className="w-full font-medium text-sm antialiased transition-all">
      {/* About Hero Section */}
      <section
        className="relative flex h-[50svh] min-h-96 items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="text-center text-white px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl tracking-wider mb-4 font-medium">
            ABOUT US
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            We are a team of students from diverse backgrounds, interests, and
            perspectives across all undergraduate years.
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
        <section className="relative py-16 px-8 bg-surface z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-4xl mb-6 font-medium text-foreground">Mission Statement</h2>
                <p className="text-text-secondary leading-relaxed text-lg mb-6">
                  To empower students with real-world business experience while
                  delivering high-quality professional services to our clients.
                </p>
                <Button
  asChild
  size="lg"
  className="!rounded-full px-8 py-3 text-sm md:text-base bg-brand hover:bg-brand-light text-brand-foreground font-medium"
>
  <Link href="/recruitment">Join Us</Link>
</Button>
              </div>
              <div className="w-[80%] mx-auto rounded-[1.75rem] bg-white/[0.03] ring-1 ring-white/10 p-2 shadow-xl shadow-black/20">
                <div className="relative w-full h-[320px] rounded-[calc(1.75rem-0.5rem)] overflow-hidden">
                  <Image
                    src={missionImage}
                    alt="Mission"
                    fill
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 75%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* About Content Section */}
        <section className="relative py-14 px-8 bg-surface z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-text-secondary leading-relaxed mb-8 text-lg font-normal">
              Lumnus Consulting is a student run consulting company operating out
              of the University of California, San Diego with support from the
              Rady School of Management and its professors. Founded in 2016, our
              organization is comprised of undergraduate students from a variety
              of backgrounds and majors, our team offers quality and innovative
              solutions.
            </p>
            <p className="text-text-secondary leading-relaxed text-lg font-normal">
              We are part of the global Junior Enterprise movement, which
              consists of 30,000 active members across two dozen countries.
              Junior Enterprise has partnered with a number of corporate
              companies, including Microsoft, McKinsey, and Kraft-Heinz to name a
              few.
            </p>
          </div>
        </section>

      {/* Our Members Section — committee selector + member grid */}
        <section className="relative py-14 px-8 bg-surface z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mb-12 font-medium text-foreground">
              Our Members
            </h2>

            {/* Committee tab / label list */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {COMMITTEES.map((committee) => (
                <button
                  key={committee}
                  onClick={() => setActiveCommittee(committee)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    activeCommittee === committee
                      ? "bg-brand text-brand-foreground"
                      : "bg-white/10 text-text-secondary hover:bg-white/15"
                  }`}
                >
                  {committee}
                </button>
              ))}
            </div>

            {/* Members for selected committee — 4 per row on desktop to match design */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {membersByCommittee[activeCommittee].map((member, index) => (
                <MemberCard
                  key={`${activeCommittee}-${index}`}
                  name={member.name}
                  committee={activeCommittee}
                  linkedin={member.linkedin}
                  title={member.title}
                  photo={member.photo}
                />
              ))}
            </div>
          </div>
        </section>

      {/* Where Alumni Work Section */}
        <section className="relative pb-20 px-8 bg-surface z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mb-10 font-medium text-foreground">
              Where Our Consultants Have Been
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={googleLogo}
                  alt="Google"
                  className="h-16 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={microsoftLogo}
                  alt="Microsoft"
                  className="h-16 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={adobeLogo}
                  alt="Adobe"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={capitalOneLogo}
                  alt="Capital One"
                  className="h-16 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={coinbaseLogo}
                  alt="Coinbase"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={bcgLogo}
                  alt="BCG"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={deloitteLogo}
                  alt="Deloitte"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={eyLogo}
                  alt="EY"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={jpMorganLogo}
                  alt="J.P. Morgan"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={paypalLogo}
                  alt="PayPal"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={serviceNowLogo}
                  alt="ServiceNow"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  loading="lazy"
                  src={boaLogo}
                  alt="Bank of America"
                  className="h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </section>

      {/* Behind the Scenes Section */}
        <section id="behind-the-scenes" className="relative py-16 px-8 bg-surface z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mb-12 font-medium text-foreground">
              Behind the Scenes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-[1.75rem] bg-white/[0.03] ring-1 ring-white/10 p-2 shadow-xl shadow-black/20">
                <div className="relative w-full h-64 md:h-80 rounded-[calc(1.75rem-0.5rem)] overflow-hidden">
                  <Image
                    src="/gallery/full-cohort-group.jpg"
                    alt="The full Lumnus intern cohort"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-white/[0.03] ring-1 ring-white/10 p-2 shadow-xl shadow-black/20">
                <div className="relative w-full h-64 md:h-80 rounded-[calc(1.75rem-0.5rem)] overflow-hidden">
                  <Image
                    src="/gallery/main-intern-class.jpg"
                    alt="Intern class outside Wells Fargo Hall"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-white/[0.03] ring-1 ring-white/10 p-2 shadow-xl shadow-black/20">
                <div className="relative w-full h-64 md:h-80 rounded-[calc(1.75rem-0.5rem)] overflow-hidden">
                  <Image
                    src="/gallery/palm-trio.jpg"
                    alt="Interns outside the Rady building"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

       
