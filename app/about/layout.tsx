import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Lumnus Consulting",
  description:
    "Meet the UC San Diego students behind Lumnus Consulting — our mission, our committees, and the companies where our alumni now work.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
