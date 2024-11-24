'use client';

import React, { useState } from "react";
import Image from "next/image";
import { TestimonialProps } from '../data/cardTestimony';

type TestimonialCarouselProps = {
  testimonials: TestimonialProps[];
};

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of testimonials to show at once
  const totalTestimonials = testimonials.length;

  // Handle dot click to change the current index
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate displayed testimonials with wrap-around logic
  const displayedTestimonials = [
    ...testimonials.slice(currentIndex, currentIndex + itemsToShow), // Get testimonials starting from currentIndex
    ...testimonials.slice(0, Math.max(0, (currentIndex + itemsToShow) - totalTestimonials)), // Wrap-around logic for the remaining items
  ];

  return (
    <div className="relative">
      {/* Carousel testimonials */}
      <div className="flex gap-4 pb-4 overflow-x-auto scroll-smooth transition-transform duration-500 ease-in-out">
        {displayedTestimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex-none w-[calc(33.33%-1rem)] bg-white rounded-lg shadow-lg p-4 border text-sm"
          >
            <p className="text-justify text-gray-800">{testimonial.text}</p>
            <div
              className="flex justify-end items-center gap-2 font-bold text-lg mt-4"
              style={{ color: "var(--synbio-green)" }}
            >
              <p>{testimonial.author}</p>
              <Image
                src={testimonial.avatarSrc}
                alt={`${testimonial.author}'s avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation indicators */}
      <div className="absolute bottom+1 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({ length: Math.ceil(totalTestimonials / itemsToShow) }).map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === idx
                ? 'bg-gray-400'
                : 'bg-gray-300'
            }`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
