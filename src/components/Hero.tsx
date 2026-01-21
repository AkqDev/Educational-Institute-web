import { useEffect } from 'react';
import navtc from "../assets/navtc.png";
import youth from "../assets/youth.png";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AuroraBackground from './AuroraBackground';

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
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[100vh] pt-10 md:pt-20 flex items-center justify-center px-4 font-poppins relative overflow-hidden bg-black"
    >
      {/* Aurora Background */}
      <AuroraBackground
        speed={0.7}
        blend={0.8}
        colorStops={['#0D76BC', '#1E90FF', '#0D76BC']}
        amplitude={1.2}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      <div className="relative container mx-auto z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex items-center justify-center text-center"
        >
          {/* CENTER CONTENT */}
          <motion.div
            variants={itemVariants}
            className="text-white w-auto md:max-w-4xl relative z-20"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-6xl font-bold leading-tight"
            >
              Become Top{" "}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring" as const,
                  damping: 15,
                  stiffness: 200,
                  delay: 0.2,
                }}
                className="text-cyan-400 inline-block"
              >
                1%
              </motion.span>{" "}
              in the IT Fields
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg lg:text-[18px] text-gray-200"
            >
              Join Pakistan&apos;s Elite IT Training Institute, Building World
              Class IT Professionals
            </motion.p>

            {/* ➕ Added Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-base lg:text-[16px] text-gray-300 leading-relaxed"
            >
              Learn from experienced industry mentors, gain hands-on exposure
              through real-world projects, and master cutting-edge technologies
              including AI, modern software development, and emerging digital
              skills. Our practical learning model prepares you for global
              opportunities with confidence and clarity.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-[#0D76BC] text-white px-10 py-4 w-full md:w-[350px] rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl z-20"
              >
                Enroll Now
              </motion.button>

              <motion.div
                variants={badgeVariants}
                whileHover={{ scale: 1.05 }}
                className="border border-gray-100/10 rounded-2xl p-5 flex gap-6 backdrop-blur-md shadow-xl bg-black/30 z-20"
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
