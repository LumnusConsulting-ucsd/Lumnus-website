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
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    ["/about", "About"],
    ["/services", "Services"],
    ["/projects", "Projects"],
    ["/insights", "Insights"],
    ["/recruitment", "Recruitment"],
    ["/sponsor", "Sponsor"],
    ["/contact", "Contact"],
  ];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <div
          className={`w-max max-w-[calc(100%-1rem)] flex items-center gap-1 lg:gap-2 rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-background/85 shadow-lg shadow-black/20 px-3 py-2 lg:px-4 lg:py-2.5"
              : "bg-background/60 shadow-md shadow-black/10 px-3 py-2 lg:px-5 lg:py-3"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative shrink-0 hover:opacity-80 transition-opacity w-[92px] h-8 lg:w-[104px] lg:h-9 mr-1 lg:mr-2"
          >
            <Image
              src="/LumnusConsulting-logo.png"
              alt="Lumnus Consulting"
              fill
              sizes="104px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
            {navItems.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-300 ${
                  isActive(href)
                    ? "bg-white/10 text-foreground"
                    : "text-text-secondary hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center text-foreground shrink-0"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Menu
              className={`absolute transition-all duration-300 ${
                menuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
              size={22}
            />
            <X
              className={`absolute transition-all duration-300 ${
                menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
              size={22}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-3 px-6">
          {navItems.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-heading text-3xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive(href) ? "text-foreground" : "text-text-secondary hover:text-foreground"
              } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
