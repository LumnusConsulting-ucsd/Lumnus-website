"use client";
import { FadeInOnScroll } from "./fade-scroll";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import type { CarouselApi } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const alumni = [
  {
    id: 1,
    name: "Mahavir Doshi",
    title: "Research Analyst",
    company: "Ishara Investments",
    quote:
      "I joined Lumnus Consulting in my freshman year where I gained an understanding of what consulting is while developing skills in networking, project management, and teamwork. Serving as President for two years allowed me to build meaningful leadership experience and play a role in shaping the organization’s growth. Lumnus had a lasting impact on my college experience both professionally and personally as I met some of my closest friends and found the stepping stones that helped me build and prepare for my career.",
    photo: "/Mahavir.png",
  },
  {
    id: 2,
    name: "Cariappa Kodira",
    title: "Asset Management Analyst",
    company: "J.P. Morgan",
    quote:
      "I was most surprised by the opportunity to take complete ownership of a client deliverable from start to finish. I first approached Lumnus like how I would a class or lecture, with limited opportunity to meaningfully apply what I had learned. But I really enjoyed being able to engage with clients, understand the product and their goals, and translate what I learned into tangible outcomes/progress for clients.",
    photo: "/Cariappa.png",
  },
  // {
  //   id: 3,
  //   name: "Alumni 3",
  //   title: "Software Engineer",
  //   company: "Coinbase",
  //   quote:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  //   photo: "/images/alumni/parth.png",
  // },
];

export function AlumniSpotlightSection() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
  }, [api]);

  return (
    <section
      className="relative py-20 px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/IMG_7327.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-center text-3xl md:text-4xl mb-12 text-white">
          Alumni Spotlight
        </h2>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true, watchDrag: false }}
            plugins={[Autoplay({ delay: 8000 })]}
            className="w-full"
          >
            <CarouselContent>
              {alumni.map((person) => (
                <CarouselItem key={person.id}>
                  <div className="px-4">
                    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-[360px] md:h-[440px] overflow-hidden">
                          {person.photo ? (
                            <img
                            src={person.photo}
                            alt={person.name}
                            className="block w-full h-full object-cover"
                            style={{
                              objectPosition:
                                person.name === "Cariappa Kodira" ? "50% 30%" : "50% 90%",
                              filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))",
                            }}
                          />
                              
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <User className="w-24 h-24 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="p-6 md:pl-4 md:pr-6 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-semibold">
                            {person.name}
                          </h3>
                          <p className="text-gray-600 mb-6 text-lg">
  {person.title} at <span className="font-semibold">{person.company}</span>
</p>
                        
                          <p className="text-gray-700 leading-relaxed italic">
                            "{person.quote}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous alumni"
            >
              <ChevronLeft className="w-6 h-6 text-blue-900" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next alumni"
            >
              <ChevronRight className="w-6 h-6 text-blue-900" />
            </button>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
