import Image from "next/image";
import Link from "next/link";
import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative pt-12 pb-28 px-6 md:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/footer-hero.png')",
        backgroundSize: "105% auto",
        backgroundPosition: "90% 68%"
,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Side - Logo */}
        <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 -ml-2 -mt-4">
        <Image
        src="/LumnusConsulting-logo.png"
        alt="Lumnus Consulting"
        width={200}
        height={44}
        className="w-auto h-9 md:h-10"
        priority
      />
      </div>
        </div>

        {/* Right Side - Links and Social */}
        <div className="flex flex-col md:flex-row items-start md:items-start gap-12 -mt-3">
          {/* Students Column */}
          <div>
            <h3 className="text-white italic mb-4 text-base md:text-lg">
              <strong>Students</strong>
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/recruitment"
                className="text-white underline hover:opacity-80 transition-opacity text-sm md:text-base"
              >
                Apply
              </Link>
            </div>
          </div>

          {/* Companies Column */}
          <div>
            <h3 className="text-white italic mb-4 text-base md:text-lg">
              <strong>Companies</strong>
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/services"
                className="text-white underline hover:opacity-80 transition-opacity text-sm md:text-base"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-white underline hover:opacity-80 transition-opacity text-sm md:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          {/* Social Icons */}
<div className="flex items-center gap-4 mt-6 md:mt-0">
  <Link
    href="/contact"
    className="text-white hover:opacity-80 transition-opacity"
    aria-label="Contact"
  >
    <Mail size={24} />
  </Link>

  <a
    href="https://www.linkedin.com/company/lumnus/posts/?feedView=all"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:opacity-80 transition-opacity"
    aria-label="LinkedIn"
  >
    <Linkedin size={24} />
  </a>

  <a
    href="https://www.instagram.com/lumnusconsulting/?hl=en"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:opacity-80 transition-opacity"
    aria-label="Instagram"
  >
    <Instagram size={24} />
  </a>

  <a
    href="https://www.facebook.com/LumnusConsulting/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:opacity-80 transition-opacity"
    aria-label="Facebook"
  >
    <Facebook size={24} />
  </a>
</div>

        </div>
      </div>
    </footer>
  );
}
