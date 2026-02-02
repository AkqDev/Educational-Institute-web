"use client";
import herovideo from '../assets/herovideo.mp4';
import { useEffect, useRef } from 'react';
import navtc from "../assets/navtc.png";
import youth from "../assets/youth.png";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AuroraBackground from './AuroraBackground';
import { fadeInUp, textReveal, scaleIn, floatingAnimation } from '../lib/gsap';

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // GSAP animations
      // Animate title with text reveal effect
      if (titleRef.current) {
        textReveal(titleRef.current, 0.2);
      }
      
      // Animate subtitle and description
      if (subtitleRef.current) {
        fadeInUp(subtitleRef.current, 0.4);
      }
      
      if (descriptionRef.current) {
        fadeInUp(descriptionRef.current, 0.6);
      }
      
      // Animate button with scale effect
      if (buttonRef.current) {
        scaleIn(buttonRef.current, 0.8);
      }
      
      // Animate badge
      if (badgeRef.current) {
        fadeInUp(badgeRef.current, 1.0);
      }
      
      // Add floating animation to logos
      if (logoRef.current) {
        setTimeout(() => {
          floatingAnimation(logoRef.current!);
        }, 1500);
      }
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, damping: 15, stiffness: 200, delay: 0.5 }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, damping: 15, stiffness: 100, delay: 0.7 }
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "923701393075";
    const message = encodeURIComponent(
      "Hello! I am interested in enrolling in your IT courses. Please provide me more details."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[100vh] flex items-center justify-center px-4 font-poppins relative overflow-hidden"
    >
      {/* ---------------- Backgrounds ---------------- */}
      {/* AuroraBackground only on md+ screens */}
      <div className="hidden md:block absolute inset-0 z-0">
        <AuroraBackground
          speed={0.7}
          blend={0.8}
          colorStops={['#0D76BC', '#1E90FF', '#0D76BC']}
          amplitude={1.2}
        />
      </div>

{/* Mobile video background */}
<div className="block md:hidden absolute inset-0 z-0">
  <video
    src={herovideo}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-[90vh] object-cover"
    // <-- Add this line to slow down the video
    onLoadedMetadata={(e) => {
      const video = e.currentTarget;
      video.playbackRate = 0.7; // 0.7x speed, adjust as needed
    }}
  />
  <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
</div>


      {/* ---------------- Foreground Content ---------------- */}
      <div className="relative container mx-auto z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex items-center justify-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="text-white w-auto md:max-w-4xl relative z-20"
          >
            <motion.h1
              ref={titleRef}
              variants={itemVariants}
              className="text-3xl md:text-6xl font-bold leading-tight opacity-0"
            >
              Become Top{" "}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" as const, damping: 15, stiffness: 200, delay: 0.2 }}
                className="text-cyan-400 inline-block"
              >
                1%
              </motion.span>{" "}
              in the IT Fields
            </motion.h1>

            <motion.p
              ref={subtitleRef}
              variants={itemVariants}
              className="mt-6 text-lg lg:text-[18px] text-gray-200 opacity-0"
            >
              Join Pakistan&apos;s Elite IT Training Institute, Building World
              Class IT Professionals
            </motion.p>

            <motion.p
              ref={descriptionRef}
              variants={itemVariants}
              className="mt-4 text-base lg:text-[16px] text-gray-300 leading-relaxed opacity-0"
            >
              Learn from experienced industry mentors, gain hands-on exposure
              through real-world projects, and master cutting-edge technologies.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10"
            >
              <motion.button
                ref={buttonRef}
                onClick={handleWhatsApp}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-[#0D76BC] text-white px-10 py-4 w-full md:w-[350px] rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl z-20 opacity-0 transform-gpu"
              >
                Enroll Now
              </motion.button>

              <motion.div
                ref={badgeRef}
                variants={badgeVariants}
                whileHover={{ scale: 1.05 }}
                className="border border-gray-100/10 rounded-2xl p-5 flex flex-row items-center gap-4 backdrop-blur-md shadow-xl bg-black/30 z-20 opacity-0"
              >
                <div ref={logoRef} className="flex flex-row items-center gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 400 }}
                    src={navtc}
                    alt="NAVTTC"
                    className="w-24 h-auto"
                  />
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 400 }}
                    src={youth}
                    alt="Youth Program"
                    className="w-24 h-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
