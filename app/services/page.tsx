"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Eye, BarChart3, Globe, ShoppingBag, Power, Phone, MessageSquare, Clock, ChevronDown } from 'lucide-react';
import { TestimonialsSection } from '../components/testimonials-section';

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());

  const toggleService = (index: number) => {
    setExpandedServices(prev => {
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
      icon: Eye,
      title: 'INDUSTRY RESEARCH',
      items: [
        'Risk Assessment',
        'Primary/Secondary Research',
        'Consumer Surveys',
        'Market Reports',
        'Industry Overviews'
      ]
    },
    {
      icon: BarChart3,
      title: 'BUSINESS DEVELOPMENT',
      items: [
        'Pricing Strategy',
        'Revenue Modeling',
        'Product Development',
        'Sales Strategy',
        'Cost Estimation Modeling'
      ]
    },
    {
      icon: Globe,
      title: 'BUSINESS STRATEGY',
      items: [
        'Business Model Development',
        'Go-to-Market Strategy',
        'Competitive Intelligence',
        'Growth Strategy'
      ]
    },
    {
      icon: ShoppingBag,
      title: 'SOCIAL MEDIA AND MARKETING',
      items: [
        'Brand Development',
        'Marketing Strategy',
        'Social Media Strategy',
        'Graphic Design'
      ]
    },
    {
      icon: Power,
      title: 'TECHNOLOGY',
      items: [
        'Data and Business Analytics',
        'Data Visualization',
        'Business Intelligence',
        'Data Strategy Development',
        'Website Development'
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative h-[40vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/Services-hero.JPEG')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl tracking-wider">
          OUR SERVICES
        </h1>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.slice(0, 3).map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedServices.has(index);
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <Icon size={40} className="text-blue-950" strokeWidth={1.5} />
                  </div>
                  
                  <button
                    onClick={() => toggleService(index)}
                    className="flex items-center gap-2 mb-6 tracking-wide text-gray-900 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <h3 className="text-gray-900">{service.title}</h3>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      {service.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-gray-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 max-w-4xl mx-auto">
            {services.slice(3).map((service, index) => {
              const actualIndex = index + 3;
              const Icon = service.icon;
              const isExpanded = expandedServices.has(actualIndex);
              return (
                <div key={actualIndex} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <Icon size={40} className="text-blue-950" strokeWidth={1.5} />
                  </div>
                  
                  <button
                    onClick={() => toggleService(actualIndex)}
                    className="flex items-center gap-2 mb-6 tracking-wide text-gray-900 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <h3 className="text-gray-900">{service.title}</h3>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      {service.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-gray-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-900 text-center text-3xl md:text-4xl mb-12 tracking-wider">
            PROJECT TIMELINE
          </h2>
          
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-blue-950" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center text-white z-10 mb-4">
                  1
                </div>
                <h3 className="text-gray-900 mb-2">Discovery & Planning</h3>
                <p className="text-gray-600 text-sm">
                  Initial consultation and project scope definition
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center text-white z-10 mb-4">
                  2
                </div>
                <h3 className="text-gray-900 mb-2">Research & Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Market research and data collection
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center text-white z-10 mb-4">
                  3
                </div>
                <h3 className="text-gray-900 mb-2">Strategy Development</h3>
                <p className="text-gray-600 text-sm">
                  Create actionable strategies and deliverables
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center text-white z-10 mb-4">
                  4
                </div>
                <h3 className="text-gray-900 mb-2">Implementation Support</h3>
                <p className="text-gray-600 text-sm">
                  Final delivery and implementation guidance
                </p>
              </div>
            </div>
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
      <section className="pt-24 pb-12 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto text-lg">
            Lumnus Consulting has worked with clients across a variety of industries. With the support of our diverse consultants and international network, we are dedicated to finding you the perfect team and delivering meaningful results.
          </p>
          
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 w-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <Phone size={48} className="text-blue-950" strokeWidth={1.5} />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Contact us and we will open up a dialogue with your company within a week to formulate a tentative plan.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <MessageSquare size={48} className="text-blue-950" strokeWidth={1.5} />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We will schedule a meeting to discuss our potential solution, as well as quotes.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <Clock size={48} className="text-blue-950" strokeWidth={1.5} />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We begin work, keeping you updated with weekly progress reports until our project is complete.
                </p>
              </div>
            </div>
            
            <Link 
              href="/contact"
              className="bg-blue-950 hover:bg-blue-900 text-white text-sm md:text-lg px-10 py-4 rounded-full font-medium transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Past Clients Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-gray-900 text-center text-3xl md:text-4xl mb-16">
            Past Clients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {pastClients.map((client) => (
              <div
                key={client}
                className="flex items-center justify-center py-8"
              >
                <div className="text-2xl font-bold text-gray-400">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}