import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Recruitment() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex h-[50svh] min-h-96 items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/LumnusGroup.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl tracking-wider text-center px-4">
          FALL 2026 RECRUITMENT
        </h1>
      </section>

      {/* Interest Form Section */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-2xl mx-auto rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 p-2 shadow-xl shadow-black/20">
          <div className="text-center bg-surface-soft rounded-[calc(2rem-0.5rem)] p-10 md:p-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <h2 className="text-foreground text-3xl md:text-4xl mb-6 tracking-wider">
              Join Our Team
            </h2>
            <p className="text-text-secondary mb-10 max-w-2xl mx-auto">
              Recruitment will be starting Fall 2026. Fill out our interest form for <span className="text-foreground underline">Fall 2026 Recruitment</span> to learn more about opportunities and start your application.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdvqo5TfS14-LYCSvGX5HmuVMUBd70zS2a95IoFNtysw8MnzA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-light text-brand-foreground text-sm md:text-lg px-10 py-4 rounded-full font-medium transition-all hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
            >
              Interest Form
            </a>
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div>
            <h2 className="text-foreground text-2xl md:text-3xl mb-8 tracking-wider text-center">
  Stay Updated with Lumnus
</h2>

              <div className="flex justify-center gap-8">
                <a
                  href="https://www.facebook.com/lumnusconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-brand hover:bg-brand-light rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="text-brand-foreground" size={32} />
                  </div>
                  <span className="text-text-secondary">Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/lumnusconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-brand hover:bg-brand-light rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="text-brand-foreground" size={32} />
                  </div>
                  <span className="text-text-secondary">Instagram</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/lumnus/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-brand hover:bg-brand-light rounded-full flex items-center justify-center transition-colors">
                    <Linkedin className="text-brand-foreground" size={32} />
                  </div>
                  <span className="text-text-secondary">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
