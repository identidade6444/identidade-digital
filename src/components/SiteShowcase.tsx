import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { TiltCard } from './fx'

type Site = {
  name: string
  segment: string
  description: string
  url: string
  image: string
}

/* Navegador em 3D: chega inclinado e "deita" de frente conforme a rolagem. */
const SiteShowcase = ({ site, flip = false }: { site: Site; flip?: boolean }) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], reduce ? [0, 0, 0] : [38, 0, -18])
  const rotateY = useTransform(scrollYProgress, [0, 0.45, 1], reduce ? [0, 0, 0] : [flip ? 18 : -18, 0, flip ? -8 : 8])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], reduce ? [1, 1, 1] : [0.82, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.2])
  const textX = useTransform(scrollYProgress, [0, 0.4, 1], reduce ? [0, 0, 0] : [flip ? 80 : -80, 0, flip ? 40 : -40])
  const host = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <motion.div style={{ rotateX, rotateY, scale, opacity, transformPerspective: 1400 }}>
        <TiltCard max={6} className="rounded-2xl">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-2xl bg-neutral-dark shadow-2xl shadow-primary-blue/30 ring-1 ring-neutral-dark/10"
            aria-label={`Abrir o site de ${site.name}`}
          >
            <div className="flex items-center gap-2 bg-neutral-dark px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-accent-orange" />
              <span className="h-3 w-3 rounded-full bg-accent-yellow" />
              <span className="h-3 w-3 rounded-full bg-primary-cyan" />
              <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-neutral-white/10 px-3 py-1 font-body text-xs text-neutral-white/70">
                {host}
              </span>
            </div>
            <img src={site.image} alt={`Página inicial do site de ${site.name}`} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
          </a>
        </TiltCard>
      </motion.div>

      <motion.div style={{ x: textX, opacity }}>
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary-blue">{site.segment}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-neutral-dark sm:text-3xl">{site.name}</h3>
        <p className="mt-4 font-body text-base leading-relaxed text-neutral-dark/75">{site.description}</p>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-blue px-6 py-3 font-body text-sm font-semibold text-neutral-white transition-transform hover:scale-105"
        >
          Ver site no ar
          <HiArrowTopRightOnSquare aria-hidden="true" />
        </a>
      </motion.div>
    </div>
  )
}

export default SiteShowcase
