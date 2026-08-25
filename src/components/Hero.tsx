import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../content'
import { Magnetic } from './Magnetic'
import { TelemetryCore } from './TelemetryCore'

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % profile.domains.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="hero wrap" id="top">
      <TelemetryCore />
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulse" aria-hidden="true" />
          {profile.availability} · {profile.location}
        </motion.p>
        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.firstName.toUpperCase()}
          <span>{profile.lastName}</span>
        </motion.h1>
        <div className="hero-meta">
          <p className="role">{profile.role}</p>
          <p className="domains">
            Currently tuned to{' '}
            <span className="domain-swap">
              <AnimatePresence mode="wait">
                <motion.b
                  key={profile.domains[index]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  {profile.domains[index]}
                </motion.b>
              </AnimatePresence>
            </span>
          </p>
        </div>
        <p className="lede">{profile.headline}</p>
        <div className="cta-row">
          <Magnetic className="btn btn-primary" href="#work">
            See the work
          </Magnetic>
          <Magnetic className="btn btn-ghost" href="#contact">
            Start a conversation
          </Magnetic>
        </div>
        <p className="scroll-hint">Move the pointer — the mesh follows you</p>
      </div>
    </section>
  )
}
