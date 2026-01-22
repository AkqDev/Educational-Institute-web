import React from "react";
import { motion } from "framer-motion";

/* ================= TYPES ================= */
export interface Course {
  name: string;
  description: string;
}

interface MovingProgramsProps {
  courses: Course[];
}

/* ================= COLUMN ================= */
const CoursesColumn = ({
  courses,
  duration = 15,
  className = "",
}: {
  courses: Course[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {courses.map((item, i) => (
              <motion.li
                key={`${idx}-${i}`}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow:
                    "0 15px 30px -12px rgba(0,0,0,0.15), 0 5px 10px -5px rgba(0,0,0,0.05)",
                }}
                className="p-5 md:p-6 rounded-2xl border border-gray-700 bg-[#1F1F1F] shadow-lg w-full flex flex-col justify-between transition-all"
              >
                <h4 className="font-bold text-[#0D76BC] text-xl md:text-2xl">
                  {item.name}
                </h4>
                <p className="text-gray-300 mt-2 text-sm md:text-base">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

/* ================= MAIN ================= */
const MovingPrograms: React.FC<MovingProgramsProps> = ({ courses }) => {
  const firstColumn = courses.slice(0, 4);
  const secondColumn = courses.slice(4, 8);
  const thirdColumn = courses.slice(8, 12);

  return (
    <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row justify-center gap-4 md:gap-6 max-h-[550px] overflow-hidden px-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      {/* Desktop/Tablet columns */}
      <CoursesColumn courses={firstColumn} duration={18} className="hidden md:block mt-13" />
      <CoursesColumn courses={secondColumn} duration={18} className="hidden md:block" />
      <CoursesColumn courses={thirdColumn} duration={18} className="hidden lg:block mt-13" />

      {/* Mobile single column */}
      <CoursesColumn courses={courses} duration={20} className="block md:hidden" />
    </div>
  );
};

export default MovingPrograms;