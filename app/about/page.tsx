"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { FadeInOnScroll } from "../components/fade-scroll";
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
    { name: "Vihan Shah", linkedin: "https://linkedin.com/in/vihanshah", title: "Director of Internal Operations"},

  ],
  Sales: [
    { name: "Aashima Keswani", linkedin: "https://linkedin.com/in/aashima-keswani" },
    { name: "Amelia Badamjav", linkedin: "https://linkedin.com/in/amelia-badamjav-a11617314" },
    { name: "Arushi Gupta", linkedin: "https://linkedin.com/in/argupta5" },
    { name: "Eshwari Gundi", linkedin: "https://linkedin.com/in/eshwari-gundi-a61480229" },
    { name: "Veda Thota", linkedin: "https://linkedin.com/in/veda-thota" },
  ],
  External: [
    { name: "Abigail Losi", linkedin: "https://linkedin.com/in/abigail-losi-56b883346" },
    { name: "Abigail Shlimenzon", linkedin: "https://linkedin.com/in/abigail-shlimenzon-a9ab762b5" },
    { name: "Mina Garcia", linkedin: "https://linkedin.com/in/mina-garcia-07a762242" },
    { name: "Mirabelle Trunk", linkedin: "https://linkedin.com/in/mirabelle-trunk" },
    { name: "Rahul Raman", linkedin: "https://linkedin.com/in/rahulraman23" },
    { name: "Varsha Reddy", linkedin: "https://linkedin.com/in/varshagreddy" },
  ],
  Marketing: [
    { name: "Anwesha Mohanty", linkedin: "https://linkedin.com/in/anweshamohantyy" },
    { name: "Emily Naka", linkedin: "https://linkedin.com/in/emilynaka" },
    { name: "Esha Warrier", linkedin: "https://linkedin.com/in/eshawarrier" },
    { name: "Filicia Wu", linkedin: "https://linkedin.com/in/filicia-wu" },
    { name: "Nidhi Rajesh", linkedin: "https://linkedin.com/in/nidhi-rajesh-300645295" },
    { name: "Tanay Parikh", linkedin: "https://www.linkedin.com/in/tanayjparikh/" },
    { name: "Treesha Chhabria", linkedin: "https://linkedin.com/in/treesha-chhabria-1b2642362", photo: "treesha-chhabria" },
    { name: "Varnika Seth", linkedin: "https://linkedin.com/in/varnikaseth" },
    { name: "Vihan Shah", linkedin: "https://linkedin.com/in/vihanshah" },

  ],
  Finance: [
    { name: "Andrew Kim" },
    { name: "Dari Gansukh", linkedin: "https://linkedin.com/in/darigansukh" },
    { name: "Giulio Rambelli", linkedin: "https://linkedin.com/in/giuliorambelli" },
    { name: "Humza Dalal", linkedin: "https://linkedin.com/in/humza-dalal-b439b5280" },
    { name: "Rishit Bhandari", linkedin: "https://linkedin.com/in/rishit-bhandari-41a83647" },
    { name: "Tanner Wan", linkedin: "https://linkedin.com/in/tannerwan" },
  ],
  "Human Resources": [
    { name: "Angela Chen", linkedin: "https://linkedin.com/in/angelacjq" },
    { name: "Anirudh Rajesh", linkedin: "https://linkedin.com/in/anirudhrajesh23" },
    { name: "Dayus Gohel", linkedin: "https://linkedin.com/in/dayus-gohel" },
    { name: "Molly Marchese", linkedin: "https://linkedin.com/in/mollymarchese" },
    { name: "Sabrina Zanetto", linkedin: "https://linkedin.com/in/sabrina-zanetto-565154345" },
    { name: "Sumukhi Tunuguntla", linkedin: "https://www.linkedin.com/in/sumukhitunuguntla/" },
    { name: "Tanner Bradley", linkedin: "https://linkedin.com/in/tannerwilsonbradley" },
    { name: "Vivaan Laungani", linkedin: "https://linkedin.com/in/vivaanlaungani" },
    
  ],

  Technology: [
    { name: "Abhinav Chinnam", linkedin: "https://linkedin.com/in/abhinav-chinnam" },
    { name: "Ishaan Garg", linkedin: "https://linkedin.com/in/ishaangarg06" },
    { name: "Maximilian Chao", linkedin: "https://linkedin.com/in/maximilian-chao-196a58246" },
    { name: "Niharika Sapre", linkedin: "https://linkedin.com/in/niharikasapre" },
    { name: "Nikhil Akiti", linkedin: "https://linkedin.com/in/nikhil-akiti" },
    { name: "Nikita Jain", linkedin: "https://linkedin.com/in/nikita-jain123" },
    { name: "Parth Mehta", linkedin: "https://linkedin.com/in/parth-mehta-0873a2217" },
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

/** Headshots go in public/members/ — filename: {slug}.jpg (e.g. sharana-sabesan.jpg) */
const MEMBERS_IMAGE_BASE = "/members";

const PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".JPG", ".png"];

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
  const [imgError, setImgError] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const slug = photo ?? nameToSlug(name);
  const photoSrc = `${MEMBERS_IMAGE_BASE}/${slug}${PHOTO_EXTENSIONS[srcIndex]}`;
  const tryNextExtension = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Only handle error for the src we're currently trying (avoids stale onError from a previous attempt)
    const failedSrc = (e.currentTarget as HTMLImageElement).src;
    if (!failedSrc.endsWith(slug + PHOTO_EXTENSIONS[srcIndex])) return;
    if (srcIndex + 1 < PHOTO_EXTENSIONS.length) {
      setSrcIndex((i) => i + 1);
      setImgError(false);
    } else {
      setImgError(true);
    }
  };
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const circleClass =
    "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden bg-gray-200 object-cover";

  return (
    <div className="text-center">
      <div className={circleClass}>
        {!imgError ? (
          <img
            src={photoSrc}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => tryNextExtension(e)}
          />
        ) : (
          <span className="text-gray-600 font-semibold text-xl sm:text-2xl md:text-3xl">
            {initials || "?"}
          </span>
        )}
      </div>
      <h4 className="mb-1 font-medium text-gray-800 truncate px-1" title={name}>
        {name}
      </h4>
      <p className="text-gray-500 text-sm mb-2">{title || committee}</p>
      <a
        href={linkedin || "#"}
        target={linkedin ? "_blank" : undefined}
        rel={linkedin ? "noopener noreferrer" : undefined}
        className="inline-flex items-center justify-center text-blue-950 hover:text-blue-900 transition-colors"
        aria-label={`${name} LinkedIn`}
      >
        <Linkedin size={18} />
      </a>
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
        className="relative h-[50vh] flex items-center justify-center"
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
      <FadeInOnScroll>
        <section className="relative py-16 px-8 bg-white z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-4xl mb-6 font-medium text-black">Mission Statement</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  To empower students with real-world business experience while
                  delivering high-quality professional services to our clients.
                </p>
                <Button
  asChild
  size="lg"
  className="!rounded-full px-8 py-3 text-sm md:text-base bg-blue-950 hover:bg-blue-900 font-medium"
>
  <Link href="/recruitment">Join Us</Link>
</Button>
              </div>
              <div>
                <img
                  src={missionImage}
                  alt="Mission"
                  className="w-[80%] h-[340px] mx-auto rounded-lg shadow-lg object-cover"
                  style={{ objectPosition: 'center 75%' }}
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* About Content Section */}
      <FadeInOnScroll>
        <section className="relative py-24 px-8 bg-gray-100 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-normal">
              Lumnus Consulting is a student run consulting company operating out
              of the University of California, San Diego with support from the
              Rady School of Management and its professors. Founded in 2016, our
              organization is comprised of undergraduate students from a variety
              of backgrounds and majors, our team offers quality and innovative
              solutions.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg font-normal">
              We are part of the global Junior Enterprise movement, which
              consists of 30,000 active members across two dozen countries.
              Junior Enterprise has partnered with a number of corporate
              companies, including Microsoft, McKinsey, and Kraft-Heinz to name a
              few.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Our Members Section — committee selector + member grid */}
      <FadeInOnScroll>
        <section className="relative py-24 px-8 bg-white z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mb-12 font-medium text-black">
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
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
      </FadeInOnScroll>

      {/* Where Alumni Work Section */}
      <FadeInOnScroll>
        <section className="relative pb-20 px-8 bg-white z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mb-10 font-medium text-black">
              Where Our Consultants Have Been
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex items-center justify-center py-8">
                <img
                  src={googleLogo}
                  alt="Google"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={microsoftLogo}
                  alt="Microsoft"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={adobeLogo}
                  alt="Adobe"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={capitalOneLogo}
                  alt="Capital One"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={coinbaseLogo}
                  alt="Coinbase"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={bcgLogo}
                  alt="BCG"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={deloitteLogo}
                  alt="Deloitte"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={eyLogo}
                  alt="EY"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={jpMorganLogo}
                  alt="J.P. Morgan"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={paypalLogo}
                  alt="PayPal"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={serviceNowLogo}
                  alt="ServiceNow"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center py-8">
                <img
                  src={boaLogo}
                  alt="Bank of America"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}

       
