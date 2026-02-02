import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  once?: boolean;
}

// Hook for basic GSAP animations
export const useGSAP = (
  animation: (tl: gsap.core.Timeline) => void,
  dependencies: any[] = []
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const tl = gsap.timeline();
      animation(tl);
      return () => {
        tl.kill();
      };
    }
  }, dependencies);

  return ref;
};

// Hook for scroll-triggered animations
export const useScrollTrigger = (
  animation: (tl: gsap.core.Timeline) => void,
  options: UseGSAPOptions = {},
  dependencies: any[] = []
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: options.trigger || ref.current,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          scrub: options.scrub || false,
          pin: options.pin || false,
          markers: options.markers || false,
          toggleActions: options.once ? "play none none none" : "play none none reverse",
        },
      });

      animation(tl);

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === ref.current) {
            trigger.kill();
          }
        });
      };
    }
  }, dependencies);

  return ref;
};

// Hook for hover animations
export const useHoverAnimation = (
  enterAnimation: (element: Element) => gsap.core.Timeline,
  leaveAnimation: (element: Element) => gsap.core.Timeline
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      enterAnimation(element);
    };

    const handleMouseLeave = () => {
      leaveAnimation(element);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enterAnimation, leaveAnimation]);

  return ref;
};

// Hook for stagger animations
export const useStaggerAnimation = (
  selector: string,
  animation: any,
  options: UseGSAPOptions = {},
  dependencies: any[] = []
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(selector);
      
      gsap.fromTo(
        elements,
        animation.from,
        {
          ...animation.to,
          stagger: animation.stagger || 0.1,
          scrollTrigger: {
            trigger: options.trigger || ref.current,
            start: options.start || "top 80%",
            end: options.end || "bottom 20%",
            toggleActions: options.once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }
  }, dependencies);

  return ref;
};