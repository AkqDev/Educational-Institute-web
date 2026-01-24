import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

import Amina from '../assets/Amina.png';
import InstructorHaseeb from '../assets/InstructorHaseeb.png';
import InstructorShafeeq from '../assets/InstructorShafeeq.png';
import InstructorWasif from '../assets/InstructorWasif.png';
import InstructorMuneeb from '../assets/InstructorMuneeb.png'
import InstructorAwais from '../assets/InstructorAwais.png';

const Instructor = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const instructors = [
    {
      img: Amina,
      name: 'Amina Gulzar',
      role: 'Founder & MD of Digital Era | Graphic Designer & Video Editor',
    },
    {
      img: InstructorHaseeb,
      name: 'Haseeb Ahmed',
      role: 'CEO & Co-Founder of Digital Era | Marketing Specialist',
    },
    {
      img: InstructorWasif,
      name: 'Wasif Ijaz',
      role: 'SEO, WordPress & E-commerce Expert',
    },
    {
      img: InstructorShafeeq,
      name: 'Shafeeq ul Rehman',
      role: 'IT Specialist',
    },
    {
      img: InstructorMuneeb,
      name: 'Muneeb Ahmad',
      role: 'Social media handler',
    },
    {
      img: InstructorAwais,
      name: 'Awais Akbar',
      role: 'Student Coordinator',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const speed = 2.6;
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Scroll animation using requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let scrollX = 0;
    const cardWidth = 300 + 32;

    const animate = () => {
      if (!isPaused.current) {
        scrollX += speed;

        if (scrollX >= cardWidth * instructors.length) {
          scrollX = 0;
        }

        container.scrollLeft = scrollX;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [instructors.length]);

  // Fade in animation for section
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Card variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 15,
        duration: 0.2,
      },
    },
  };

  // Text variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        delay: 0.2,
      }
    },
  };

  // Image hover variants
  const imageHoverVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  // Overlay variants
  const overlayVariants = {
    hover: {
      background: [
        'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
      ],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative w-full py-10 md:py-25 bg-[#000] overflow-hidden"
    >
      {/* Gradient overlays with animation - Reduced on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-0 top-0 h-full w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"
      />

      {/* Title with animation */}
      <motion.div
        variants={textVariants}
        className="text-center mb-8 md:mb-12 px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' as const }}
          className="text-2xl md:text-4xl font-bold text-[#0D76BC] mb-2 md:mb-4"
        >
          Meet Our Instructors
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto px-2"
        >
          Learn from industry experts with years of experience in digital technologies
        </motion.p>
      </motion.div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
      >
        {[...instructors, ...instructors, ...instructors].map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={isMobile ? undefined : "hover"}
            onMouseEnter={() => !isMobile && (isPaused.current = true)}
            onMouseLeave={() => !isMobile && (isPaused.current = false)}
            className="relative w-[260px] md:w-[300px] h-[360px] md:h-[400px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group cursor-pointer"
            style={{ 
              boxShadow: isMobile 
                ? '0 10px 20px rgba(0,0,0,0.2)' 
                : '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            {/* Image with parallax effect */}
            <motion.div
              className="w-full h-full"
              variants={imageHoverVariants}
            >
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' as const }}
              />
            </motion.div>

            {/* Animated Overlay - Always visible on mobile */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
              variants={overlayVariants}
              initial={false}
              animate={isMobile ? { opacity: 1 } : undefined}
            />

            {/* Text content - Always visible on mobile */}
            <motion.div
              className="absolute bottom-0 w-full px-4 pb-4 md:pb-6 text-center text-white z-10"
              initial={{ y: isMobile ? 0 : 20, opacity: isMobile ? 1 : 0 }}
              whileHover={isMobile ? undefined : { y: 0, opacity: 1 }}
              animate={isMobile ? { y: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-lg md:text-xl font-bold tracking-wide mb-1 md:mb-2"
                initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {item.name}
              </motion.h3>
              <motion.p
                className="text-xs md:text-sm leading-snug opacity-90"
                initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {item.role}
              </motion.p>
            </motion.div>

            {/* Hover shine effect - Only on desktop */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  opacity: [0, 0.5, 0],
                  transition: {
                    x: { duration: 0.8, ease: 'easeInOut' as const },
                    opacity: { duration: 0.8 },
                  },
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Decorative elements - Reduced opacity on mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isMobile ? 0.05 : 0.1 }}
        transition={{ delay: 0.8, duration: 1, type: 'spring' as const }}
        className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isMobile ? 0.05 : 0.1 }}
        transition={{ delay: 1, duration: 1, type: 'spring' as const }}
        className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl md:blur-3xl"
      />
    </motion.section>
  );
};

export default Instructor;