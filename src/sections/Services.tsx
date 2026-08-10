import { motion } from 'framer-motion'
import {
  HiOutlineCursorArrowRays,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlinePaintBrush,
  HiOutlineFunnel,
  HiOutlineVideoCamera,
  HiOutlinePresentationChartLine,
} from 'react-icons/hi2'

const SERVICOS = [
  {
    icon: HiOutlineCursorArrowRays,
    title: 'Tráfego pago',
    description: 'Campanhas em Meta e Google Ads focadas em resultado, não em curtida vazia.',
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: 'Social Media',
    description: 'Planejamento e gestão de redes sociais com identidade e frequência consistentes.',
  },
  {
    icon: HiOutlineComputerDesktop,
    title: 'Webdesigner',
    description: 'Sites e landing pages rápidos, responsivos e pensados para converter.',
  },
  {
    icon: HiOutlinePaintBrush,
    title: 'Designer',
    description: 'Identidade visual, peças gráficas e branding com consistência em todos os pontos de contato.',
  },
  {
    icon: HiOutlineFunnel,
    title: 'Geração de leads',
    description: 'Funis e iscas digitais estruturados para transformar audiência em oportunidade de venda.',
  },
  {
    icon: HiOutlineVideoCamera,
    title: 'Edição de vídeo',
    description: 'Vídeos e cortes para redes sociais com ritmo e linguagem que prendem atenção.',
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: 'Estrategista de marketing',
    description: 'Planejamento de marketing alinhado aos objetivos reais do seu negócio.',
  },
]

const Services = () => {
  return (
    <section id="servicos" className="bg-neutral-dark/[0.02] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
            Tudo que sua marca precisa, em um só lugar
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-dark/75">
            Serviços que se conectam para construir presença digital de ponta
            a ponta.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((servico, index) => (
            <motion.div
              key={servico.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
              className="group rounded-2xl bg-neutral-white p-6 shadow-sm ring-1 ring-neutral-dark/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-orange to-accent-yellow text-neutral-white">
                <servico.icon size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-neutral-dark">
                {servico.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-neutral-dark/70">
                {servico.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
