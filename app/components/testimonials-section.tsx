import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeInOnScroll } from "./fade-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';
import type { CarouselApi } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const describeLogo = '/describe-logo.png';

const testimonials: {
  id: number;
  quote: string;
  name: string;
  title: string;
  logo?: string;
}[] = [
  {
    id: 1,
    quote: "I'm very happy with the work Lumnus has done and the initiative from the project team. I get instant responses and work done within the same day. Very high-quality work and great results.",
    name: "Kishan Pansuria",
    title: "Co-Founder of Describe",
    // logo: describeLogo,
  },
  {
    id: 2,
    quote: "Working with Lumnus Consulting was a real pleasure! Their consultants are eager to learn and explore, and were always responsive to my requests and suggestions. We walked away with a better understanding of our customers, which is likely to have a real impact on how we deliver our precision biomonitoring services. We would be thrilled to work with Lumnus Consulting again.",
    name: "Representative",
    title: "Wild Genomics",
  },
];

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <FadeInOnScroll delayMs={100}>
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl mb-12 text-gray-900">
  Client Testimonials
</h2>

          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <div className="px-4">
                      <div className="bg-white p-12 rounded-3xl shadow-md">
                        <div className="mb-8">
                          <svg
                            className="w-12 h-12 text-gray-300 mb-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                          {testimonial.quote}
                        </p>

                        <div>
                          <p className="text-gray-900 mb-1">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {testimonial.title}
                          </p>

                          {testimonial.logo && (
                            <img
                              src={testimonial.logo}
                              alt={`${testimonial.name} Logo`}
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
                onClick={() => api?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={() => api?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </Carousel>
          </div>
        </div>
      </section>
    </FadeInOnScroll>
  );
}