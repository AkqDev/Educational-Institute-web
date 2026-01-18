"use client";

import { useRef } from "react";
import { motion , useInView } from "framer-motion";
import type { Variants } from "framer-motion"
import { FaStar, FaLightbulb, FaBalanceScale, FaUsers, FaGraduationCap } from "react-icons/fa";

const Values = () => {
  const values = [
    {
      title: "E – Excellence Without Compromise",
      description: "We uphold the highest standards in education, delivery, and outcomes.",
      icon: <FaStar className="text-3xl text-[#0D76BC] mb-3 mx-auto" />
    },
    {
      title: "L – Leadership Through Learning",
      description: "We cultivate future leaders by inspiring bold thinking and action.",
      icon: <FaLightbulb className="text-3xl text-[#0D76BC] mb-3 mx-auto" />
    },
    {
      title: "I – Integrity in Every Action",
      description: "We lead with honesty, ethics, and unwavering responsibility.",
      icon: <FaBalanceScale className="text-3xl text-[#0D76BC] mb-3 mx-auto" />
    },
    {
      title: "T – Teamwork & Respect",
      description: "We grow together through unity, collaboration, and mutual respect.",
      icon: <FaUsers className="text-3xl text-[#0D76BC] mb-3 mx-auto" />
    },
    {
      title: "E – Empowerment Through Knowledge",
      description: "We enable individuals to unlock their potential and create real-world impact.",
      icon: <FaGraduationCap className="text-3xl text-[#0D76BC] mb-3 mx-auto" />
    },
  ];

  // Motion variants for cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, type: "spring", stiffness: 100 },
    }),
  };

  // Ref for in-view detection
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  return (
    <div className="w-full mx-auto py-20 px-4 max-w-[1200px]" ref={containerRef}>
      {/* Heading */}
      <motion.h1
        className="text-center text-3xl font-bold text-[#0D76BC] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        Core Values "Elite"
      </motion.h1>

      {/* Grid of values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {values.map((item, index) => {
          // Determine span for large screens
          let colSpan = "col-span-1";
          if (index === 0) colSpan = "lg:col-span-2";
          if (index === 1) colSpan = "lg:col-span-2 lg:col-start-3";
          if (index === 2) colSpan = "lg:col-span-2 lg:col-start-5";
          if (index === 3) colSpan = "lg:col-span-3 lg:col-start-1";
          if (index === 4) colSpan = "lg:col-span-3 lg:col-start-4";

          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`${colSpan} bg-[#202020] text-white p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer`}
            >
              {item.icon}
              <h2 className="text-xl font-semibold mb-2 text-white">{item.title}</h2>
              <p className="text-sm text-gray-200">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Values;
