"use client";

import { ArrowRight } from 'lucide-react';
import { ScrollFade } from '../components/ScrollFade';
import { useState } from 'react';
import { PhotoCollage } from '../components/PhotoCollage';

const pastProjects = [
  {
    id: 1,
    name: 'Ai-Master',
    industry: 'Technology',
    service: 'AI Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/project-ai.png',
  },
  {
    id: 2,
    name: 'Estin & Co',
    industry: 'Consulting',
    service: 'Business Strategy',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    logo: '/project-estin.png',
  },
  {
    id: 3,
    name: 'Dermala',
    industry: 'Healthcare',
    service: 'Digital Health',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    logo: '/project-dermala.png',
  },
  {
    id: 4,
    name: 'Medcrypt',
    industry: 'Cybersecurity',
    service: 'Medical Device Security',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    logo: '/project-med.png',
  },
  {
    id: 5,
    name: 'Relyfe',
    industry: 'Insurance',
    service: 'Digital Transformation',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    logo: '/project-ReLyfe.png',
  },
  {
    id: 6,
    name: 'Higi',
    industry: 'Health Technology',
    service: 'Consumer Engagement',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.',
    logo: '/project-higi.png',
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
