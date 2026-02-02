import { gsap } from 'gsap';

// Button hover effects
export const addButtonHoverEffect = (selector: string) => {
  const buttons = document.querySelectorAll(selector);
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    button.addEventListener('mousedown', () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    });
    
    button.addEventListener('mouseup', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out",
      });
    });
  });
};

// Card hover effects
export const addCardHoverEffect = (selector: string) => {
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
};

// Image hover effects
export const addImageHoverEffect = (selector: string) => {
  const images = document.querySelectorAll(selector);
  
  images.forEach(image => {
    image.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    
    image.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
};

// Text reveal on scroll
export const addTextRevealEffect = (selector: string) => {
  const textElements = document.querySelectorAll(selector);
  
  textElements.forEach(element => {
    const text = element.textContent;
    if (!text) return;
    
    element.innerHTML = text
      .split('')
      .map(char => `<span style="opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    
    const spans = element.querySelectorAll('span');
    
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
};

// Initialize all micro-interactions
export const initMicroInteractions = () => {
  // Add button effects to common button classes
  addButtonHoverEffect('.btn, button, [role="button"]');
  
  // Add card effects to common card classes
  addCardHoverEffect('.card, .testimonial-card, .feature-card');
  
  // Add image effects to images within cards or galleries
  addImageHoverEffect('.card img, .gallery img, .hover-image');
};