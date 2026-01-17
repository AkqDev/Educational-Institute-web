import { useEffect } from 'react';
import navtc from "../assets/navtc.png";
import youth from "../assets/youth.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AuroraBackground from './AuroraBackground'; // Add this import

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
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
        delay: 0.5,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 400,
      }
    },
    tap: {
      scale: 0.95,
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
        delay: 0.7,
      }
    }
  };

  const carouselVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        delay: 0.4,
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[90vh] md:h-[100vh] pt-10 md:pt-20 flex items-center justify-center px-4 font-poppins relative overflow-hidden bg-black"
    >
      {/* Aurora OGL Background */}
      <AuroraBackground
        speed={0.7}
        blend={0.8}
        colorStops={['#0D76BC', '#1E90FF', '#0D76BC']} // Matches your theme
        amplitude={1.2}
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      <div className="relative container mx-auto z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >

          {/* LEFT CONTENT */}
          <motion.div variants={itemVariants} className="text-white max-w-[400px] md:max-w-2xl text-center lg:text-left relative z-20">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              Become Top <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring" as const,
                  damping: 15,
                  stiffness: 200,
                  delay: 0.2,
                }}
                className="text-cyan-400 inline-block"
              >1%</motion.span> in the IT Fields
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg lg:text-[18px] text-gray-200"
            >
              Join Pakistan&apos;s Elite IT Training Institute, Building World Class IT Professionals
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-center justify-center lg:justify-between mt-10">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-[#0D76BC] text-white px-10 py-4 w-full md:w-[350px] rounded-full font-semibold text-lg transition shadow-xl hover:shadow-2xl z-20"
              >
                Enroll Now
              </motion.button>

              <motion.div 
                variants={badgeVariants}
                whileHover={{ scale: 1.05 }}
                className="border-1 border-gray-100/10 rounded-2xl p-5 flex gap-6 backdrop-blur-md shadow-xl bg-black/30 z-20"
              >
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE – SWIPER CAROUSEL */}
          <motion.div variants={carouselVariants} className="w-full lg:w-[360px] relative z-20">
            {/* Mobile - Horizontal Swiper */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" as const, delay: 0.6 }}
              className="block lg:hidden"
            >
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={16}
                slidesPerView={1.7}
                centeredSlides={true}
                freeMode={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                speed={3000}
                loop={true}
                className="w-full"
              >
                {programs.map((item, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                      className="
                        w-full
                        bg-black/40 backdrop-blur-md
                        text-gray-200 text-center font-semibold text-lg
                        py-4 px-6 rounded-2xl
                        shadow-lg hover:shadow-2xl
                        transition-all duration-300
                        border border-white/20
                        z-20
                      "
                    >
                      {item}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* Desktop - Swiper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, delay: 0.8 }}
              className="hidden lg:block"
            >
              <Swiper
                modules={[Autoplay]}
                direction="vertical"
                spaceBetween={6}
                slidesPerView={4.5}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: false,
                }}
                speed={4000}
                loop={true}
                className="h-[420px] w-full"
              >
                {[...programs, ...programs].map((item, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                      className="
                        w-full
                        bg-black/40 backdrop-blur-md
                        text-white text-center font-semibold text-lg
                        px-6 rounded-2xl
                        shadow-xl hover:shadow-2xl
                        transition-all duration-500
                        border border-cyan-500/30 hover:border-cyan-400/50
                        flex items-center justify-center h-[70px]
                        py-3
                        z-20
                      "
                    >
                      {item}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
