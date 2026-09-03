import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Lumnus Consulting",
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 text-center">
      <div>
        <p className="text-text-muted tracking-[0.3em] text-sm mb-4">ERROR 404</p>
        <h1 className="text-foreground text-4xl md:text-6xl mb-6">Page not found</h1>
        <p className="text-text-secondary max-w-md mx-auto mb-10">
          The page you’re looking for doesn’t exist or may have moved.
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
