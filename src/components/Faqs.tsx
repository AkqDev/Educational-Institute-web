import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "Do you provide certificates after course completion?",
    answer:
      "Yes, we provide a recognized certificate upon successful completion of the course, which can be added to your resume and portfolio.",
  },
  {
    question: "Are the classes online or on-campus?",
    answer:
      "We offer both online and on-campus classes, allowing students to choose the learning mode that best fits their schedule.",
  },
  {
    question: "Will I get practical hands-on training?",
    answer:
      "Absolutely. Our training focuses on practical, hands-on projects to help students gain real-world experience.",
  },
  {
    question: "Do you offer job placement or internship support?",
    answer:
      "Yes, we provide career guidance, internship opportunities, and job placement support to help students start their professional journey.",
  },
  {
    question: "How can I enroll in a course?",
    answer:
      "You can enroll by contacting us through our website, visiting our campus, or reaching out via phone or WhatsApp.",
  },
];

// Animation container (runs once only)
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      staggerChildren: 0.08,
    },
  },
};

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🔥 Animate ONCE – prevents mobile lag
  const isInView = useInView(sectionRef, {
    margin: "-120px",
    once: true,
  });

  return (
    <motion.section
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full py-20 px-4"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.span
          className="inline-block mb-4 rounded-full bg-[#161616] px-4 py-1 text-sm font-medium text-[#0D76BC] font-[poppins]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.span>

        {/* Headings */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Got Questions?
        </motion.h1>

        <motion.h2
          className="mt-2 text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We&apos;ve Got Answers!
        </motion.h2>

        {/* FAQ Items */}
        <div className="mt-12 space-y-5 text-left">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                className="rounded-2xl bg-[#161616] px-6 py-5 hover:bg-[#1b1b1b] transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * index }}
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>

                  <span className="ml-4 flex p-2 items-center justify-center rounded-full bg-[#0D76BC]">
                    <FiChevronDown
                      className={`text-xl text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* 🚀 Mobile-optimized accordion */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden mt-4"
                >
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Faqs;