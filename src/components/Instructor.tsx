import { useEffect, useRef } from 'react';

import InstructorAmina from '../assets/InstructorAmina.png';
import InstructorHaseeb from '../assets/InstructorHaseeb.png';
import InstructorShafeeq from '../assets/InstructorShafeeq.png';
import InstructorWasif from '../assets/InstructorWasif.png';
import InstructorAwais from '../assets/InstructorAwais.png';

const Instructor = () => {
  const instructors = [
    {
      img: InstructorAmina,
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
      img: InstructorAwais,
      name: 'Awais Akbar',
      role: 'Student Coordinator',
    },
  ];

  const containerRef = useRef(null);
  const isPaused = useRef(false);
  const speed = 2.6; // smooth speed

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;
    let scrollX = 0;
    const cardWidth = 300 + 32; // card width + gap

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

  return (
    <section className="relative w-full py-25 bg-[#000]">
      {/* Left gradient */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />

      {/* Right gradient */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-8"
      >
        {[...instructors, ...instructors, ...instructors].map(
          (item, index) => (
            <div
              key={index}
              onMouseEnter={() => (isPaused.current = true)}
              onMouseLeave={() => (isPaused.current = false)}
              className="relative w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl group"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 w-full px-4 pb-6 text-center text-white z-10">
                <h3 className="text-lg font-semibold tracking-wide">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-snug opacity-90">
                  {item.role}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Instructor;