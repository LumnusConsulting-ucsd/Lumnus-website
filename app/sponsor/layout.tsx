import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor | Lumnus Consulting",
  description:
    "Support Lumnus Consulting's mission to develop the next generation of student consultants through a one-time or monthly contribution.",
};

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
