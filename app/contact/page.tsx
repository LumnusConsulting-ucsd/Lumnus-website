import { Mail, MapPin, Globe, Facebook, Instagram, Linkedin } from 'lucide-react';
import heroImage from 'figma:asset/ae2d3b317876edf3dafcf49c4c5264ed7bf9896c.png';

export function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundAttachment: 'fixed',
        }}
      >
        <h1 className="text-white text-5xl md:text-6xl tracking-wider">
          GET IN TOUCH
        </h1>
      </section>

      {/* Contact Information and Stay Updated Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-32">
            {/* Contact Information */}
            <div className="flex justify-center md:justify-end md:pr-8">
              <div>
                <h2 className="text-2xl md:text-3xl mb-8 tracking-wider text-center">
                  Contact Information
                </h2>

                <div className="flex justify-center">
                  <div className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-900 flex-shrink-0" size={20} />
                      <a 
                        href="mailto:contact@lumnusconsulting.net" 
                        className="text-blue-900 hover:underline"
                      >
                        contact@lumnusconsulting.net
                      </a>
                    </div>

                    {/* Website */}
                    <div className="flex items-center gap-3">
                      <Globe className="text-blue-900 flex-shrink-0" size={20} />
                      <a 
                        href="https://lumnusconsulting.net" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-900 hover:underline"
                      >
                        lumnusconsulting.net
                      </a>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-gray-700">9500 Gilman Dr.</p>
                        <p className="text-gray-700">La Jolla, CA 92093</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Updated */}
            <div className="flex justify-center md:justify-start">
              <div>
                <h2 className="text-2xl md:text-3xl mb-8 tracking-wider text-center">
                  Stay Updated with Lumnus
                </h2>

                <div className="flex justify-center gap-8">
                  <a
                    href="https://www.facebook.com/lumnusconsulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
                  >
                    <div className="w-16 h-16 bg-blue-900 hover:bg-blue-950 rounded-full flex items-center justify-center transition-colors">
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
                    <div className="w-16 h-16 bg-blue-900 hover:bg-blue-950 rounded-full flex items-center justify-center transition-colors">
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
                    <div className="w-16 h-16 bg-blue-900 hover:bg-blue-950 rounded-full flex items-center justify-center transition-colors">
                      <Linkedin className="text-white" size={32} />
                    </div>
                    <span className="text-gray-700">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}