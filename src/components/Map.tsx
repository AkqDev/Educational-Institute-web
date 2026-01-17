"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

/* ------------------ Dynamic Globe Import ------------------ */
const World = dynamic(
  () => import("../components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl" />
    ),
  }
);

/* ------------------ Component ------------------ */
const Map = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const leftInView = useInView(leftRef, { once: false, margin: "-120px" });
  const rightInView = useInView(rightRef, { once: false, margin: "-120px" });

  /* ------------------ Globe Config ------------------ */
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 24.8607, lng: 67.0011 },
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };

  const globalReach = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 51.5074, lng: -0.1278 },
    { lat: 48.8566, lng: 2.3522 },
    { lat: 35.6762, lng: 139.6503 },
    { lat: 1.3521, lng: 103.8198 },
  ];

  const arcs = globalReach.map((loc, i) => ({
    order: i + 1,
    startLat: globeConfig.initialPosition.lat,
    startLng: globeConfig.initialPosition.lng,
    endLat: loc.lat,
    endLng: loc.lng,
    arcAlt: 0.15,
    color: ["#06b6d4", "#3b82f6", "#6366f1"][i % 3],
  }));

  return (
    <section className="w-full py-16 md:py-18 bg-[#000]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ------------------ LEFT CONTENT ------------------ */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -60 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8 lg:pl-4 lg:pr-10"
          >
            <h1 className="text-[#0D76BC] text-3xl font-bold font-[poppins] text-center md:text-left">
              Global Learning Network
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mt-2 text-center md:text-left">
              We operate from a single official branch while serving students
              internationally through online education, global mentors, and
              digital collaboration.
            </p>
          </motion.div>

          {/* ------------------ GLOBE ------------------ */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 60 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <World data={arcs} globeConfig={globeConfig} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Map;
