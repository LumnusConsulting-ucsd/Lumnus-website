"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useState } from "react";

export type Member = {
  name: string;
  title: string;
  departments: string[];
  photo: string;
  linkedin: string;
};

const BOARD = "Executive Board";

/** Board tab keeps the order in members.json; department tabs are alphabetical. */
function membersFor(members: Member[], dept: string) {
  const list = members.filter((m) => m.departments.includes(dept));
  return dept === BOARD ? list : [...list].sort((a, b) => a.name.localeCompare(b.name));
}

function initials(name: string) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function MemberCard({ m, dept }: { m: Member; dept: string }) {
  const [broken, setBroken] = useState(!m.photo);
  return (
    <li className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-t-soft ring-1 ring-t-line">
        {broken ? (
          <span className="absolute inset-0 grid place-items-center text-4xl font-semibold text-t-muted">
            {initials(m.name)}
          </span>
        ) : (
          <Image
            src={m.photo}
            alt={m.name}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
            // Headshots in /team/ are already small WebP files; serve them as-is.
            unoptimized={m.photo.startsWith("/team/")}
            className="object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight text-t-fg">{m.name}</h3>
          <p className="mt-0.5 text-sm text-t-muted">{m.title || dept}</p>
        </div>
        {m.linkedin && (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} on LinkedIn`}
            className="-mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-t-muted transition-colors hover:bg-t-soft hover:text-t-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <Linkedin size={17} />
          </a>
        )}
      </div>
    </li>
  );
}

export function MembersSection({ members, departments }: { members: Member[]; departments: string[] }) {
  const [active, setActive] = useState(BOARD);
  const list = membersFor(members, active);

  return (
    <div>
      {/* Tabs scroll sideways on narrow screens instead of wrapping into a tall block */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <div role="tablist" aria-label="Departments" className="mx-auto flex w-max gap-2">
          {departments.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={active === d}
              onClick={() => setActive(d)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                active === d
                  ? "bg-t-fg text-t-bg"
                  : "bg-t-card text-t-fg ring-1 ring-t-line hover:bg-t-soft"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <ul
        role="tabpanel"
        aria-label={active}
        className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
      >
        {list.map((m) => (
          <MemberCard key={`${active}-${m.name}`} m={m} dept={active} />
        ))}
      </ul>
    </div>
  );
}
