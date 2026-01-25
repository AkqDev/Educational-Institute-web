import React from "react";
import MovingPrograms from "../components/ui/MovingPrograms";

const Programs: React.FC = () => {
const coursesData = [
  {
    name: "Digital Marketing",
    description: "Learn SEO, social media, and online advertising. Build skills to grow brands and drive traffic."
  },
  {
    name: "Graphic Designing",
    description: "Design professional visuals using modern tools. Learn color, typography, and layout basics."
  },
  {
    name: "Web Development",
    description: "Build responsive websites and web apps. Learn frontend, backend, and full-stack development."
  },
  {
    name: "Python Programming",
    description: "Learn Python from basics to advanced concepts. Create automation and real-world projects."
  },
  {
    name: "Freelancing",
    description: "Start earning online as a freelancer. Learn client handling, proposals, and pricing."
  },
  {
    name: "Basic IT",
    description: "Understand computer fundamentals and software tools. Build strong IT foundations."
  },
  {
    name: "Video Editing",
    description: "Edit professional videos with modern tools. Learn transitions, effects, and audio basics."
  },
  {
    name: "App Development",
    description: "Create mobile apps for Android and iOS. Learn UI design and app deployment."
  },
  {
    name: "E-commerce",
    description: "Build and manage online stores. Learn product management and sales strategies."
  },
  {
    name: "Spoken English",
    description: "Improve speaking and listening skills. Gain confidence in daily and professional communication."
  },
  {
    name: "Artificial Intelligence",
    description: "Learn AI and machine learning basics. Work on smart, real-world applications."
  },
  {
    name: "Computer Courses",
    description: "Learn essential computer and office skills. Improve productivity for daily tasks."
  },
];

  return (
    <div className="h-auto bg-[#000] w-auto">
    <div className="mt-40">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins text-center text-[#0D76BC] ">
  Our Courses
</h1>
<p className="text-white text-center mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed px-5">
  Your Path To IT Excellence begins here! Explore our carefully curated programs that cover 
  everything from web development and digital marketing to AI, app development, and more. 
  Gain industry-ready skills and hands-on experience to boost your career and achieve success.
</p>
</div>

      <div className="container mx-auto px-4 py-16">
        <MovingPrograms courses={coursesData} />
      </div>
    </div>
  );
};

export default Programs;