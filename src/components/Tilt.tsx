import { useEffect, useRef, type ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks'

type Props = {
  children: ReactNode
  /** Turn the effect off while a card is expanded. */
  disabled?: boolean
  strength?: number
}

/**
 * Pointer-driven 3D tilt. The rect is measured once per hover so moving the
 * pointer never forces a layout, and only transforms animate.
 */
export function Tilt({ children, disabled = false, strength = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !fine || reduced || disabled) return

    let rect: DOMRect | null = null
    let frame = 0
    let px = 0
    let py = 0

    const apply = () => {
      frame = 0
      if (!rect) return
      const x = (px - rect.left) / rect.width - 0.5
      const y = (py - rect.top) / rect.height - 0.5
      node.style.setProperty('--rx', `${(-y * strength).toFixed(2)}deg`)
      node.style.setProperty('--ry', `${(x * strength).toFixed(2)}deg`)
      node.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
      node.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
    }

    const onEnter = () => {
      rect = node.getBoundingClientRect()
      node.classList.add('is-tilting')
    }

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      rect = null
      node.classList.remove('is-tilting')
      node.style.setProperty('--rx', '0deg')
      node.style.setProperty('--ry', '0deg')
    }

    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointermove', onMove, { passive: true })
    node.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      node.style.removeProperty('--rx')
      node.style.removeProperty('--ry')
    }
  }, [fine, reduced, disabled, strength])

  return (
    <div className="tilt" ref={ref}>
      {children}
    </div>
  )
}
