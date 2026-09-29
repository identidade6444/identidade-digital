import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { buildWhatsAppLink } from '../lib/constants'
import { useAnchorScroll } from '../hooks/useAnchorScroll'
import FingerprintIntro from '../components/FingerprintIntro'

/* Elementos 3D flutuantes que reagem ao mouse (profundidades diferentes). */
const Sphere = ({ size, color, className, px, py, depth, float = 16, dur = 6 }: {
  size: number; color: string; className: string; px: MotionValue<number>; py: MotionValue<number>; depth: number; float?: number; dur?: number
}) => {
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform(py, (v) => v * depth)
  return (
    <motion.div className={`pointer-events-none absolute ${className}`} style={{ x, y }} aria-hidden="true">
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, ${color} 38%, rgba(15,23,42,0.85) 100%)`,
          boxShadow: `0 ${size / 4}px ${size / 2}px -${size / 6}px rgba(0,0,0,0.45), 0 0 ${size / 2}px ${color}55`,
        }}
        animate={{ y: [0, -float, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

const Ring = ({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) => {
  const x = useTransform(px, (v) => v * -50)
  const y = useTransform(py, (v) => v * -50)
  return (
    <motion.div className="pointer-events-none absolute right-[1%] top-[6%] hidden sm:block" style={{ x, y, perspective: 700 }} aria-hidden="true">
      <motion.div
        className="h-40 w-40 rounded-full border-[10px] lg:h-52 lg:w-52"
        style={{ borderColor: 'rgba(0,252,255,0.55)', boxShadow: '0 0 40px rgba(0,252,255,0.35), inset 0 0 30px rgba(0,252,255,0.3)' }}
        animate={{ rotateX: [62, 70, 62], rotateZ: [0, 360] }}
        transition={{ rotateZ: { duration: 18, repeat: Infinity, ease: 'linear' }, rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
    </motion.div>
  )
}

const Cube = ({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) => {
  const x = useTransform(px, (v) => v * 70)
  const y = useTransform(py, (v) => v * 70)
  const s = 56
  const face = 'absolute inset-0 rounded-md border border-primary-cyan/70 bg-primary-cyan/15 backdrop-blur-[2px]'
  return (
    <motion.div className="pointer-events-none absolute bottom-[6%] left-[50%] hidden md:block" style={{ x, y, perspective: 600 }} aria-hidden="true">
      <motion.div
        style={{ width: s, height: s, transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      >
        <div className={face} style={{ transform: `translateZ(${s / 2}px)` }} />
        <div className={face} style={{ transform: `rotateY(180deg) translateZ(${s / 2}px)` }} />
        <div className={face} style={{ transform: `rotateY(90deg) translateZ(${s / 2}px)` }} />
        <div className={face} style={{ transform: `rotateY(-90deg) translateZ(${s / 2}px)` }} />
        <div className={face} style={{ transform: `rotateX(90deg) translateZ(${s / 2}px)` }} />
        <div className={face} style={{ transform: `rotateX(-90deg) translateZ(${s / 2}px)` }} />
      </motion.div>
    </motion.div>
  )
}

const Hero = () => {
  const scrollToAnchor = useAnchorScroll()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // mouse: -0.5 a 0.5 em cada eixo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18 })
  const py = useSpring(my, { stiffness: 60, damping: 18 })
  const emblemRotY = useTransform(px, (v) => v * 22)
  const emblemRotX = useTransform(py, (v) => v * -18)
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  // saída ao rolar: o conteúdo sobe e some
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const exitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140])
  const exitOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92])
  const whatsappLink = buildWhatsAppLink(
    'Olá! Quero construir/fortalecer minha identidade digital. Podemos conversar?',
  )

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-24"
      style={{
        background: 'linear-gradient(135deg, #00FCFF 0%, #0138EB 60%)',
      }}
    >
      <div
        className="absolute inset-0 bg-neutral-dark/55"
        aria-hidden="true"
      />

      <Sphere px={px} py={py} depth={40} size={70} color="#FF6200" className="left-[4%] top-[18%]" />
      <Sphere px={px} py={py} depth={-30} size={34} color="#FFED00" className="left-[40%] top-[12%]" dur={5} />
      <Sphere px={px} py={py} depth={60} size={120} color="#00FCFF" className="-bottom-10 right-[18%] opacity-70" float={24} dur={8} />
      <Sphere px={px} py={py} depth={-45} size={22} color="#FFED00" className="bottom-[20%] left-[8%]" dur={4} />
      {!reduce && <Ring px={px} py={py} />}
      {!reduce && <Cube px={px} py={py} />}

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]"
        style={{ y: exitY, opacity: exitOpacity, scale: exitScale }}
      >
        <motion.div className="lg:order-2" style={{ rotateX: emblemRotX, rotateY: emblemRotY, transformPerspective: 900 }}>
          <FingerprintIntro />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="max-w-2xl lg:order-1"
        >
          <p className="mb-4 inline-block rounded-full bg-neutral-dark/70 px-4 py-1.5 font-body text-sm font-semibold uppercase tracking-widest text-accent-yellow">
            Marketing digital 360°
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-neutral-white sm:text-5xl lg:text-6xl">
            Sua marca merece uma identidade que gera resultado
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-neutral-white">
            Cuidamos de estratégia, design, tráfego e conteúdo em um só lugar,
            para que sua empresa pare de depender de soluções soltas e passe a
            crescer com consistência no digital.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-orange px-7 py-3.5 font-body text-base font-semibold text-neutral-white transition-transform hover:scale-105 hover:bg-accent-orange/90"
            >
              Fale com a gente no WhatsApp
              <HiArrowRight aria-hidden="true" />
            </a>
            <a
              href="#servicos"
              onClick={(event) => scrollToAnchor(event, '#servicos')}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-white/80 px-7 py-3.5 font-body text-base font-semibold text-neutral-white transition-colors hover:bg-neutral-white/10"
            >
              Ver serviços
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
