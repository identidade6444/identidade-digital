import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { buildWhatsAppLink } from '../lib/constants'
import { useAnchorScroll } from '../hooks/useAnchorScroll'
import logoOfficial from '../assets/logo-official.jpg'

const Hero = () => {
  const scrollToAnchor = useAnchorScroll()
  const whatsappLink = buildWhatsAppLink(
    'Olá! Quero construir/fortalecer minha identidade digital. Podemos conversar?',
  )

  return (
    <section
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

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="shrink-0 overflow-hidden rounded-3xl shadow-2xl"
        >
          <img
            src={logoOfficial}
            alt="Identidade Digital"
            className="h-40 w-40 object-cover sm:h-52 sm:w-52 lg:h-64 lg:w-64 xl:h-72 xl:w-72"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
