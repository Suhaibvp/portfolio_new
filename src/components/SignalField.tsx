import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pointer = { x: -9999, y: -9999 }
    let nodes: Node[] = []
    let frame = 0
    let running = true

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.floor((width * height) / 28000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#f4efe6'

    const tick = () => {
      if (!running) return
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      const ink = color()

      for (const n of nodes) {
        const dx = pointer.x - n.x
        const dy = pointer.y - n.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist < 160) {
          n.vx += (dx / dist) * 0.02
          n.vy += (dy / dist) * 0.02
        }
        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.99
        n.vy *= 0.99
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = ink
            ctx.globalAlpha = (1 - d / 130) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.55
      ctx.fillStyle = ink
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
