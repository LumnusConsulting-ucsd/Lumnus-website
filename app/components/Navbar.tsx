"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    ["/about", "ABOUT"],
    ["/services", "SERVICES"],
    ["/projects", "PROJECTS"],
    ["/insights", "INSIGHTS"],
    ["/recruitment", "RECRUITMENT"],
    ["/sponsor", "SPONSOR"],
    ["/contact", "CONTACT"],
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm border-b border-border-subtle"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`relative -ml-2 -mt-0 hover:opacity-80 transition-opacity w-[110px] md:w-[124px] transition-all duration-300 ${
            scrolled ? "h-9 md:h-10" : "h-11 md:h-12"
          }`}
        >
          <Image
            src="/LumnusConsulting-logo.png"
            alt="Lumnus Consulting"
            fill
            sizes="124px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-white text-sm md:text-base font-medium tracking-wide">
          {navItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`hover:opacity-80 transition-opacity relative
                after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                after:h-[2px] after:bg-surface after:transition-all after:duration-300
                hover:after:w-full
                ${isActive(href) ? "after:w-full" : "after:w-0"}
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="rounded-2xl bg-black/80 backdrop-blur-md px-6 py-5">
          <div className="flex flex-col gap-4 text-white text-sm font-medium tracking-wide">
            {navItems.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`transition-opacity hover:opacity-80 ${
                  isActive(href) ? "underline underline-offset-4" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}