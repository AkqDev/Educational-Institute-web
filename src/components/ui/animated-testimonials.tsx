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
    if (!autoplay) return;

    const interval = setInterval(() => {
      next();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval]);

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto", className)}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-start gap-12"
          >
            {/* Left side - Image with quote icon */}
            <div className="w-full lg:w-2/5">
              <div className="relative">
                <div className="absolute -top-6 -left-6 z-10">
                  <Quote className="h-12 w-12 text-[#0D76BC] opacity-50" />
                </div>
                <div className="relative h-64 lg:h-80 w-full overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={testimonials[currentIndex].src}
                    alt={testimonials[currentIndex].name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full lg:w-3/5 flex flex-col justify-between min-h-80">
              <div>
                <blockquote className="text-2xl lg:text-3xl text-gray-200 mb-8 leading-relaxed font-light">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-[#0D76BC]">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-lg text-white">
                    {testimonials[currentIndex].designation}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        index === currentIndex 
                          ? "bg-blue-600 w-8" 
                          : "bg-slate-300 w-2 hover:bg-slate-400"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={previous}
                    className="p-3 rounded-full bg-white shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5 text-black font-bold" />
                  </button>
                  
                  <button
                    onClick={next}
                    className="p-3 rounded-full bg-white shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5 text-black font-bold" />
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