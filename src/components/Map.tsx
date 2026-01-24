"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

/* ------------------ Dynamic Globe Import ------------------ */
const World = dynamic(
  () => import("../components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full animate-pulse rounded-2xl bg-neutral-900" />
    ),
  }
);

/* ------------------ Component ------------------ */
const Map = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Run animation ONLY once (important for mobile)
  const leftInView = useInView(leftRef, { once: true, margin: "-120px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-120px" });

  // 🔹 Detect mobile - fixed useEffect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------ Globe Config ------------------ */
  const globeConfig = {
    pointSize: 0.1,
    autoRotateSpeed: isMobile ? 0 : 0.005,
    devicePixelRatio: isMobile ? 1 : 2,
  };

  // 🔹 Only Pakistan
  const allLocations = [{ lat: 24.8607, lng: 67.0011 }];

  return (
    <section className="w-full py-16 md:py-24 bg-[#000]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ------------------ LEFT CONTENT ------------------ */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 60 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8 lg:pl-4 lg:pr-10 order-2 lg:order-1"
          >
            <h1 className="text-[#0D76BC] text-3xl font-bold font-[poppins] text-center md:text-left">
              Global Learning Network
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl mt-2 text-center md:text-left">
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
            initial={{ opacity: 0, y: 60 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full order-1 lg:order-2"
          >
            <div className="w-full h-[300px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              {/* 🔹 Render globe ONLY when visible */}
              {rightInView && (
                <World data={allLocations} globeConfig={globeConfig} />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Map;