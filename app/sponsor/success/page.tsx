import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Thank You | Lumnus Consulting",
  description: "Thank you for sponsoring Lumnus Consulting.",
};

export default function SponsorSuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 text-center bg-surface">
      <div className="max-w-lg">
        <CheckCircle2 className="w-16 h-16 text-brand mx-auto mb-6" strokeWidth={1.5} />
        <h1 className="text-foreground text-3xl md:text-4xl mb-4">Thank You</h1>
        <p className="text-text-secondary mb-10">
          Your contribution helps shape the future of Lumnus Consulting. A confirmation
          and tax receipt have been sent to your email.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand hover:bg-brand-light text-brand-foreground px-8 py-3 rounded-full font-medium transition-all hover:scale-[1.03] hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
