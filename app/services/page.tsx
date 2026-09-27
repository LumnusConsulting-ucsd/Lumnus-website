"use client"
import { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { TestimonialsSection } from '../components/testimonials-section';

export default function Services() {
  const [flippedServices, setFlippedServices] = useState<Set<number>>(new Set());

  const toggleService = (index: number) => {
    setFlippedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const pastClients = [
    'ASL FLurry',
    'Automind',
    'BRG Energies',
    'Describe',
    'Digital Pool',
    'Estin & Co',
    'Elit Group',
    'Marnova',
    'MedCrypt',
    'MyGrow',
    'NanoMood',
    'Nara Financial Literacy',
    'Papillon Theraputics',
    "Skill Tree",
    "Wild Genomics",
    "ZeroN"
  ];

  const services = [
    {
      title: 'Industry Research',
      summary: 'Market sizing, risk assessment, and consumer insights.',
      items: [
        'Risk Assessment',
        'Primary/Secondary Research',
        'Consumer Surveys',
        'Market Reports',
        'Industry Overviews'
      ]
    },
    {
      title: 'Business Development',
      summary: 'Pricing, revenue modeling, and go-to-market execution.',
      items: [
        'Pricing Strategy',
        'Revenue Modeling',
        'Product Development',
        'Sales Strategy',
        'Cost Estimation Modeling'
      ]
    },
    {
      title: 'Business Strategy',
      summary: 'Business models, competitive intelligence, and growth planning.',
      items: [
        'Business Model Development',
        'Go-to-Market Strategy',
        'Competitive Intelligence',
        'Growth Strategy'
      ]
    },
    {
      title: 'Social Media & Marketing',
      summary: 'Brand development and marketing strategy.',
      items: [
        'Brand Development',
        'Marketing Strategy',
        'Social Media Strategy',
        'Graphic Design'
      ]
    },
    {
      title: 'Technology',
      summary: 'Data analytics, visualization, and website development.',
      items: [
        'Data and Business Analytics',
        'Data Visualization',
        'Business Intelligence',
        'Data Strategy Development',
        'Website Development'
      ]
    }
  ];

  const process = [
    {
      text: 'Contact us and we will open up a dialogue with your company within a week to formulate a tentative plan.',
    },
    {
      text: 'We will schedule a meeting to discuss our potential solution, as well as quotes.',
    },
    {
      text: 'We begin work, keeping you updated with weekly progress reports until our project is complete.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[55svh] min-h-88 flex items-end"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.75)), url('/Services-hero.JPEG')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 67%",
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-8 pb-14">
          <p className="text-brand-light text-sm tracking-[0.3em] mb-4">WHAT WE DO</p>
          <h1 className="text-white text-4xl md:text-6xl tracking-tight max-w-2xl">
            Our Services
          </h1>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-foreground text-center text-3xl md:text-4xl mb-12 tracking-wider">
            PROJECT TIMELINE
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-brand" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-brand-foreground z-10 mb-4">
                  1
                </div>
                <h3 className="text-foreground mb-2">Discovery & Planning</h3>
                <p className="text-text-secondary text-sm">
                  Initial consultation and project scope definition
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-brand-foreground z-10 mb-4">
                  2
                </div>
                <h3 className="text-foreground mb-2">Research & Analysis</h3>
                <p className="text-text-secondary text-sm">
                  Market research and data collection
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-brand-foreground z-10 mb-4">
                  3
                </div>
                <h3 className="text-foreground mb-2">Strategy Development</h3>
                <p className="text-text-secondary text-sm">
                  Create actionable strategies and deliverables
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-brand-foreground z-10 mb-4">
                  4
                </div>
                <h3 className="text-foreground mb-2">Implementation Support</h3>
                <p className="text-text-secondary text-sm">
                  Final delivery and implementation guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Flip Card Grid */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const isFlipped = flippedServices.has(index);
              return (
                <div key={index} className="h-72 [perspective:1000px]">
                  <button
                    type="button"
                    onClick={() => toggleService(index)}
                    aria-pressed={isFlipped}
                    aria-label={`${service.title}: ${isFlipped ? "showing details, click to flip back" : "click to see details"}`}
                    className={`relative block w-full h-full text-left cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/60 rounded-xl ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Front Face */}
                    <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col justify-between bg-surface-soft border border-border-subtle rounded-xl p-8 hover:border-brand/30 hover:bg-white/[0.05] transition-colors duration-300">
                      <div>
                        <span className="text-brand-light/60 text-sm font-semibold tracking-widest tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-foreground text-lg md:text-xl mt-3 mb-3 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary text-sm">{service.summary}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-brand-light">
                        <RefreshCw size={13} /> Click to flip
                      </span>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between rounded-xl p-8 border border-border-subtle"
                      style={{ backgroundColor: "#0f1c32" }}
                    >
                      <div className="flex flex-col gap-2">
                        {service.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-text-secondary text-sm">
                            {item}
                          </p>
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-brand-light">
                        <RotateCcw size={13} /> Flip back
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section
        className="relative py-32 px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Services-image2.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl tracking-wider mb-8">
            WORK WITH US
          </h2>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="pt-14 pb-12 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-text-secondary leading-relaxed mb-16 max-w-3xl mx-auto text-lg">
            Lumnus Consulting has worked with clients across a variety of industries. With the support of our diverse consultants and international network, we are dedicated to finding you the perfect team and delivering meaningful results.
          </p>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 w-full">
              {process.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <span className="text-brand-light/70 text-3xl font-semibold tabular-nums mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-text-secondary leading-relaxed max-w-xs">{step.text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-light text-brand-foreground text-sm md:text-lg px-10 py-4 rounded-full font-medium transition-all hover:scale-[1.03] hover:shadow-lg inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Past Clients Section */}
      <section className="pt-6 pb-16 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-foreground text-center text-3xl md:text-4xl mb-10">
            Past Clients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pastClients.map((client, index) => (
              <div
                key={client}
                className={`flex items-center justify-center text-center py-8 px-4 rounded-xl border border-border-subtle transition-all duration-300 hover:border-brand/40 ${
                  index % 2 === 0 ? "bg-surface-soft" : "bg-white/[0.03]"
                }`}
              >
                <div className="text-lg font-semibold text-text-secondary">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
