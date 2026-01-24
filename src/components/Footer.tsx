import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/digitalerainstitute/?igsh=MWhnaGJoZXQweHRrcQ%3D%3D#",
    },
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/digitaleraskill?rdid=PD4URBu6rwikb86i&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FRuvEaKgG%2F#",
    },
    {
      icon: FaWhatsapp,
      url: "https://whatsapp.com/channel/0029VbAh2iN9mrGiJURCEg2I",
    },
  ];

  const contactLinks = [
    {
      icon: <FiMail size={18} />,
      text: "digitaleradeit@gmail.com",
      link: "mailto:digitaleradeit@gmail.com",
    },
    {
      icon: <FiPhone size={18} />,
      text: "0370-1393075",
      link: "tel:0370-1393075",
    },
    {
      icon: <FiMapPin size={18} />,
      text: "Range Road | Rawalpindi | Pakistan",
      link: "https://www.google.com/maps/place/H2X8%2BGMH,+Shalley+Valley,+Rawalpindi,+46000,+Pakistan/@33.5988125,73.0167344,17z/data=!3m1!4b1!4m5!3m4!1s0x38df940d9ccae5af:0x89d79a1b041f32e1!8m2!3d33.5988125!4d73.0167344?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="md:bg-[#000] bg-[#161616] border-t rounded-2xl md:border-0 text-white w-full h-auto py-10 px-2 md:px-4 md:px-10 shadow-[0_-4px_10px_rgba(0,0,0,0.2)]"
    >
      {/* TOP FOOTER */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start bg-[#161616] rounded-3xl p-2 md:p-8 gap-10">
        {/* LEFT */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:w-1/3 flex justify-start"
        >
          <div className="text-left space-y-4">
            <img src={logo} alt="logo" className="w-22 h-auto" />
            <p className="text-sm leading-relaxed opacity-90">
              DigitalEra is a NAVTTC-approved institute offering high-quality,
              industry-standard courses with a strong focus on practical skills.
              We prepare students for real-world careers through hands-on
              learning and professional training. After course completion, we
              provide internship opportunities to support career growth and
              success.
            </p>
          </div>
        </motion.div>

        {/* MIDDLE */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-1/3 flex justify-center md:mt-14"
        >
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-3 text-center">
              Quick Links
            </h3>
            <ul className="space-y-2 md:text-center">
              {[
                { name: "Home", path: "/" },
                { name: "Our Courses", path: "/Our-courses" },
                { name: "Contact Us", path: "/contact" },
                { name: "Testimonials", path: "/testimonials" },
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
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:w-1/3 flex justify-end"
        >
          <div className="space-y-4 w-full md:max-w-sm">
            <h1 className="font-bold text-lg mb-3 md:hidden">Contact Us</h1>
            {contactLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 text-sm font-medium md:bg-[#222222] md:p-6 rounded-2xl w-full md:w-auto md:justify-center hover:opacity-80 transition"
              >
                {item.icon}
                {item.text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-[1400px] flex-col md:flex-row mx-auto flex justify-between items-center mt-4 px-4 md:px-10 bg-[#161616] rounded-3xl py-4"
      >
        <div className="text-sm text-white opacity-80">
          &copy; {new Date().getFullYear()} DigitalEra of IT | Developed
          by Akbar Qureshi
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialLinks.map(({ icon: Icon, url }, i) => (
            <motion.a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-white bg-[#202020] p-3 rounded-full shadow-lg cursor-pointer"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* WHATSAPP FLOATING BUTTON */}
      <motion.a
        href="https://wa.me/923701393075"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-5 right-10 z-50 bg-[#0D76BC] p-4 rounded-full shadow-lg md:hidden"
      >
        <FaWhatsapp size={18} className="text-white" />
      </motion.a>
    </motion.div>
  );
};

export default Footer;