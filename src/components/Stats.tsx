import { useEffect, useRef, useState } from "react";
import { motion, type Variants, useInView } from "framer-motion";

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

// ---------------- Counter Hook ----------------
const useCounter = (end: number, start: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 1600;
    const step = Math.max(1, Math.floor(end / (duration / 16)));

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 16);

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
      className="relative flex h-40 w-40 md:h-48 md:w-48 items-center justify-center rounded-full
      bg-white/5 backdrop-blur-xl border border-white/10
      shadow-[0_0_80px_rgba(13,118,188,0.25)]"
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative w-full py-24 px-4 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-[#0D76BC]/20 blur-[180px]"
        />
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            stat={stat}
            startCounting={isInView}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Stats;
