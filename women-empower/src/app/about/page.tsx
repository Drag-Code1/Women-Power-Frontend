'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const images = [
  '/images/rangoli1.jpg',

  
];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Start autoplay
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay; // Cleanup on unmount
  }, []);

  const startAutoPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(nextImage, 2000); // 2 seconds
    }
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <section className="py-10 px-6 md:px-20 bg-white text-[#5C452B] font-sans">
      <h2 className="text-3xl font-bold text-center mb-12">
        Suave Rangoli – Handcrafted by Namrta Gupta
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        
        {/* Image Carousel (Left) */}
        <div
          ref={carouselRef}
          className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <Image
            key={current}
            src={images[current]}
            alt={`Suave Rangoli ${current + 1}`}
            width={800}
            height={500}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>

        {/* Description (Right) */}
        <div className="bg-[#f7f7f7] rounded-2xl p-8 shadow-md text-center md:text-left leading-relaxed max-w-4xl mx-auto">
          <p className="relative inline-block text-[#5C452B] font-semibold text-lg mb-6 pb-3">
            <span>“SUAVE RANGOLI ~ Handcrafted by Namrta Gupta.”</span>
            <span
  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
  style={{ width: '30%', backgroundColor: '#fdc700' }}
/>

          </p>

          <p>
            We founded this venture to promote Indian traditional art through decorative Kundan items,
            creating an exceptional aura. This art, integral to Indian culture, is renowned for its
            meticulous work with precious stones.
            <br /><br />
            Our mission is to preserve and promote this heritage, bringing it into modern homes with a
            contemporary touch. Each piece is handcrafted by skilled artisans, ensuring uniqueness and high
            quality. By incorporating our products, you beautify your spaces and support local artisans,
            keeping an ancient tradition alive.
          </p>
        </div>

      </div>
    </section>
  );
}
