import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import digitalLaranja from '../assets/digital-laranja.png'
import digitalAmarela from '../assets/digital-amarela.png'

// Símbolo da agência: duas digitais (laranja e amarela) que formam um coração.
// Elas entram pelos lados, se encontram, ficam indo e voltando devagar e se
// afastam/aproximam conforme a página rola.

const WORD = 'IDENTIDADE'.split('')

const FingerprintIntro = () => {
  const reduce = !!useReducedMotion()

  const { scrollY } = useScroll()
  const spread = useSpring(useTransform(scrollY, [0, 500], [0, 60]), {
    stiffness: 110,
    damping: 20,
  })
  const leftX = useTransform(spread, (v) => -v)
  const leftRot = useTransform(spread, (v) => -v * 0.12)
  const rightRot = useTransform(spread, (v) => v * 0.12)

  const sway = (dir: 1 | -1) =>
    reduce
      ? undefined
      : {
          x: [0, dir * 14, 0],
          rotate: [0, dir * 2.5, 0],
          transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' as const, delay: 2.2 },
        }

  const enter = (dir: 1 | -1, delay: number) => ({
    initial: reduce ? false : { x: dir * 140, rotate: dir * 14, opacity: 0 },
    animate: { x: 0, rotate: 0, opacity: 1 },
    transition: { type: 'spring' as const, stiffness: 55, damping: 13, delay },
  })

  return (
    <div className="flex flex-col items-center text-center" role="img" aria-label="Identidade Digital">
      <div className="relative w-64 sm:w-80 lg:w-[26rem]" style={{ aspectRatio: '679 / 531' }}>
        {/* brilho de fundo */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-15%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,252,255,0.28) 0%, rgba(1,56,235,0) 65%)' }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* digital laranja (esquerda, atrás) */}
        <motion.div className="absolute inset-0" style={{ x: leftX, rotate: leftRot }}>
          <motion.div className="h-full w-full" {...enter(-1, 0.15)}>
            <motion.img
              src={digitalLaranja}
              alt=""
              draggable={false}
              className="block h-full w-full select-none"
              style={{ transformOrigin: '30% 60%' }}
              animate={sway(-1)}
            />
          </motion.div>
        </motion.div>

        {/* digital amarela (direita, na frente) */}
        <motion.div className="absolute inset-0" style={{ x: spread, rotate: rightRot }}>
          <motion.div className="h-full w-full" {...enter(1, 0.35)}>
            <motion.img
              src={digitalAmarela}
              alt=""
              draggable={false}
              className="block h-full w-full select-none"
              style={{ transformOrigin: '70% 60%' }}
              animate={sway(1)}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* escrita logo abaixo das digitais, como no logo */}
      <div className="mt-5 select-none text-neutral-white">
        <div
          className="flex justify-center text-4xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Marcellus', 'Playfair Display', serif", letterSpacing: '0.02em' }}
        >
          {WORD.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.06, ease: 'easeOut' }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="mt-1 text-xl sm:text-2xl"
          style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", fontWeight: 400 }}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2, ease: 'easeOut' }}
        >
          Digital
        </motion.div>
      </div>
    </div>
  )
}

export default FingerprintIntro
