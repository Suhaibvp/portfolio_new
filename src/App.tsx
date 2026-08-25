import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Recognition } from './components/Recognition'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import { useScrollProgress } from './hooks'

export default function App() {
  const progress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app">
      <a className="skip" href="#work">
        Skip to work
      </a>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <Cursor />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Recognition />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
