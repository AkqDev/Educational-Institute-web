import { motion } from "framer-motion";
import UsmanVideo from "../assets/UsmanVideo.mp4";
import WasiVideo from "../assets/WasiVideo.mp4";
import AkbarVideo from "../assets/AkbarVideo.mp4";

const videoVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const TestimonialsVideos: React.FC = () => {
  return (
    <div className="w-full py-10 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center justify-center">

          {/* Video 1 */}
          <motion.div
            className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={videoVariants}
          >
            <video
              src={UsmanVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>

          {/* Video 2 - Center Video */}
          <motion.div
            className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl md:scale-105 md:z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={videoVariants}
          >
            <video
              src={WasiVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>

          {/* Video 3 */}
          <motion.div
            className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl hidden md:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={videoVariants}
          >
            <video
              src={AkbarVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TestimonialsVideos;