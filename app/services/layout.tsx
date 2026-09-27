import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Lumnus Consulting",
  description:
    "Industry research, business development, business strategy, marketing, and technology consulting delivered by Lumnus Consulting's student teams.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
