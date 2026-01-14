import { useEffect } from 'react';
import navtc from "../assets/navtc.png";
import youth from "../assets/youth.png";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const programs = [
  "AI Agents",
  "AI Engineering",
  "AI Systems",
  "Vibe Coding",
  "AI UGC",
  "AI Production",
  "AI Generalist",
];

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 400,
      },
    },
    tap: { scale: 0.95 },
  } as const;

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.7,
      },
    },
  } as const;

  const carouselVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        delay: 0.4,
      },
    },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen pt-30 bg-cover bg-center bg-no-repeat bg-black flex items-center justify-center px-4 font-poppins"
    >
      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* LEFT CONTENT */}
          <motion.div variants={itemVariants} className="text-white max-w-[400px] md:max-w-2xl text-center lg:text-left">
            <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-bold leading-tight px-4">
              Become Top{" "}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                className="text-cyan-400 inline-block"
              >
                1%
              </motion.span>{" "}
              in the IT Fields
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg lg:text-[18px] text-gray-200 px-5">
              Join Pakistan&apos;s Elite IT Training Institute, Building World Class IT Professionals
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-center justify-center lg:justify-between mt-10">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-[#0D76BC] text-white px-10 py-4 w-[350px] rounded-full font-semibold text-lg transition shadow-xl"
              >
                Enroll Now
              </motion.button>

              <motion.div
                variants={badgeVariants}
                whileHover={{ scale: 1.05 }}
                className="border border-gray-100/10 rounded-2xl p-5 flex gap-6 backdrop-blur-md shadow-xl"
              >
                <motion.img src={navtc} alt="NAVTTC" className="w-25 h-auto" />
                <motion.img src={youth} alt="Youth Program" className="w-25 h-auto" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE – SWIPER */}
          <motion.div variants={carouselVariants} className="w-full lg:w-[360px]">
            {/* Mobile */}
            <div className="block lg:hidden">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides
                freeMode
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3000}
                loop
              >
                {programs.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="py-4 px-6 text-center text-gray-200 rounded-2xl border border-white/20 backdrop-blur-md">
                      {item}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <Swiper
                modules={[Autoplay]}
                direction="vertical"
                spaceBetween={6}
                slidesPerView={4.5}
                autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
                speed={4000}
                loop
                className="h-[450px]"
              >
                {[...programs, ...programs].map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-[80px] flex items-center justify-center rounded-2xl border border-cyan-500/20 backdrop-blur-md text-gray-200 font-bold font-[poppins]">
                      {item}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
