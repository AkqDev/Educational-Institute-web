import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation configurations
export const animationConfig = {
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.1,
};

// Fade in from bottom animation
export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

// Fade in from right animation
export const fadeInRight = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      x: 50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

// Scale in animation
export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: animationConfig.duration,
      ease: "back.out(1.7)",
      delay,
    }
  );
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements: string | Element[], animation: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' = 'fadeInUp') => {
  const animationMap = {
    fadeInUp: { y: 50, opacity: 0 },
    fadeInLeft: { x: -50, opacity: 0 },
    fadeInRight: { x: 50, opacity: 0 },
    scaleIn: { scale: 0.8, opacity: 0 },
  };

  const toMap = {
    fadeInUp: { y: 0, opacity: 1 },
    fadeInLeft: { x: 0, opacity: 1 },
    fadeInRight: { x: 0, opacity: 1 },
    scaleIn: { scale: 1, opacity: 1 },
  };

  return gsap.fromTo(
    elements,
    animationMap[animation],
    {
      ...toMap[animation],
      duration: animationConfig.duration,
      ease: animation === 'scaleIn' ? "back.out(1.7)" : animationConfig.ease,
      stagger: animationConfig.stagger,
    }
  );
};

// Scroll-triggered animation
export const scrollTriggerAnimation = (
  element: string | Element,
  animation: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' = 'fadeInUp',
  trigger?: string | Element
) => {
  const animationMap = {
    fadeInUp: { y: 50, opacity: 0 },
    fadeInLeft: { x: -50, opacity: 0 },
    fadeInRight: { x: 50, opacity: 0 },
    scaleIn: { scale: 0.8, opacity: 0 },
  };

  const toMap = {
    fadeInUp: { y: 0, opacity: 1 },
    fadeInLeft: { x: 0, opacity: 1 },
    fadeInRight: { x: 0, opacity: 1 },
    scaleIn: { scale: 1, opacity: 1 },
  };

  return gsap.fromTo(
    element,
    animationMap[animation],
    {
      ...toMap[animation],
      duration: animationConfig.duration,
      ease: animation === 'scaleIn' ? "back.out(1.7)" : animationConfig.ease,
      scrollTrigger: {
        trigger: trigger || element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Smooth hover animations
export const hoverScale = (element: string | Element, scale: number = 1.05) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale, duration: 0.3, ease: "power2.out" });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
};

// Text reveal animation
export const textReveal = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay,
    }
  );
};

// Floating animation
export const floatingAnimation = (element: string | Element) => {
  return gsap.to(element, {
    y: -10,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });
};