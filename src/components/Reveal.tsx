import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks'

export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
