import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlitchText from "../components/ui/GlitchText";

const Contact: React.FC = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const whatsappNumber = "923001234567"; // replace with your WhatsApp number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!name || !email || !message) { 
      alert("Please fill all fields before submitting."); 
      return; 
    } 
    const whatsappMessage = `Hello, I have a new message from your contact form:%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setName(''); 
    setEmail(''); 
    setMessage(''); 
  };

  return (
    <div className="w-full h-auto bg-[#000] text-white pt-40 pb-20">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-10">

          {/* Header */}
          <motion.div 
            className="w-full md:w-1/3 flex justify-center md:justify-start" 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 400 }}>
              <GlitchText 
                speed={0.8} 
                enableShadows={true} 
                enableOnHover={true} 
                className="text-white text-[72px] sm:text-[100px] md:text-[140px] leading-[72px] sm:leading-[90px] md:leading-[109px] block drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_5px_20px_rgba(255,255,255,0.3)] transition-shadow duration-300"
              >
                Let's
              </GlitchText>
              <GlitchText 
                speed={0.8} 
                enableShadows={true} 
                enableOnHover={false} 
                className="!text-[#0D76BC] text-[72px] sm:text-[100px] md:text-[140px] leading-[72px] sm:leading-[90px] md:leading-[109px] -mt-2 block shadow-[0_10px_25px_rgba(13,118,188,0.4)] hover:shadow-[0_5px_35px_rgba(13,118,188,0.6)] transition-shadow duration-500"
              >
                Talk!
              </GlitchText>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            className="p-2 rounded-3xl w-full md:w-2/3 max-w-3xl" 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
                <label className="block mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder='Enter Your Name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-5 mt-2 mb-4 rounded-2xl bg-[#2F2F2F] border border-gray-700 focus:outline-none focus:border-[#0D76BC]" 
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
                <label className="block mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder='Enter Your Email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-5 mt-2 mb-4 rounded-2xl bg-[#2F2F2F] border border-gray-700 focus:outline-none focus:border-[#0D76BC]" 
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col">
                <label className="block mb-1">Message</label>
                <textarea 
                  placeholder='Enter Message' 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="w-full p-5 mt-2 mb-4 rounded-2xl bg-[#2F2F2F] border border-gray-700 focus:outline-none focus:border-[#0D76BC]" 
                  rows={5}
                />
              </motion.div>

              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="bg-[#0D76BC] text-white font-bold font-[poppins] w-full py-3 px-6 rounded-2xl transition duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;