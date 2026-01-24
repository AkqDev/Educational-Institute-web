"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

/* ------------------ Dynamic Globe Import ------------------ */
const World = dynamic(
  () => import("../components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-2xl bg-neutral-900" />
    ),
  }
);

/* ------------------ Component ------------------ */
const Map = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Run animation ONLY once
  const leftInView = useInView(leftRef, { once: true });
  const rightInView = useInView(rightRef, { once: true });

  // 🔹 Only Pakistan
  const allLocations = [{ lat: 24.8607, lng: 67.0011 }];

  return (
    <section className="w-full py-16 md:py-24 bg-[#000]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">

          {/* ------------------ LEFT CONTENT ------------------ */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 40 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6 md:space-y-8 lg:pl-4 lg:pr-10 order-2 lg:order-1"
          >
            <h1 className="text-[#0D76BC] text-2xl md:text-3xl font-bold font-[poppins] text-center md:text-left">
              Global Learning Network
            </h1>

            <p className="text-base md:text-lg text-gray-200 max-w-2xl mt-2 text-center md:text-left">
              We operate from a single official branch while serving students
              internationally through online education, global mentors, and
              digital collaboration. Our platform connects learners across
              50+ countries with industry experts in a borderless educational
              ecosystem.
            </p>
          </motion.div>

          {/* ------------------ GLOBE ------------------ */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 40 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full order-1 lg:order-2"
          >
            <div className="w-full h-[400px] md:h-[580px] rounded-2xl overflow-hidden shadow-2xl">
              {/* 🔹 Always render globe when in view */}
              {rightInView && (
                <World 
                  data={allLocations} 
                  globeConfig={{ 
                    pointSize: 0.1,
                    autoRotateSpeed: 0.003 
                  }} 
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Map;