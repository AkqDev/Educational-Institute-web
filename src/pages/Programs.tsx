import React from "react";
import MovingPrograms from "../components/ui/MovingPrograms";

const Programs: React.FC = () => {
  const coursesData = [
  { 
    name: "Digital Marketing", 
    description: "Learn SEO, social media marketing, Google Ads, and email campaigns. Understand how to build brand awareness and drive traffic effectively. Gain practical skills to manage real-world digital marketing campaigns." 
  },
  { 
    name: "Graphic Designing", 
    description: "Create stunning visuals using Adobe Photoshop, Illustrator, and Figma. Learn color theory, typography, and composition for professional designs. Work on real projects to build a strong portfolio." 
  },
  { 
    name: "Web Development", 
    description: "Become a frontend, backend, or full-stack developer using HTML, CSS, JavaScript, and modern frameworks. Learn to build responsive websites and dynamic web applications. Understand database integration and deployment processes." 
  },
  { 
    name: "Python Programming", 
    description: "Master Python programming from basics to advanced concepts. Work on real-life projects such as web scraping, automation, and data analysis. Understand object-oriented programming and build practical Python applications." 
  },
  { 
    name: "Freelancing", 
    description: "Learn how to start your freelancing career and attract clients globally. Understand how to create proposals, manage projects, and price services. Gain insights into building a sustainable online business." 
  },
  { 
    name: "Basic IT", 
    description: "Understand computer fundamentals, networking basics, and operating systems. Learn essential software tools and troubleshooting techniques. Build foundational IT skills required for professional growth." 
  },
  { 
    name: "Video Editing", 
    description: "Edit professional videos using tools like Adobe Premiere Pro and Final Cut Pro. Learn transitions, color grading, and audio enhancement. Create videos for YouTube, social media, and professional projects." 
  },
  { 
    name: "App Development", 
    description: "Learn to build mobile apps for iOS and Android using Flutter or React Native. Understand UI/UX design principles for mobile platforms. Work on real projects and publish apps to app stores." 
  },
  { 
    name: "E-commerce", 
    description: "Learn to create, manage, and market online stores using Shopify, WooCommerce, or Magento. Understand payment gateways, inventory management, and customer engagement. Implement strategies to increase sales effectively." 
  },
  { 
    name: "Spoken English", 
    description: "Improve your English speaking and listening skills for personal and professional growth. Practice pronunciation, fluency, and grammar in real-life conversations. Gain confidence in communicating in global environments." 
  },
  { 
    name: "Artificial Intelligence", 
    description: "Learn AI fundamentals, machine learning algorithms, and neural networks. Work on real-world AI projects such as image recognition and chatbots. Understand how to implement AI solutions across industries." 
  },
  { 
    name: "Computer Courses", 
    description: "Explore various computer skills including MS Office, typing, and software basics. Understand essential tools for personal and professional tasks. Gain practical knowledge to boost productivity and efficiency." 
  },
];


  return (
    <div className="h-auto bg-[#000] w-auto">
    <div className="mt-40">
      <h1 className="text-5xl md:text-6xl font-bold font-poppins text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-[#0D76BC] to-gray-200">
  Our Courses
</h1>
<p className="text-white text-center mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
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