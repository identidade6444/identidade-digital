import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import ContactForm from '../components/ContactForm'
import { buildWhatsAppLink } from '../lib/constants'

const FinalCTA = () => {
  const whatsappLink = buildWhatsAppLink(
    'Olá! Quero falar com a Identidade Digital sobre meu projeto.',
  )

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #00FCFF 0%, #0138EB 60%)' }}
    >
      <div className="absolute inset-0 bg-neutral-dark/55" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-display text-3xl font-bold text-neutral-white sm:text-4xl">
            Vamos construir sua identidade digital?
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-white">
            Fale agora com a nossa equipe e descubra por onde começar a
            profissionalizar a presença da sua marca no digital.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-orange px-7 py-3.5 font-body text-base font-semibold text-neutral-white transition-transform hover:scale-105 hover:bg-accent-orange/90"
          >
            Chamar no WhatsApp
            <HiArrowRight aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA
