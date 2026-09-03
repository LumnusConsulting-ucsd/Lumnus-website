import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lumnus Consulting",
  description:
    "Get in touch with Lumnus Consulting to start a consulting engagement or ask a question about our services.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
