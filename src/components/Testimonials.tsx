import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "The courses transformed my skills! I now feel confident applying for international IT roles.",
      name: "Ali Khan",
      designation: "Full Stack Developer",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3600&auto=format&fit=crop",
    },
    {
      quote:
        "I loved the hands-on projects and mentorship. The real-world approach made learning so much easier.",
      name: "Sara Ahmed",
      designation: "Software Engineer Intern",
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3600&auto=format&fit=crop",
    },
    {
      quote:
        "The instructors are amazing! I improved my coding skills faster than I expected.",
      name: "Hassan Qureshi",
      designation: "Junior Frontend Developer",
      src: "https://images.unsplash.com/photo-1603415526960-f7e0328f1bbd?q=80&w=3600&auto=format&fit=crop",
    },
    {
      quote:
        "The learning experience was smooth and interactive. I now work confidently on real projects.",
      name: "Ayesha Malik",
      designation: "UI/UX Designer",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3600&auto=format&fit=crop",
    },
    {
      quote:
        "Thanks to this platform, I landed my first remote developer job! Highly recommended for students.",
      name: "Omar Farooq",
      designation: "Remote Backend Developer",
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-[#000]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-[#0D76BC]">
          What Our Students Say
        </h2>
        <p className="mt-4 text-xl text-gray-100 max-w-3xl mx-auto">
          Hear from our students who have transformed their careers and skills through our training.
        </p>
      </div>
      
      <AnimatedTestimonials 
        testimonials={testimonials}
        autoplay={true}
        autoplayInterval={3000} // faster autoplay for smoother mobile experience
        slidesPerView={{ base: 1, md: 2, lg: 3 }} // adapt slides for mobile, tablet, desktop
        loop={true} // make it continuous
      />
    </div>
  );
};

export default Testimonials;