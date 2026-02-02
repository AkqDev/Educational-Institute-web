import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      // Page enter animation
      gsap.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className="opacity-0">
      {children}
    </div>
  );
};

export default PageTransition;