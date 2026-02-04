"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import type { CarouselApi } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const alumni = [
  {
    id: 1,
    name: "Nicole Yegorina",
    title: "Senior Business Analyst",
    company: "Capital One",
    year: "Class of 2020",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/alumni/nicole.png",
  },
  {
    id: 2,
    name: "Divija Maitra",
    title: "Enterprise Product Manager",
    company: "Adobe",
    year: "Class of 2019",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    photo: "/images/alumni/divija.png",
  },
  {
    id: 3,
    name: "Parth Shah",
    title: "Software Engineer",
    company: "Coinbase",
    year: "Class of 2021",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    photo: "/images/alumni/parth.png",
  },
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
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/alumni-bg.png')",
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
                        <div className="relative h-80 md:h-96 flex items-center justify-center bg-white overflow-hidden">
                          {person.photo ? (
                            <img
                              src={person.photo}
                              alt={person.name}
                              className="w-[95%] h-[95%] object-contain"
                              style={{
                                filter:
                                  "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))",
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <User className="w-24 h-24 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="p-6 md:pl-4 md:pr-6 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl mb-3">
                            {person.name}
                          </h3>
                          <p className="text-gray-600 mb-2 text-lg">
                            {person.title}
                          </p>
                          <p className="text-blue-600 mb-6 text-lg">
                            {person.company}
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
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next alumni"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
