"use client";

import { ArrowRight } from 'lucide-react';
import { ScrollFade } from '../components/ScrollFade';
import { useState } from 'react';
import { PhotoCollage } from '../components/PhotoCollage';

const pastProjects = [
  {
    id: 1,
    name: 'ASL Flurry',
    industry: 'Technology',
    service: 'Internal Operations',
    description: 'Lumnus Consulting optimized the internal operations of ASL Flurry, a digital language learning enterprise, to improve organizational efficiency and consistency. The project involved a complete reorganization of the company’s Google Drive infrastructure and the development of a comprehensive Standard Operating Procedure (SOP) manual. These deliverables provided the client with a scalable framework for managing internal processes and digital assets during their long-term growth.',
    logo: '/aslflurry.jpeg',
  },
  {
    id: 2,
    name: 'Estin & Co',
    industry: 'Consulting',
    service: 'Business Strategy',
    description: 'Lumnus Consulting conducted a comprehensive four-week market research engagement to analyze the U.S. radar feedback sign industry for Estin & Co and their end client. The project successfully quantified market size, identified procurement trends, and gathered qualitative insights through primary interviews with buyer segments and procurement officers. This collaboration delivered actionable data on annual purchases and key market players to inform the client’s strategic growth initiatives.',
    logo: '/project-estin.png',
  },
  {
    id: 3,
    name: 'Digital Pool',
    industry: 'Online Gaming',
    service: 'Marketing Strategy',
    description: "Lumnus Consulting developed a comprehensive marketing strategy for Digital Pool to enhance their brand coherence and optimize user growth. The project involved identifying a Unique Selling Point and creating detailed customer personas through extensive competitor research and channel analysis. This pro bono engagement culminated in a set of strategic recommendations designed to streamline the platform's social media presence and attract a larger community of billiards enthusiasts and professionals.",
    logo: '/digitalpool1.png',
  },
  {
    id: 4,
    name: 'Medcrypt',
    industry: 'Cybersecurity',
    service: 'Medical Device Security',
    description: 'Lumnus Consulting executed a targeted reputation assessment for Medcrypt by surveying top medical device manufacturers to gauge industry standing and brand perception. The team deployed specialized surveys to leading OEMs and maintained consistent monitoring of responses to ensure high-quality data collection. This engagement provided Medcrypt with essential insights into their market reputation, facilitating a data-driven approach to their proactive healthcare security services.',
    logo: '/project-med.png',
  },
  {
    id: 5,
    name: 'Wild Genomics',
    industry: 'Product Market',
    service: 'Product Market Fit Analysis',
    description: 'Lumnus Consulting conducted an eight-week product-market fit analysis for Wild Genomics to support the development of their precision pest monitoring technology. The engagement involved comprehensive secondary research into the pest identification and mitigation market alongside the creation of targeted surveys to validate customer needs. Through this pro bono collaboration, the team provided actionable insights to help the startup refine its strategy for reducing pesticide usage through early infestation detection.',
    logo: '/WildGenomics_Logo.png',
  },
  {
    id: 6,
    name: 'Marnova',
    industry: 'Marine Technology',
    service: 'Consumer Engagement',
    description: 'Lumnus Consulting performed an in-depth industry research study for Marnova to evaluate the feasibility of innovations in fishery enhancement, sargassum mitigation, and carbon removal. The team analyzed existing global projects and market trends to establish cost benchmarks and identify key competitive advantages within the marine restoration sector. This pro bono engagement provided the client with a strategic assessment of industry precedents to guide their sustainability-focused environmental initiatives.',
    logo: '/marnova-logo1.webp',
  }
];

export default function Projects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProject = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Past Projects Hero */}
      <section className="relative h-[40vh] px-8 overflow-hidden flex items-center justify-center">
        <PhotoCollage />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-white text-4xl md:text-5xl tracking-wider">
            PAST PROJECTS
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <ScrollFade>
        <section className="bg-white py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastProjects.map((project) => {
                const isExpanded = expandedProjects.has(project.id);

                return (
                  <div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={(e) => {
                      if (isExpanded) {
                        toggleProject(project.id, e);
                      }
                    }}
                  >
                    <div className="flex flex-col h-full items-center">
                      {!isExpanded && project.logo && (
                        <div className="mb-6 flex items-center justify-center h-24 w-full">
                          <img
                            src={project.logo}
                            alt={project.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}

                      {!isExpanded && !project.logo && (
                        <div className="mb-6 flex items-center justify-center h-24 w-full">
                          <h3 className="text-gray-800 text-xl">{project.name}</h3>
                        </div>
                      )}

                      {isExpanded && (
                        <p className="text-gray-600 text-sm mb-6 flex-grow text-center">
                          {project.description}
                        </p>
                      )}

                      {!isExpanded && (
                        <div className="flex justify-center w-full">
                          <button
                            onClick={(e) => toggleProject(project.id, e)}
                            className="flex items-center text-blue-950 hover:text-blue-900 transition-colors group-hover:translate-x-1 transform transition-transform"
                          >
                            <span className="mr-2">Learn More</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollFade>
    </div>
  );
}
