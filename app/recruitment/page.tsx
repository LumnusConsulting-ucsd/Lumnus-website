import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { ScrollFade } from '../components/ScrollFade';

export default function Recruitment() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/LumnusGroup.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl tracking-wider text-center px-4">
          SPRING 2026 RECRUITMENT
        </h1>
      </section>

      {/* Interest Form Section */}
      <ScrollFade>
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-gray-900 text-3xl md:text-4xl mb-8 tracking-wider">
  Join Our Team
</h2>
          <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
            We're looking for passionate students to join Lumnus Consulting. Fill out our interest form for <span className="underline">Spring 2026 Recruitment</span> to learn more about opportunities and start your application.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdvqo5TfS14-LYCSvGX5HmuVMUBd70zS2a95IoFNtysw8MnzA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-950 hover:bg-blue-900 text-white text-sm md:text-lg px-10 py-4 rounded-full font-medium transition-colors"
          >
            Interest Form
          </a>
        </div>
      </section>
      </ScrollFade>

      {/* Stay Updated Section */}
      <ScrollFade>
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div>
            <h2 className="text-gray-900 text-2xl md:text-3xl mb-8 tracking-wider text-center">
  Stay Updated with Lumnus
</h2>

              <div className="flex justify-center gap-8">
                <a
                  href="https://www.facebook.com/lumnusconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="text-white" size={32} />
                  </div>
                  <span className="text-gray-700">Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/lumnusconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="text-white" size={32} />
                  </div>
                  <span className="text-gray-700">Instagram</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/lumnus-consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <div className="w-16 h-16 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                    <Linkedin className="text-white" size={32} />
                  </div>
                  <span className="text-gray-700">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollFade>
    </>
  );
}