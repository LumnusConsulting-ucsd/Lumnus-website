import Image from "next/image";
import Link from "next/link";
import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative pt-8 pb-24 px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/footer-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Side - Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/LumnusConsulting-logo.png"
            alt="Lumnus Consulting"
            width={220}
            height={48}
          />
        </div>

        {/* Right Side - Links and Social */}
        <div className="flex flex-col md:flex-row items-start md:items-start gap-12">
          {/* Students Column */}
          <div>
            <h3 className="text-white italic mb-3">
              <strong>Students</strong>
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/recruitment"
                className="text-white underline hover:opacity-80 transition-opacity text-sm"
              >
                Apply
              </Link>
            </div>
          </div>

          {/* Companies Column */}
          <div>
            <h3 className="text-white italic mb-3">
              <strong>Companies</strong>
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/services"
                className="text-white underline hover:opacity-80 transition-opacity text-sm"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-white underline hover:opacity-80 transition-opacity text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
