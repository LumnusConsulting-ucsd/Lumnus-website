import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Lumnus Consulting",
    template: "%s",
  },
  description:
    "Lumnus Consulting is a student-run consulting organization at UC San Diego, delivering real-world strategy, research, and technology projects for clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}

