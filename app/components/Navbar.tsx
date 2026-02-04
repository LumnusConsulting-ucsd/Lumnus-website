"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 -ml-10 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/LumnusConsulting-logo.png"   
            alt="Lumnus Consulting"
            width={140}
            height={44}
            className="h-10 md:h-11 w-auto"
            priority
          />
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8 text-white text-sm md:text-base font-medium tracking-wide">
          {[
            ["/about", "ABOUT"],
            ["/services", "SERVICES"],
            ["/projects", "PROJECTS"],
            ["/recruitment", "RECRUITMENT"],
            ["/donation", "SPONSOR"],
            ["/contact", "CONTACT"],
          ].map(([href, label]) => (
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
      </div>
    </nav>
  );
}
