import { useEffect, useRef, ReactNode } from 'react';
import { scrollTriggerAnimation } from '../lib/gsap';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animation = 'fadeInUp', 
  className = '',
  delay = 0 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => {
        scrollTriggerAnimation(sectionRef.current!, animation);
      }, delay * 1000);
    }
  }, [animation, delay]);

  return (
    <div ref={sectionRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;