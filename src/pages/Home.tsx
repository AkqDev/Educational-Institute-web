import Hero from '../components/Hero'
import About from '../components/About'
import Map from '../components/Map'
import Values from '../components/Values'
import Faqs from '../components/Faqs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Map/>
      <Values/>
      <Stats/>
      <Testimonials/>
      <Faqs/>
    </div>
  )
}

export default Home
