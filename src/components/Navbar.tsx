import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { gsap } from 'gsap';
import { fadeInUp, scaleIn } from '../lib/gsap';

const WHATSAPP_LINK = "https://wa.me/923701393075";
const INSTAGRAM_LINK = "https://www.instagram.com/digitalerainstitute/?igsh=MWhnaGJoZXQweHRrcQ%3D%3D#";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animate navbar on mount
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate logo
    if (logoRef.current) {
      scaleIn(logoRef.current, 0.2);
    }

    // Animate menu items
    if (menuRef.current) {
      fadeInUp(menuRef.current, 0.4);
    }

    // Animate WhatsApp button
    if (whatsappRef.current) {
      scaleIn(whatsappRef.current, 0.6);
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div ref={navRef} className="w-full absolute top-0 left-0 z-40 bg-transparent opacity-0">
        <div className="flex justify-between md:justify-evenly items-center my-2 md:my-3 px-6 md:px-16">

          {/* LOGO (GO TO HOME) */}
          <Link to="/">
            <img 
              ref={logoRef}
              src={logo} 
              alt="logo" 
              className="w-24 h-auto cursor-pointer opacity-0 transform-gpu hover:scale-110 transition-transform duration-300" 
            />
          </Link>

          {/* DESKTOP MENU */}
          <div ref={menuRef} className="hidden md:flex bg-gray-200 rounded-full text-[#0D76BC] p-5 px-10 font-bold opacity-0">
            <nav>
              <ul className="flex space-x-6">

                <li>
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white hover:scale-105"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Our-courses"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white hover:scale-105"
                  >
                    Our Courses
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white hover:scale-105"
                  >
                    Our Social
                  </a>
                </li>

                <li>
                  <Link
                    to="/testimonials"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white hover:scale-105"
                  >
                    Testimonials
                  </Link>
                </li>

              </ul>
            </nav>
          </div>

          {/* DESKTOP WHATSAPP */}
          <div className="hidden md:block">
            <a
              ref={whatsappRef}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0D76BC] text-white py-3 px-6 rounded-full inline-block opacity-0 transform-gpu hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Chat on Whatsapp
            </a>
          </div>

          {/* MOBILE MENU ICON */}
          <button onClick={() => setIsOpen(true)}
            className="md:hidden p-3 rounded-full bg-gray-100 shadow-md text-[#0D76BC] hover:scale-110 transition-transform duration-300"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-screen bg-black z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-6">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={logo} alt="logo" className="w-22 h-auto cursor-pointer" />
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-gray-100 shadow-md text-black"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* MENU ITEMS */}
            <nav className="flex flex-col items-center justify-center gap-6 text-white text-xl font-bold flex-1">

              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/Our-courses" onClick={() => setIsOpen(false)}>Our Courses</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>

              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Our Social
              </a>

              <Link to="/testimonials" onClick={() => setIsOpen(false)}>
                Testimonials
              </Link>

              {/* WHATSAPP BUTTON */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 bg-[#0D76BC] px-8 py-3 rounded-full"
              >
                Chat on Whatsapp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;