import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'

/* Entra quando aparece na tela e sai quando deixa a tela (nos dois sentidos da rolagem). */
type Dir = 'up' | 'left' | 'right' | 'zoom'
const OFFSETS: Record<Dir, Record<string, number>> = {
  up: { y: 60 },
  left: { x: -90 },
  right: { x: 90 },
  zoom: { scale: 0.85 },
}

type RevealProps = {
  children: ReactNode
  dir?: Dir
  delay?: number
  className?: string
  amount?: number
}

export const Reveal = ({ children, dir = 'up', delay = 0, className = '', amount = 0.2 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, filter: 'blur(8px)', ...OFFSETS[dir] }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 }}
    viewport={{ once: false, amount }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

/* Cartão que inclina em 3D acompanhando o mouse, com brilho. */
type TiltProps = { children: ReactNode; className?: string; max?: number }

export const TiltCard = ({ children, className = '', max = 12 }: TiltProps) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(0, { stiffness: 220, damping: 18 })
  const ry = useSpring(0, { stiffness: 220, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={`group relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  )
}

/* Barra de progresso da rolagem no topo. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #FF6200, #FFED00, #00FCFF)' }}
    />
  )
}

/* Luz suave que segue o mouse (só em computador). */
export const CursorGlow = () => {
  const reduce = useReducedMotion()
  const x = useSpring(-400, { stiffness: 160, damping: 22 })
  const y = useSpring(-400, { stiffness: 160, damping: 22 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const move = (e: globalThis.PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])
  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[65] hidden h-[400px] w-[400px] rounded-full [@media(pointer:fine)]:block"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(0,252,255,0.16) 0%, rgba(1,56,235,0.06) 40%, rgba(1,56,235,0) 70%)',
      }}
    />
  )
}
