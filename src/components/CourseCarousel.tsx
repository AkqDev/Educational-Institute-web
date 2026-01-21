import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaUsers,
  FaClock,
} from "react-icons/fa";

import web from "../assets/web.png";
import marketing from "../assets/marketing.png";
import video from "../assets/video.png";
import graphics from "../assets/graphics.png";
import ecommerce from "../assets/ecommerce.png";
import freelancing from "../assets/freelancing.png";

interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  price?: string;
  image: string;
}

const WHATSAPP_NUMBER = "923001234567"; // 🔴 replace only this

const CourseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.3 });

  const courses: Course[] = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      category: "Development",
      description:
        "Master modern web development with React, Node.js, and MongoDB",
      duration: "12 weeks",
      students: 2543,
      rating: 4.8,
      image: web,
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      description:
        "Learn SEO, social media marketing, and digital advertising strategies",
      duration: "8 weeks",
      students: 1876,
      rating: 4.7,
      image: marketing,
    },
    {
      id: 3,
      title: "Video Production Pro",
      category: "Creative",
      description: "From filming to editing - create professional videos",
      duration: "10 weeks",
      students: 1321,
      rating: 4.9,
      image: video,
    },
    {
      id: 4,
      title: "Graphic Design Fundamentals",
      category: "Design",
      description: "Learn typography and color theory",
      duration: "6 weeks",
      students: 2890,
      rating: 4.6,
      image: graphics,
    },
    {
      id: 5,
      title: "E-commerce Success",
      category: "Business",
      description: "Build profitable online stores",
      duration: "9 weeks",
      students: 2105,
      rating: 4.8,
      image: ecommerce,
    },
    {
      id: 6,
      title: "Freelancing Career Guide",
      category: "Career",
      description: "Start and grow your freelance business",
      duration: "5 weeks",
      students: 3456,
      rating: 4.9,
      image: freelancing,
    },
  ];

  const getCourse = (offset: number) =>
    courses[(currentIndex + offset + courses.length) % courses.length];

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % courses.length);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);

  useEffect(() => {
    if (!isInView) return; // Stop auto-slide when not in view
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [isInView]);

  const openWhatsApp = (course: Course) => {
    const msg = encodeURIComponent(
      `Hello, I want to enroll in the course: ${course.title}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const current = getCourse(0);
  const prev = getCourse(-1);
  const next = getCourse(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const sideCardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const centerCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div ref={carouselRef} className="bg-[#000] py-20 px-4">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h1 
          className="text-center text-4xl font-[poppins] font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Latest <span className="text-[#0D76BC]">Courses</span>
        </motion.h1>

        <div className="relative flex flex-col md:flex-row items-center gap-8 justify-center">
          {/* LEFT CARD */}
          <motion.div
            onClick={goToPrev}
            className="hidden md:block w-[30%] cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sideCardVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <SideCard course={prev} />
          </motion.div>

          {/* CENTER CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="w-full md:w-[50%] bg-gradient-to-br from-gray-900 to-black rounded-4xl shadow-2xl border-gray-500 border-1"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
              variants={centerCardVariants}
            >
              <motion.img
                src={current.image}
                alt={current.title}
                className="w-full h-70 object-cover rounded-t-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white font-bold">{current.rating}</span>
                    <FaUsers className="text-gray-400 ml-4" />
                    <span className="text-gray-300">
                      {current.students.toLocaleString()}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {current.title}
                </h2>
                <p className="text-gray-300 mb-4">{current.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaClock />
                    <span>{current.duration}</span>
                  </div>

                  <motion.button
                    onClick={() => openWhatsApp(current)}
                    className="px-8 py-3 bg-gradient-to-r from-[#0D76BC] to-[#4AA3DF] text-white font-bold rounded-full hover:shadow-xl transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT CARD */}
          <motion.div
            onClick={goToNext}
            className="hidden md:block w-[30%] cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={sideCardVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <SideCard course={next} />
          </motion.div>
        </div>

        {/* NAV BUTTONS */}
        <motion.div 
          className="flex justify-center items-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button 
            onClick={goToPrev} 
            className="p-4 bg-gradient-to-r from-[#0D76BC] to-[#4AA3DF] text-white rounded-full hover:shadow-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button 
            onClick={goToNext} 
            className="p-4 bg-gradient-to-r from-[#0D76BC] to-[#4AA3DF] text-white rounded-full hover:shadow-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SideCard = ({ course }: { course: Course }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-5 shadow-2xl border border-gray-800"
    whileHover={{ scale: 1.05 }}
  >
    <motion.div 
      className="relative overflow-hidden rounded-2xl mb-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-50 object-cover"
      />
      <motion.span 
        className="absolute top-4 left-4 px-3 py-1 bg-[#0D76BC] text-white text-xs font-bold rounded-full"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {course.category}
      </motion.span>
    </motion.div>

    <div className="flex justify-between mb-3">
      <div className="flex items-center gap-1">
        <FaStar className="text-yellow-400 text-sm" />
        <span className="text-white font-bold text-sm">{course.rating}</span>
      </div>
    </div>

    <h3 className="text-white font-semibold mb-3 line-clamp-2">
      {course.title}
    </h3>

    <div className="flex justify-between text-gray-400 text-sm">
      <div className="flex items-center gap-1">
        <FaClock />
        <span>{course.duration}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaUsers />
        <span>{course.students.toLocaleString()}</span>
      </div>
    </div>
  </motion.div>
);

export default CourseCarousel;