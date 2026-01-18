import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FaLightbulb, FaHeadset, FaSmile, FaAward } from "react-icons/fa";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 900, suffix: "+", label: "Satisfied Clients" },
  { value: 1000, suffix: "+", label: "Students Enrolled" },
  { value: 20, suffix: "+", label: "Team Members" },
];

// ---------------- Variants ----------------
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

const featureContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ---------------- Counter Hook ----------------
const useCounter = (end: number, start: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 2400;
    const step = Math.max(1, Math.floor(end / (duration / 16)));

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [end, start]);

  return count;
};

// ---------------- Stat Card ----------------
const StatCard = ({
  stat,
  startCounting,
}: {
  stat: Stat;
  startCounting: boolean;
}) => {
  const count = useCounter(stat.value, startCounting);

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex h-55 w-55 items-center justify-center rounded-full
      bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(13,118,188,0.25)]
      md:shadow-[0_0_70px_rgba(13,118,188,0.25)]"
    >
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold text-white">
          {count}
          {stat.suffix}
        </p>
        <p className="mt-1 text-sm text-gray-300">{stat.label}</p>
      </div>
    </motion.div>
  );
};

// ---------------- Main Component ----------------
const Stats = () => {
  const [startCounting, setStartCounting] = useState(false);

  const features = [
    { icon: <FaLightbulb />, label: "Continuous Innovation" },
    { icon: <FaHeadset />, label: "Dedicated Support" },
    { icon: <FaSmile />, label: "Positive Working Experiences" },
    { icon: <FaAward />, label: "Commitment to Excellence" },
  ];

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden">
      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setStartCounting(true)}
        className="mx-auto max-w-7xl flex flex-wrap flex-col md:flex-row items-center justify-center gap-4"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            stat={stat}
            startCounting={startCounting}
          />
        ))}
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={featureContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        className="w-full h-auto flex justify-center items-center p-4 mt-16 md:mt-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-2 w-full max-w-[1000px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={featureItemVariants}
              className="flex flex-row items-center gap-2 bg-[#2A2D2D] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <div className="text-2xl text-[#0D76BC]">
                {feature.icon}
              </div>
              <p className="text-sm md:text-base p-2">
                {feature.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
