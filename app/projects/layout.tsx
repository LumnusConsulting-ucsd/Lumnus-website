import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Projects | Lumnus Consulting",
  description:
    "Case studies from Lumnus Consulting's client engagements — strategy, technology, and marketing projects delivered by UC San Diego student consultants.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
