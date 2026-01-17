import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion} from "framer-motion";
import type { Variants } from "framer-motion"; 

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

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // ✅ TS-safe easing
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-20 px-4"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="inline-block mb-4 rounded-full bg-[#161616] px-4 py-1 text-sm font-medium text-[#0D76BC] font-[poppins]"
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.span>

        {/* Headings */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Got Questions?
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="mt-2 text-4xl md:text-5xl font-bold text-white"
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
                variants={itemVariants}
                className="rounded-2xl bg-[#161616] px-6 py-5 hover:bg-[#1b1b1b]"
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  <motion.span
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    className="text-lg font-medium text-white"
                  >
                    {faq.question}
                  </motion.span>

                  <span className="ml-4 flex p-2  items-center justify-center rounded-full bg-[#0D76BC]">
                    <FiChevronDown
                      className={`text-xl text-white transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <motion.p
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    className="overflow-hidden text-sm text-gray-300 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};

export default Faqs;
