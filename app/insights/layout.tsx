import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Lumnus Consulting",
  description:
    "Research and insight reports published by Lumnus Consulting's student consultants on education, consumer behavior, and market trends.",
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
