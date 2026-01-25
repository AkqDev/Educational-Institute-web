// components/PhotoGallery.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Akbar from "../assets/Akbar.png";
import Event from "../assets/Event.png";
import Maaz from "../assets/Maaz.png";
import Umais from "../assets/Umais.png";
import Usman from "../assets/Usman.png";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, (animationDelay + 0.4) * 1000);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: { x: 0, y: 0, rotate: 0, scale: 1 },
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        delay: custom.order * 0.15,
      },
    }),
  };

  const photos = [
    { id: 1, order: 0, x: "-320px", y: "15px", zIndex: 50, direction: "left" as Direction, src: Usman },
    { id: 2, order: 1, x: "-160px", y: "32px", zIndex: 40, direction: "left" as Direction, src: Umais },
    { id: 3, order: 2, x: "0px", y: "8px", zIndex: 30, direction: "right" as Direction, src: Event },
    { id: 4, order: 3, x: "160px", y: "22px", zIndex: 20, direction: "right" as Direction, src: Akbar },
    { id: 5, order: 4, x: "320px", y: "44px", zIndex: 10, direction: "left" as Direction, src: Maaz },
  ];

  const photoSize = 220;

  return (
    <div className="relative py-8 px-4 bg-[#000]">
      <h1 className="text-4xl text-[#0D76BC] font-[poppins] font-bold text-center mb-3">
        Our Events
      </h1>

      <p className="mx-auto max-w-3xl text-center text-base text-gray-300 leading-relaxed px-4">
        Celebrating excellence, dedication, and achievement — our Award Events honor
        outstanding students, faculty, and innovators who have made a meaningful
        impact through creativity, leadership, and academic brilliance.
      </p>

      <div className="relative flex items-center justify-center overflow-hidden h-[350px]">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div
              className="relative"
              style={{ height: photoSize, width: photoSize }}
            >
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{
                    zIndex: photo.zIndex,
                    width: photoSize,
                    height: photoSize,
                  }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={photoSize}
                    height={photoSize}
                    src={photo.src}
                    alt={`Photo ${photo.id}`}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

type Direction = "left" | "right";

interface PhotoProps {
  src: string;
  alt: string;
  direction?: Direction;
  width: number;
  height: number;
}

const MotionImage = motion.img;

const Photo = ({ src, alt, direction, width, height }: PhotoProps) => {
  const [rotation, setRotation] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const randomRotation =
      (Math.random() * 3 + 1) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  return (
    <motion.div
      drag
      whileHover={{ scale: 1.1, zIndex: 9999 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      animate={{ rotate: rotation }}
      style={{ width, height }}
      className="relative cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg">
        {/* IMAGE */}
        <MotionImage
          src={src}
          alt={alt}
          className="h-full w-full object-cover rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setIsImageLoaded(true)}
          draggable={false}
        />

        {/* ✅ BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none" />

        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-3xl">
            <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
