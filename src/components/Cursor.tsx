import { useEffect, useRef, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks'

export function Cursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    const enable = fine && !reduced
    document.body.classList.toggle('has-fine-pointer', enable)
    if (!enable) return

    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }
    let frame = 0

    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      const target = e.target as HTMLElement | null
      setHover(Boolean(target?.closest('a, button, input, textarea, [data-magnetic]')))
    }

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      }
      frame = requestAnimationFrame(loop)
    }

    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    loop()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.body.classList.remove('has-fine-pointer')
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return (
    <>
      <div ref={dot} className={`cursor${down ? ' is-down' : ''}`} />
      <div ref={ring} className={`cursor-ring${hover ? ' is-hover' : ''}`} />
    </>
  )
}
