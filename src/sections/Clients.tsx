import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { Reveal } from '../components/fx'

type Cliente = { name: string; segment: string; image: string; url?: string }

const CLIENTES: Cliente[] = [
  {
    name: 'Daniel Assunção Advogados',
    segment: 'Advocacia',
    image: '/clientes/daniel-assuncao-advogados.jpg',
  },
  {
    name: 'Taynara Carvalho',
    segment: 'Consultora exclusiva EBM',
    image: '/clientes/taynara-carvalho-ebm.jpg',
  },
  {
    name: 'Mercadão dos Óculos',
    segment: 'Rede de óticas',
    image: '/clientes/mercadao-dos-oculos.jpg',
  },
  {
    name: 'Daniel Barbosa Dias',
    segment: 'Advocacia criminal',
    image: '/clientes/daniel-barbosa-advocacia.jpg',
    url: 'https://daniel-barbosa-advocacia.vercel.app/',
  },
  {
    name: 'Maxwell Medrado',
    segment: 'Personal trainer',
    image: '/clientes/maxwell-medrado.jpg',
    url: 'https://maxwellmedrado.vercel.app/',
  },
]

const N = CLIENTES.length

const Clients = () => {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (d: number) => setActive((a) => (a + d + N) % N)

  // gira sozinho a cada 4 segundos, pausa quando o mouse está em cima
  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => setActive((a) => (a + 1) % N), 4000)
    return () => clearInterval(t)
  }, [paused, reduce])

  return (
    <section id="clientes" className="overflow-hidden bg-neutral-dark/[0.02] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
            Marcas que já confiam na Identidade Digital
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-dark/75">
            Empresas de segmentos diferentes que escolheram unificar sua
            presença digital com a gente. Arraste para o lado ou use as setas.
          </p>
        </Reveal>

        <Reveal dir="zoom" delay={0.1}>
          <motion.div
            className="relative mx-auto mt-14 h-[430px] cursor-grab select-none active:cursor-grabbing sm:h-[500px]"
            style={{ perspective: 1200 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          >
            {CLIENTES.map((c, i) => {
              let off = i - active
              if (off > N / 2) off -= N
              if (off < -N / 2) off += N
              const abs = Math.abs(off)
              const isActive = off === 0
              return (
                <motion.div
                  key={c.name}
                  className="absolute left-1/2 top-0 -ml-[120px] w-[240px] sm:-ml-[140px] sm:w-[280px]"
                  style={{ zIndex: 10 - abs, transformStyle: 'preserve-3d' }}
                  animate={{
                    x: `${off * 68}%`,
                    rotateY: off * -40,
                    z: -abs * 180,
                    scale: isActive ? 1 : 0.9,
                    opacity: abs > 2 ? 0 : 1 - abs * 0.22,
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  onClick={() => !isActive && setActive(i)}
                >
                  <div
                    className={`overflow-hidden rounded-2xl bg-neutral-white ring-1 ring-neutral-dark/5 transition-shadow duration-500 ${
                      isActive ? 'shadow-2xl shadow-primary-blue/30' : 'shadow-md'
                    }`}
                  >
                    <img
                      src={c.image}
                      alt={`Trabalho para ${c.name}`}
                      draggable={false}
                      className="pointer-events-none aspect-[4/5] w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold text-neutral-dark">{c.name}</p>
                        <p className="truncate font-body text-sm text-neutral-dark/60">{c.segment}</p>
                      </div>
                      {c.url && isActive && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-blue px-3 py-1.5 font-body text-xs font-semibold text-neutral-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ver site <HiArrowTopRightOnSquare aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Cliente anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-white text-neutral-dark shadow ring-1 ring-neutral-dark/10 transition-transform hover:scale-110"
            >
              <HiChevronLeft size={22} />
            </button>
            <div className="flex gap-2">
              {CLIENTES.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver ${c.name}`}
                  className={`h-2.5 rounded-full transition-all ${i === active ? 'w-8 bg-accent-orange' : 'w-2.5 bg-neutral-dark/20'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo cliente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-white text-neutral-dark shadow ring-1 ring-neutral-dark/10 transition-transform hover:scale-110"
            >
              <HiChevronRight size={22} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Clients
