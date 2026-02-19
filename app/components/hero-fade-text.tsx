"use client";

import { useEffect, useState } from "react";

export function HeroFadeText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  return (
    <div
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.96]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
