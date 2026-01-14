import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo1.png";

const WHATSAPP_LINK = "https://wa.me/923001234567"; // replace number

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full absolute top-0 left-0 z-40 bg-transparent">
        <div className="flex justify-between md:justify-evenly items-center my-2 md:my-3 px-6 md:px-16">

          {/* LOGO */}
          <img src={logo} alt="logo" className="w-22 h-22"/>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex bg-gray-200 rounded-full text-[#0D76BC] p-5 px-10 font-bold">
            <nav>
              <ul className="flex space-x-6">
                {["Free Programs", "Contact Us", "Our Social", "Testimonials"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#0D76BC] hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
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
              <img src={logo} alt="logo" className="w-20 h-20" />

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-gray-100 shadow-md text-black"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* MENU ITEMS */}
            <nav className="flex flex-col items-center justify-center gap-6 text-white text-xl font-bold flex-1">
              {["Free Programs", "Contact Us", "Our Social", "Testimonials"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 rounded-full transition-all duration-300 hover:bg-[#0D76BC]"
                  >
                    {item}
                  </a>
                )
              )}

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

export default Navbar