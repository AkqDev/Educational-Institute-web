import UsmanVideo from "../assets/UsmanVideo.mp4";
import WasiVideo from "../assets/WasiVideo.mp4";
import AkbarVideo from "../assets/AkbarVideo.mp4";

const TestimonialsVideos: React.FC = () => {
  return (
    <div className="w-full py-10 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center justify-center">
          
          {/* Video 1 */}
          <div className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl">
            <video
              src={UsmanVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Video 2 - Center Video (Slightly Larger on Desktop) */}
          <div className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl md:scale-105 md:z-10">
            <video
              src={WasiVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
        </div>

          {/* Video 3 */}
          <div className="relative rounded-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto aspect-[9/16] md:aspect-[3/4] shadow-2xl hidden md:block">
            <video
              src={AkbarVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TestimonialsVideos;