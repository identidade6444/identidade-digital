import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'framer-motion'
import { ScrollProgress, CursorGlow } from './components/fx'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import Clients from './sections/Clients'
import Testimonials from './sections/Testimonials'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Clients />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      </MotionConfig>
    </ReactLenis>
  )
}

export default App
