'use client';

import { ArrowRight } from 'lucide-react';

const heroImage = "/insights.JPG";

const insights = [
  {
    id: 1,
    name: 'AI In Education',
    description:
      "An in-depth look at how AI is transforming education through Professor Burt De Mill's innovative teaching methods at UC San Diego's Rady School of Business.",
    pdfUrl: '/AIEducationWP.pdf',
  },
  {
    id: 2,
    name: 'Covid-19 Financial Guide',
    description:
      "A closer look at how COVID-19 reshaped the financial landscape for small businesses in San Diego, and the resources available to support recovery and resilience.",
    pdfUrl: '/financialguideWP.pdf',
  },
  {
    id: 3,
    name: 'Consumer and Commercial Shifts',
    description:
      'How the pandemic changed consumer behavior and innovation, offering businesses a framework to adapt through informed analysis and recommendations.',
    pdfUrl: '/ConsumerWP.pdf',
  },
];

export default function Insights() {
  return (
    <div>
      <section
        className="relative flex h-[40svh] min-h-88 items-center justify-center overflow-hidden bg-cover px-8"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center 62%'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-white text-4xl md:text-5xl tracking-wider">
            INSIGHTS
          </h2>
        </div>
      </section>

      <section className="bg-surface pt-24 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="bg-surface border border-border-subtle rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow group min-h-[260px]"
              >
                <div className="flex flex-col h-full items-center justify-between">
                  <div className="mt-2 mb-4 flex flex-col items-center justify-center w-full">
                    <h3 className="text-foreground text-xl mb-3">{insight.name}</h3>
                    <p className="text-text-secondary text-[15px] text-center line-clamp-4 mt-1">
                      {insight.description}
                    </p>
                  </div>

                  <div className="flex justify-center w-full mt-auto">
                    <a
                      href={insight.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-brand hover:text-brand-light transition-colors group-hover:translate-x-1 transform transition-transform"
                    >
                      <span className="mr-2">Read Insight</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
