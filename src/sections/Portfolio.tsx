import { motion } from 'framer-motion'
import { HiOutlinePhoto } from 'react-icons/hi2'

const CASES = [
  { label: 'Social Media', aspect: 'aspect-square', gradient: 'from-primary-blue to-primary-cyan' },
  { label: 'Tráfego pago', aspect: 'aspect-[4/5]', gradient: 'from-accent-orange to-accent-yellow' },
  { label: 'Webdesign', aspect: 'aspect-video', gradient: 'from-primary-cyan to-primary-blue' },
  { label: 'Branding', aspect: 'aspect-square', gradient: 'from-accent-yellow to-accent-orange' },
  { label: 'Geração de leads', aspect: 'aspect-[4/5]', gradient: 'from-primary-blue to-accent-orange' },
  { label: 'Vídeo', aspect: 'aspect-video', gradient: 'from-primary-cyan to-accent-yellow' },
]

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-neutral-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
            Trabalhos que já colocamos no ar
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-dark/75">
            Uma amostra dos formatos que produzimos. Cases completos, sob
            consulta.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {CASES.map((item, index) => (
            <motion.div
              key={`${item.label}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
              className={`relative ${item.aspect} overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient}`}
              role="img"
              aria-label={`Case de exemplo da categoria ${item.label}, imagem final em breve`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-dark/10">
                <HiOutlinePhoto size={32} className="text-neutral-white/90" aria-hidden="true" />
                <span className="font-body text-sm font-semibold text-neutral-white">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
