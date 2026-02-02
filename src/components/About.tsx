"use client";

import vision from "../assets/vision.png";
import mission from "../assets/mission.png";
import { motion, useInView, easeInOut, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useEffect } from "react";
import { scrollTriggerAnimation } from '../lib/gsap';

/* ------------------ Animation Variants ------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }, // ✅ replaced string with Framer Motion easing
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeInOut }, // ✅ added easing function
  },
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, {
    margin: "-120px",
    once: false,
  });

  useEffect(() => {
    // Add stagger animation to mission and vision sections
    if (missionRef.current && visionRef.current) {
      scrollTriggerAnimation(missionRef.current, 'fadeInLeft');
      scrollTriggerAnimation(visionRef.current, 'fadeInRight');
    }
  }, []);

  return (
    <div className="w-full bg-black py-16 md:py-20 px-4">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1000px] mx-auto space-y-16 md:space-y-20"
      >

        {/* ================= Mission ================= */}
        <div ref={missionRef} className="flex flex-col md:flex-row items-center gap-8 md:gap-12 backdrop-blur-xl py-6 opacity-0">
          
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={mission}
              alt="Mission"
              className="w-[260px] md:w-[340px] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left px-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block mb-5">
              Our Mission
              <span className="absolute left-0 -bottom-2 w-full h-[3px]
                bg-gradient-to-r from-sky-400 to-blue-600 rounded-full" />
            </h2>

            <p className="text-gray-200 text-lg leading-relaxed">
              To transform job seekers into job creators and empower the youth of
              Pakistan with high-demand IT skills that create independence,
              ignite innovation, and spread digital knowledge to every corner
              of the nation.
            </p>
          </div>
        </div>

        {/* ================= Vision ================= */}
        <div ref={visionRef} className="flex flex-col-reverse md:flex-row items-center gap-8 backdrop-blur-xl py-6 opacity-0">
          
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left px-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block mb-5">
              Our Vision
              <span className="absolute left-0 -bottom-2 w-full h-[3px]
                bg-gradient-to-r from-sky-400 to-blue-600 rounded-full" />
            </h2>

            <p className="text-gray-200 text-lg leading-relaxed">
              To lead a digital revolution by creating elite IT leaders —
              empowered by knowledge, driven by integrity, and united for
              national and global impact.
            </p>
          </div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={vision}
              alt="Vision"
              className="w-[260px] md:w-[340px] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default About;
