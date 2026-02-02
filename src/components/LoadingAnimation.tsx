import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingAnimation = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotsRef.current) {
      const dots = dotsRef.current.children;
      
      gsap.to(dots, {
        y: -10,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      });
    }

    // Auto-hide loader after 2 seconds
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none';
            }
          },
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="text-white text-2xl font-bold mb-4">
          Digital Era Institute
        </div>
        <div ref={dotsRef} className="flex space-x-2">
          <div className="w-3 h-3 bg-[#0D76BC] rounded-full"></div>
          <div className="w-3 h-3 bg-[#0D76BC] rounded-full"></div>
          <div className="w-3 h-3 bg-[#0D76BC] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;