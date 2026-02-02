import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize smooth scrolling
export const initSmoothScroll = () => {
  // Add smooth scrolling to anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 80, // Account for fixed navbar
          },
          ease: "power2.inOut",
        });
      }
    }
  });
};

// Parallax effect for elements
export const addParallaxEffect = (selector: string, speed: number = 0.5) => {
  gsap.to(selector, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Reveal animation on scroll
export const addScrollReveal = (selector: string, options: any = {}) => {
  const defaultOptions = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.1,
  };

  const finalOptions = { ...defaultOptions, ...options };

  gsap.fromTo(
    selector,
    {
      y: finalOptions.y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: finalOptions.duration,
      ease: finalOptions.ease,
      stagger: finalOptions.stagger,
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
};