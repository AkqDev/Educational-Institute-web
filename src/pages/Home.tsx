import Hero from '../components/Hero'
import About from '../components/About'
import Map from '../components/Map'
import Values from '../components/Values'
import Faqs from '../components/Faqs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Instructor from '../components/Instructor'
import Events from '../components/Events'
import Slides from '../components/Slides'


const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Slides/>
      <Map/>
      <Values/>
      <Instructor/>
      <Stats/>
      <Testimonials/>
      <Events/>
      <Faqs/>
    </div>
  )
}

export default Home
