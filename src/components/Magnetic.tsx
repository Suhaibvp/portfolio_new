import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks'

export function Magnetic({
  children,
  className,
  href,
  type = 'button',
  onClick,
  strength = 18,
}: {
  children: ReactNode
  className?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  strength?: number
}) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!fine || reduced) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength
    el.style.setProperty('--magnet-x', `${x}px`)
    el.style.setProperty('--magnet-y', `${y}px`)
  }

  const onLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--magnet-x', '0px')
    e.currentTarget.style.setProperty('--magnet-y', '0px')
  }

  const style = { '--magnet-x': '0px', '--magnet-y': '0px' } as CSSProperties

  if (href) {
    return (
      <a
        href={href}
        className={className}
        data-magnetic
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={className}
      data-magnetic
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
