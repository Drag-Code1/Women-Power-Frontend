"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = ["/images/rangoli1.jpg"];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const startAutoPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(nextImage, 3000);
    }
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
     <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <section className="py-12 px-6 md:px-12 bg-white text-[#5C452B] font-sans">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Suave Rangoli <span className="text-[#7A5C3D]">by Namrta Gupta</span>
      </h2>

      <p className="text-center text-sm md:text-base text-[#5C452B]/80 mb-10 max-w-2xl mx-auto">
        “WOMAN EMPOWERING JOURNEY ~ Handcrafted with tradition and love.”
      </p>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        {/* Image */}
        <div
          className="relative w-full h-72 md:h-96 overflow-hidden rounded-xl"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <Image
            key={current}
            src={images[current]}
            alt={`Suave Rangoli ${current + 1}`}
            width={700}
            height={450}
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="text-center md:text-left space-y-4">
          <p className="text-sm md:text-base text-[#5C452B]/90 leading-relaxed">
            We promote Indian traditional art through decorative Kundan items,
            celebrating culture and craftsmanship with timeless beauty.
          </p>
          <p className="text-sm md:text-base text-[#5C452B]/90 leading-relaxed">
            Each piece is handcrafted with care, blending heritage and
            modernity. By choosing us, you beautify your spaces and support
            artisans who keep traditions alive.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
}
