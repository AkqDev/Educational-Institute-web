import React, { useState, useRef, useEffect } from "react";
import type { TouchEvent, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
  description?: string;
  note?: string;
}

interface Carousel3DProps {
  slides?: Slide[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const defaultSlides: Slide[] = [
    { image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb" },
    { image: "https://images.unsplash.com/photo-1635805737707-575885ab0820" },
    { image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623" },
    { image: "https://images.unsplash.com/photo-1534447677768-be436bb09401" },
    { image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176" }
  ];

  const displaySlides = slides.length ? slides : defaultSlides;

  const paginate = (dir: number) => {
    setCurrentIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = displaySlides.length - 1;
      if (next >= displaySlides.length) next = 0;
      return next;
    });
  };

  const getTransform = (index: number) => {
    const offset = index - currentIndex;

    if (offset === 0)
      return { x: "0%", scale: 1, opacity: 1, rotateY: 0, zIndex: 30 };

    if (offset === 1 || offset === -(displaySlides.length - 1))
      return { x: "55%", scale: 0.85, opacity: 0.7, rotateY: -25, zIndex: 20 };

    if (offset === -1 || offset === displaySlides.length - 1)
      return { x: "-55%", scale: 0.85, opacity: 0.7, rotateY: 25, zIndex: 20 };

    return { x: offset > 0 ? "120%" : "-120%", scale: 0.6, opacity: 0, rotateY: 45, zIndex: 10 };
  };

  const handleStart = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    dragStartX.current =
      "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleEnd = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStartX.current;
    if (Math.abs(diff) > 50) paginate(diff > 0 ? -1 : 1);
    setIsDragging(false);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div
      className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      {/* Heading with minimal spacing */}
      <div className="relative z-50 pt-20">
        <h1 className="text-center text-4xl text-[#0D76BC] font-[poppins] font-bold">
          Our Courses
        </h1>
      </div>
      
      {/* Carousel container with less padding top */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000 pt-12 md:pt-14">
        {displaySlides.map((slide, index) => {
          const t = getTransform(index);
          return (
            <motion.div
              key={index}
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ zIndex: t.zIndex }}
              animate={t}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-4 rounded-full"
      >
        <ChevronLeft color="white" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-4 rounded-full"
      >
        <ChevronRight color="white" />
      </button>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Carousel3D;