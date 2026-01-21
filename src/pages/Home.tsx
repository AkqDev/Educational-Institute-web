import Hero from '../components/Hero'
import About from '../components/About'
import Map from '../components/Map'
import Values from '../components/Values'
import Faqs from '../components/Faqs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CourseCarousel from '../components/CourseCarousel'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <CourseCarousel/>
      <Map/>
      <Values/>
      <Stats/>
      <Testimonials/>
      <Faqs/>
    </div>
  )
}

export default Home
