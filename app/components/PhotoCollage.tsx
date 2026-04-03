"use client";

import { useEffect, useState } from 'react';

const collageImages = [
  '/projects1.JPEG',
  '/projects2.JPEG',
  '/projects3.JPEG',
];

const parallaxSpeeds = [0.3, 0.5, 0.4];

export function PhotoCollage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="grid grid-cols-3 h-full w-full">
        {collageImages.map((src, i) => (
          <div
            key={src}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url('${src}')`,
              transform: `translateY(${scrollY * parallaxSpeeds[i]}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  );
}