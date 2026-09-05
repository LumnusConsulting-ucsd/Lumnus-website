"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 -ml-2 -mt-0 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/LumnusConsulting-logo.png"
            alt="Lumnus Consulting"
            width={220}
            height={48}
            className="h-10 w-auto sm:h-11 xl:h-12"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-5 text-sm font-medium tracking-wide text-white xl:flex 2xl:gap-8 2xl:text-base">
          {navItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`hover:opacity-80 transition-opacity relative
                after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                after:h-[2px] after:bg-white after:transition-all after:duration-300
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
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 rounded-md p-2 text-white xl:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 rounded-2xl bg-black/80 px-6 py-5 backdrop-blur-md xl:hidden">
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
      )}
    </nav>
  );
}
