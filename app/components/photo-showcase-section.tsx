"use client";

import { useRef } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const PHOTOS = [
  "/gallery/full-cohort-group.jpg",
  "/gallery/main-intern-class.jpg",
  "/gallery/palm-trio.jpg",
  "/videos/staircase-poster.jpg",
  "/videos/walking-laughing-poster.jpg",
  "/LumnusGroup.JPG",
];

export function PhotoShowcaseSection() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  );

  return (
      <section className="py-16 md:py-20 px-6 md:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-foreground text-center text-2xl md:text-3xl mb-10 tracking-wide">
            Cohort Memories
          </h2>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {PHOTOS.map((src) => (
                <CarouselItem key={src} className="basis-2/3 sm:basis-1/2 md:basis-1/3">
                  <div className="px-2">
                    <div className="relative w-full aspect-[4/3] rounded-2xl shadow-lg border border-border-subtle overflow-hidden">
                      <Image
                        src={src}
                        alt="Lumnus Consulting cohort"
                        fill
                        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 66vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
  );
}
