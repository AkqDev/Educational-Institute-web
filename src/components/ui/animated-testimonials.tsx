"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "../../lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  autoplayInterval = 4000,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previous = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!autoplay || !isLoaded) return;

    const interval = setInterval(() => {
      next();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isLoaded]);

  // Optimize image URLs for mobile
  const getOptimizedImageUrl = (url: string) => {
    // This is a simple optimization - in production, you should use a proper image CDN
    // or image optimization service
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      // For Unsplash images, you can add parameters to optimize size
      return url.replace(/w=\d+/, 'w=800').replace(/h=\d+/, 'h=600');
    }
    
    // For desktop, still optimize but keep larger
    return url.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=800');
  };

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto", className)}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Reduced duration for better performance
            className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
          >
            {/* Left side - Image with quote icon */}
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 z-10">
                  <Quote className="h-8 w-8 lg:h-12 lg:w-12 text-[#0D76BC] opacity-50" />
                </div>
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-90 w-full overflow-hidden rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl">
                  <img
                    src={getOptimizedImageUrl(testimonials[currentIndex].src)}
                    alt={testimonials[currentIndex].name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full lg:w-3/5 flex flex-col justify-between min-h-64 lg:min-h-80">
              <div>
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 lg:mb-8 leading-relaxed font-light">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="border-l-4 border-blue-500 pl-4 lg:pl-6 py-1 lg:py-2">
                  <h3 className="text-lg lg:text-xl font-bold text-[#0D76BC]">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-base lg:text-lg text-white">
                    {testimonials[currentIndex].designation}
                  </p>
                </div>
              </div>
              {/* Navigation */}
<div className="flex flex-row flex-wrap items-center justify-between gap-2 mt-6 lg:mt-8">
  {/* Dots */}
  <div className="flex space-x-2">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={cn(
          "h-2 rounded-full transition-all duration-200",
          index === currentIndex
            ? "bg-blue-600 w-6 sm:w-8"
            : "bg-slate-300 w-2 hover:bg-slate-400"
        )}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>

  {/* Prev/Next buttons */}
  <div className="flex space-x-3">
    <button
      onClick={previous}
      className="p-2 lg:p-3 rounded-full bg-white shadow-sm hover:bg-gray-100 active:scale-95 transition-transform duration-150"
      aria-label="Previous testimonial"
    >
      <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5 text-black font-bold" />
    </button>

    <button
      onClick={next}
      className="p-2 lg:p-3 rounded-full bg-white shadow-sm hover:bg-gray-100 active:scale-95 transition-transform duration-150"
      aria-label="Next testimonial"
    >
      <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-black font-bold" />
    </button>
  </div>
</div>


              </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};