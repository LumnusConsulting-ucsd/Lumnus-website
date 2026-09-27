"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import type { CarouselApi } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const describeLogo = "/describe-logo.png";

const testimonials: {
  id: number;
  quote: string;
  name: string;
  title: string;
  logo?: string;
}[] = [
  {
    id: 1,
    quote:
      "I'm very happy with the work Lumnus has done and the initiative from the project team. I get instant responses and work done within the same day. Very high-quality work and great results.",
    name: "Kishan Pansuria",
    title: "Co-Founder of Describe",
    // logo: describeLogo,
  },
  {
    id: 2,
    quote:
      "Working with Lumnus Consulting was a real pleasure! Their consultants are eager to learn and explore, and were always responsive to my requests and suggestions. We walked away with a better understanding of our customers, which is likely to have a real impact on how we deliver our precision biomonitoring services. We would be thrilled to work with Lumnus Consulting again.",
    name: "Representative",
    title: "Wild Genomics",
  },
];

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  const handlePrev = () => {
    autoplay.current.stop();
    api?.scrollPrev();
  };

  const handleNext = () => {
    autoplay.current.stop();
    api?.scrollNext();
  };

  return (
      <section className="pt-14 pb-8 px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl mb-6 text-foreground">
            Client Testimonials
          </h2>

          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <div className="px-4">
                      <div className="bg-surface p-12 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-8">
                          <svg
                            className="w-12 h-12 text-white/20 mb-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        <p className="text-text-secondary text-lg mb-8 leading-relaxed italic">
                          {testimonial.quote}
                        </p>

                        <div>
                          <p className="text-foreground mb-1">
                            {testimonial.name}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {testimonial.title}
                          </p>

                          {testimonial.logo && (
                            <img
                              src={testimonial.logo}
                              alt={`${testimonial.name} Logo`}
                              loading="lazy"
                              className="w-10 h-10 mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-surface rounded-full p-3 shadow-lg hover:bg-brand hover:scale-110 transition-all z-10 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-text-secondary group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-surface rounded-full p-3 shadow-lg hover:bg-brand hover:scale-110 transition-all z-10 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-text-secondary group-hover:text-white transition-colors" />
              </button>
            </Carousel>
          </div>
        </div>
      </section>
  );
}