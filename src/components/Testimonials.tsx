import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import hassan from '../assets/hassan.png'
import Sarmad from '../assets/Sarmad.png'
import UmaisReview from '../assets/UmaisReview.png'
import Awais from '../assets/Awais.png'
import { useEffect, useRef } from 'react';
import { scrollTriggerAnimation } from '../lib/gsap';

const Testimonials = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      scrollTriggerAnimation(titleRef.current, 'fadeInUp');
    }
    
    if (subtitleRef.current) {
      setTimeout(() => {
        scrollTriggerAnimation(subtitleRef.current!, 'fadeInUp');
      }, 200);
    }
    
    if (testimonialsRef.current) {
      setTimeout(() => {
        scrollTriggerAnimation(testimonialsRef.current!, 'scaleIn');
      }, 400);
    }
  }, []);

  const testimonials = [
    {
      quote:"I learned freelancing from Digital Era of IT and highly recommend it for anyone looking to grow and build a successful IT career. Expert trainers, a supportive environment, and industry-relevant skills made it a truly career-shaping journey.",
      name: "Akbar Qureshi",
      designation: "Web & Software Developer",
      src: hassan,
    },
    {
      quote:"Digital Era provided me with the skills and confidence to excel in digital marketing. The hands-on training and real-world projects prepared me for a successful career in the industry.",
      name: "Syed Sarmad Ali",
      designation: "Digital Marketer",
      src: Sarmad,
    },
    {
      quote:"Freelancing course at Digital Era was a game-changer for me. The comprehensive curriculum and practical approach helped me build a strong foundation and launch my career as a Freelancer.",
      name: "Umais Yousaf",
      designation: "Web Developer",
      src: UmaisReview,
    },
    {
      quote:"The UI/UX Design course at Digital Era was exceptional. The instructors were knowledgeable, and the hands-on projects allowed me to build a strong portfolio. I highly recommend it to anyone looking to pursue a career in design.",
      name: "Awais Yousaf",
      designation: "Graphic & UI/UX Designer",
      src: Awais,
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#000]">
      <div className="text-center mb-16">
        <h2 
          ref={titleRef}
          className="text-4xl font-bold tracking-tight text-[#0D76BC] opacity-0"
        >
          What Our Students Say
        </h2>
        <p 
          ref={subtitleRef}
          className="mt-4 text-md text-gray-100 max-w-3xl mx-auto opacity-0"
        >
          Hear from industry leaders who have transformed their businesses with our platform.
        </p>
      </div>
      
      <div ref={testimonialsRef} className="opacity-0">
        <AnimatedTestimonials 
          testimonials={testimonials}
          autoplay={true}
          autoplayInterval={5000}
        />
      </div>
    </div>
  );
};

export default Testimonials;