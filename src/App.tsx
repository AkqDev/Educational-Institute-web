import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import TestimonialsPage from "./pages/TestimonialsPage";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition';

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/Our-courses" element={<PageTransition><Programs /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
      </Routes>
    <Footer/>
    </>
  );
};

export default App;
