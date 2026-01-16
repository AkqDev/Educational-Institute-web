import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/923701393075";
const INSTAGRAM_LINK = "https://www.instagram.com/digitalerainstitute/?igsh=MWhnaGJoZXQweHRrcQ%3D%3D#";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full absolute top-0 left-0 z-40 bg-transparent">
        <div className="flex justify-between md:justify-evenly items-center my-2 md:my-3 px-6 md:px-16">

          {/* LOGO (GO TO HOME) */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-22 h-22 cursor-pointer" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex bg-gray-200 rounded-full text-[#0D76BC] p-5 px-10 font-bold">
            <nav>
              <ul className="flex space-x-6">

                <li>
                  <Link
                    to="/"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/free-programs"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
                  >
                    Free Programs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
                  >
                    Our Social
                  </a>
                </li>

                <li>
                  <Link
                    to="/testimonials"
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
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
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0D76BC] text-white py-3 px-6 rounded-full inline-block"
            >
              Chat on Whatsapp
            </a>
          </div>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-3 rounded-full bg-gray-100 shadow-md text-[#0D76BC]"
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
                <img src={logo} alt="logo" className="w-20 h-20 cursor-pointer" />
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
              <Link to="/free-programs" onClick={() => setIsOpen(false)}>Free Programs</Link>
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

