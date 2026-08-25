import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks'

type Vec3 = { x: number; y: number; z: number }
type Edge = { a: number; b: number }
type Packet = { edge: number; t: number; speed: number }

const FOV = 640

/** Evenly spread points over a sphere without clumping at the poles. */
function sphere(count: number, radius: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    return {
      x: Math.cos(theta) * ring * radius,
      y: y * radius,
      z: Math.sin(theta) * ring * radius,
    }
  })
}

/** Link each node to its nearest neighbours, skipping duplicates. */
function mesh(points: Vec3[], perNode: number): Edge[] {
  const seen = new Set<string>()
  const edges: Edge[] = []

  points.forEach((p, i) => {
    const near = points
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((m, n) => m.d - n.d)
      .slice(0, perNode)

    for (const n of near) {
      const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ a: i, b: n.j })
    }
  })

  return edges
}

export function TelemetryCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let radius = 0
    let points: Vec3[] = []
    let edges: Edge[] = []
    let packets: Packet[] = []
    const rotated: Vec3[] = []
    const screen: { x: number; y: number; depth: number }[] = []

    let spin = 0
    let targetX = 0
    let targetY = 0
    let tiltX = 0
    let tiltY = 0
    let frame = 0
    let onScreen = true
    let last = performance.now()

    const palette = { ink: '#f4efe6', brass: '#d4a054', signal: '#4ecdc4' }
    const readPalette = () => {
      const style = getComputedStyle(document.documentElement)
      palette.ink = style.getPropertyValue('--ink').trim() || palette.ink
      palette.brass = style.getPropertyValue('--brass').trim() || palette.brass
      palette.signal = style.getPropertyValue('--signal').trim() || palette.signal
    }

    const build = () => {
      const box = canvas.getBoundingClientRect()
      width = box.width
      height = box.height
      if (width === 0 || height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      radius = Math.min(width, height) * (width < 720 ? 0.34 : 0.3)
      const count = width < 720 ? 58 : 104
      points = sphere(count, radius)
      edges = mesh(points, 2)
      packets = Array.from({ length: width < 720 ? 5 : 10 }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.5,
      }))
      rotated.length = points.length
      screen.length = points.length
    }

    const onMove = (e: PointerEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * 1.1
      targetX = (e.clientY / window.innerHeight - 0.5) * -0.7
    }

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      spin += dt * 0.16
      tiltY += (targetY - tiltY) * 0.05
      tiltX += (targetX - tiltX) * 0.05

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const sinY = Math.sin(spin + tiltY)
      const cosY = Math.cos(spin + tiltY)
      const sinX = Math.sin(tiltX)
      const cosX = Math.cos(tiltX)

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y2 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX

        rotated[i] = { x: x1, y: y2, z: z2 }
        const scale = FOV / (FOV + z2)
        screen[i] = {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          depth: (z2 + radius) / (radius * 2),
        }
      }

      ctx.lineWidth = 1
      ctx.strokeStyle = palette.ink
      for (const edge of edges) {
        const a = screen[edge.a]
        const b = screen[edge.b]
        const depth = 1 - (a.depth + b.depth) / 2
        ctx.globalAlpha = 0.05 + depth * 0.3
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      for (let i = 0; i < screen.length; i++) {
        const s = screen[i]
        const depth = 1 - s.depth
        const hub = i % 9 === 0
        ctx.globalAlpha = 0.25 + depth * 0.6
        ctx.fillStyle = hub ? palette.brass : palette.ink
        ctx.beginPath()
        ctx.arc(s.x, s.y, (hub ? 2.1 : 1.3) * (0.55 + depth * 0.75), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.fillStyle = palette.signal
      for (const packet of packets) {
        packet.t += dt * packet.speed
        if (packet.t > 1) {
          packet.t = 0
          packet.edge = Math.floor(Math.random() * edges.length)
        }
        const edge = edges[packet.edge]
        if (!edge) continue
        const a = screen[edge.a]
        const b = screen[edge.b]
        const x = a.x + (b.x - a.x) * packet.t
        const y = a.y + (b.y - a.y) * packet.t
        const depth = 1 - (a.depth + b.depth) / 2
        ctx.globalAlpha = 0.35 + depth * 0.6
        ctx.beginPath()
        ctx.arc(x, y, 1.7 + depth, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(draw)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const sync = () => {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    readPalette()
    build()
    start()

    const resizeObserver = new ResizeObserver(build)
    resizeObserver.observe(canvas)

    const inView = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    inView.observe(canvas)

    const themeObserver = new MutationObserver(readPalette)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', sync)

    return () => {
      stop()
      resizeObserver.disconnect()
      inView.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [reduced])

  if (reduced) return null

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
