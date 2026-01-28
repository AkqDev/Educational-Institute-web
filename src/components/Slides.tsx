import Carousel3D from "../components/ui/Carousel3D";
import web from "../assets/web.png";
import marketing from "../assets/marketing.png";
import video from "../assets/video.png";
import graphics from "../assets/graphics.png";
import ecommerce from "../assets/ecommerce.png";
import freelancing from "../assets/freelancing.png";

const Slides = () => {
  const customSlides = [
    { image: web },
    { image: marketing },
    { image: video },
    { image: graphics },
    { image: ecommerce },
    { image: freelancing }
  ];

  return <Carousel3D slides={customSlides} />;
};

export default Slides;
