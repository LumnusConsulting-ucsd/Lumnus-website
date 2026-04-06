'use client';

import { ArrowRight, Download, X } from 'lucide-react';
import { useState } from 'react';
import { FadeInOnScroll } from '../components/fade-scroll';

const heroImage = "/insights.JPG";

const insights = [
  {
    id: 1,
    name: 'AI In Education',
    description:
      "An in-depth look at how AI is transforming education through Professor Burt De Mill's innovative teaching methods at UC San Diego's Rady School of Business.",
    logo: undefined,
    pdfUrl: '/AIEducationWP.pdf',
    hasFullContent: true,
  },
  {
    id: 2,
    name: 'Covid-19 Financial Guide',
    description:
      "A closer look at how COVID-19 reshaped the financial landscape for small businesses in San Diego, and the resources available to support recovery and resilience.",
    pdfUrl: '/ConsumerWP.pdf',
  },
  {
    id: 3,
    name: 'Consumer and Commercial Shifts',
    description:
      'How the pandemic changed consumer behavior and innovation, offering businesses a framework to adapt through informed analysis and recommendations.',
    logo: undefined,
    pdfUrl: '/financialguideWP.pdf',
  },
];

export default function Insights() {
  const [expandedInsights, setExpandedInsights] = useState<Set<number>>(new Set());
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  const toggleInsight = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const insight = insights.find((i) => i.id === id);
    if (insight?.hasFullContent) {
      setSelectedInsight(id);
      return;
    }

    setExpandedInsights((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const closeModal = () => {
    setSelectedInsight(null);
  };

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[40vh] px-8 overflow-hidden flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-white text-4xl md:text-5xl tracking-wider">
            INSIGHTS
          </h2>
        </div>
      </section>

      <FadeInOnScroll>
        <section className="bg-white py-16 px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.map((insight) => {
                const isExpanded = expandedInsights.has(insight.id);

                return (
                  <div
                    key={insight.id}
                    className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group aspect-square"
                    onClick={(e) => {
                      if (isExpanded) {
                        toggleInsight(insight.id, e);
                      }
                    }}
                  >
                    <div className="flex flex-col h-full items-center justify-between">
                      {!isExpanded && insight.logo && (
                        <div className="mb-6 flex items-center justify-center h-24 w-full">
                          <img
                            src={insight.logo}
                            alt={insight.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}

                      {!isExpanded && !insight.logo && (
                        <div className="mb-4 flex flex-col items-center justify-center w-full">
                          <h3 className="text-gray-800 text-xl mb-3">{insight.name}</h3>
                          {insight.description && (
                            <p className="text-gray-600 text-sm text-center line-clamp-3">
                              {insight.description}
                            </p>
                          )}
                        </div>
                      )}

                      {isExpanded && (
                        <p className="text-gray-600 text-sm mb-6 flex-grow text-center">
                          {insight.description}
                        </p>
                      )}

                      {!isExpanded && (
                        <div className="flex justify-center w-full mt-auto">
                          <a
                            href={insight.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-950 hover:text-blue-900 transition-colors group-hover:translate-x-1 transform transition-transform"
                            >
            <span className="mr-2">Read Insight</span>
                    <ArrowRight className="w-4 h-4" />
                    </a>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="flex justify-center w-full mt-4">
                          <a
                            href={insight.pdfUrl}
                            download
                            className="flex items-center text-blue-950 hover:text-blue-900 transition-colors group-hover:translate-x-1 transform transition-transform"
                          >
                            <span className="mr-2">Download PDF</span>
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {selectedInsight !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="sticky top-4 float-right mr-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              <img
                src={heroImage}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}