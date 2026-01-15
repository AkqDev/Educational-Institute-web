import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Programs from "./pages/Programs";
import Testimonials from "./pages/Testimonials";
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>

    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="free-programs" element={<Programs />} />
        <Route path="testimonials" element={<Testimonials />} />
      </Routes>
    
    <Footer/>
    </>
  );
};

export default App;
