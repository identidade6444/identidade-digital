import { motion } from 'framer-motion'
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineChartBar, HiOutlineSparkles } from 'react-icons/hi'

const DIFERENCIAIS = [
  {
    icon: HiOutlineUserGroup,
    title: 'Time especialista, não generalista',
    description:
      'Cada frente — tráfego, design, conteúdo e estratégia — é tocada por quem vive daquilo, sem terceirizar sua marca para um freelancer só.',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Decisão orientada por dado',
    description:
      'Acompanhamos métricas reais de performance para ajustar a rota antes que o orçamento seja desperdiçado.',
  },
  {
    icon: HiOutlineLightBulb,
    title: 'Estratégia antes da execução',
    description:
      'Nenhuma peça sai do papel sem um porquê. Definimos posicionamento e objetivo antes de qualquer criativo ou campanha.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Operação 360°, um único ponto de contato',
    description:
      'Você fala com uma agência só, e ela resolve tudo — do planejamento à peça publicada.',
  },
]

const About = () => {
  return (
    <section id="sobre" className="bg-neutral-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
            Uma agência que entende de negócio, não só de posts
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-neutral-dark/75">
            A Identidade Digital nasceu para resolver um problema comum entre
            pequenas e médias empresas: presença digital fragmentada, sem
            estratégia e sem dono. Reunimos tráfego pago, social media,
            design, geração de leads, produção de vídeo e estratégia de
            marketing em uma operação única — pensada para o seu negócio
            crescer com consistência, não com ações isoladas.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              className="rounded-2xl border border-neutral-dark/10 p-6 transition-shadow hover:shadow-lg"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue">
                <item.icon size={26} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-neutral-dark">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-neutral-dark/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
