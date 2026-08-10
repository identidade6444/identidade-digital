import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'

const DEPOIMENTOS = [
  {
    quote:
      'Antes cada rede social e cada campanha ficava por conta de uma pessoa diferente, sem conversa entre elas. Com a Identidade Digital, passamos a ter uma linha só, e isso se refletiu direto na procura pelos nossos serviços.',
    name: 'Cliente Identidade Digital',
    role: 'Segmento de saúde e bem-estar',
  },
  {
    quote:
      'O que mais valorizo é ter estratégia por trás de cada peça. Deixamos de publicar por publicar e passamos a ter um plano com objetivo claro em cada ação.',
    name: 'Cliente Identidade Digital',
    role: 'Segmento de varejo local',
  },
  {
    quote:
      'A geração de leads organizada mudou a forma como nossa equipe comercial trabalha. Hoje sabemos de onde vem cada contato e como conduzir a conversa.',
    name: 'Cliente Identidade Digital',
    role: 'Segmento de serviços profissionais',
  },
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const goTo = (next: number) => {
    setIndex((next + DEPOIMENTOS.length) % DEPOIMENTOS.length)
  }

  const current = DEPOIMENTOS[index]

  return (
    <section className="bg-neutral-dark/[0.02] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
          O que nossos clientes dizem
        </h2>

        <div className="relative mt-12">
          <div className="rounded-2xl bg-neutral-white p-8 shadow-md ring-1 ring-neutral-dark/5 sm:p-10">
            <HiOutlineChatBubbleBottomCenterText
              size={32}
              className="text-primary-blue"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="mt-4 font-body text-lg leading-relaxed text-neutral-dark/85">
                  “{current.quote}”
                </p>
                <p className="mt-6 font-display text-base font-semibold text-neutral-dark">
                  {current.name}
                </p>
                <p className="font-body text-sm text-neutral-dark/60">{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Depoimento anterior"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-dark/15 text-neutral-dark transition-colors hover:bg-neutral-dark/5"
            >
              <HiChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {DEPOIMENTOS.map((depoimento, i) => (
                <button
                  key={depoimento.name + i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ver depoimento ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === index ? 'bg-primary-blue' : 'bg-neutral-dark/20'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Próximo depoimento"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-dark/15 text-neutral-dark transition-colors hover:bg-neutral-dark/5"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
