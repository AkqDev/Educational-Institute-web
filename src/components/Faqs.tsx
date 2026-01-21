import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What is SEO and why is it important?",
    answer:
      "SEO (Search Engine Optimization) helps your website rank higher on search engines, increasing visibility, traffic, and credibility.",
  },
  {
    question: "How long does it take to see results from SEO?",
    answer:
      "SEO is a long-term strategy. Typically, noticeable results can take 3–6 months depending on competition and consistency.",
  },
  {
    question: "What are the key factors that influence SEO rankings?",
    answer:
      "Key factors include content quality, keywords, backlinks, page speed, mobile-friendliness, and user experience.",
  },
  {
    question: "Do I need to hire an SEO agency, or can I do SEO myself?",
    answer:
      "You can do basic SEO yourself, but an experienced agency can help achieve faster and more scalable results.",
  },
];

// Framer Motion container variants
const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut", staggerChildren: 0.1 },
  },
};

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-150px" });

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
              <div
                key={index}
                className="rounded-2xl bg-[#161616] px-6 py-5 hover:bg-[#1b1b1b] transition-colors duration-300"
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
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

                {/* Smooth CSS-based collapse */}
                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                  className="overflow-hidden transition-all duration-300 mt-4"
                >
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Faqs;
