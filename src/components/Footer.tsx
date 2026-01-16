import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <div className="md:bg-[#000] bg-[#161616] border-t rounded-2xl md:border-0 text-white w-full h-auto py-10 px-4 md:px-10 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">

      {/* Top Footer - Logo, Menu, Contact */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start bg-[#161616] rounded-3xl p-8 gap-10">

        {/* LEFT Column - Logo & About */}
        <div className="md:w-1/3 flex justify-start">
          <div className="text-left space-y-4">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <p className="text-sm leading-relaxed opacity-90">
              DigitalEra is a NAVTTC-approved institute offering high-quality, industry-standard courses with a strong focus on practical skills. We prepare students for real-world careers through hands-on learning and professional training. After course completion, we provide internship opportunities to support career growth and success.
            </p>
          </div>
        </div>

        {/* MIDDLE Column - Menu */}
        <div className="md:w-1/3 flex justify-center md:mt-14">
          <div className="space-y-4"> 
            <h3 className="font-bold text-lg mb-3 text-center">Quick Links</h3>
            <ul className="space-y-2 md:text-center">
              {[
                { name: 'Home', path: '/' },
                { name: 'Free Programs', path: '/free-programs' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Testimonials', path: '/testimonials' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="inline-block transition-all duration-300 hover:text-[#0D76BC] hover:translate-x-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT Column - Contact Info with Icons */}
        <div className="md:w-1/3 flex justify-end">
          <div className="space-y-4 w-full md:max-w-sm">

            {/* Email */}
            <a
              href="mailto:agencee@email.com"
              className="flex items-center gap-3 text-sm font-medium bg-[#222222] p-6 rounded-2xl w-full md:w-auto justify-center hover:opacity-80 transition"
            >
              <FiMail size={18} />
              agencee@email.com
            </a>

            {/* Phone */}
            <a
              href="tel:+542541225566"
              className="flex items-center gap-3 text-sm font-medium bg-[#222222] p-6 rounded-2xl w-full md:w-auto justify-center hover:opacity-80 transition"
            >
              <FiPhone size={18} />
              +54 2541 22 55 66
            </a>

            {/* Location */}
            <a
              href="https://www.google.com/maps?q=123+Main+Street+Anytown+USA+2141"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium bg-[#222222] p-6 rounded-2xl w-110 md:w-auto justify-center hover:opacity-80 transition "
            >
              <FiMapPin size={18} />
              123 Main Street Anytown, USA, 2141
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright & Social */}
      <div className="max-w-[1400px] flex-col md:flex-row mx-auto flex justify-between items-center mt-4 px-4 md:px-10 bg-[#161616] rounded-3xl py-4">

        {/* Left - Copyright */}
        <div className="text-sm text-white opacity-80">
          &copy; {new Date().getFullYear()} DigitalEra of IT | Developed by Akbar Qureshi
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.instagram.com/youraccount"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#202020] p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="https://www.facebook.com/youraccount"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#202020] p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/youraccount"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#202020] p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      {/* WhatsApp Floating Button - Mobile Only */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-[#0D76BC] p-4 rounded-full shadow-lg md:hidden hover:scale-105 transition-transform"
      >
        <FaWhatsapp size={18} className="text-white" />
      </a>

    </div>
  );
};

export default Footer;